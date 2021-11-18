echo -e "\e[33mWARNING: This will destroy both virtual machines ( and worst of all, take a long time ) and result in the need to re-register a runner. A better option is \e[37m'vagrant.exe reload'. \e[33mProceed? (Yes to continue, Soft for \e37mvagrant.exe reload\e[33m)\e[0m"
read proceed

if [[ $proceed == 'Yes' || $proceed == 'Soft' ]]; then

	if [[ $proceed == 'Yes' ]]; then
		echo -e "\e[31mProceeding with hard rebuild...\e[0m"
		#vagrant.exe destroy
		#vagrant.exe up
	else
		echo -e "\e[31mSoft rebuild...\e[0m"
		#vagrant.exe reload
	fi

	echo -e "\e[31mCreating a new hosts.ini with updated ip addresses...\e[0m"
	echo $( sh ./make_hosts.sh )>>temp

	# Start the ansible container.
	# Make a new ssh key.
	# It will mount hosts.ini and use it to setup ssh between hosts and the ansible runner.

	echo -e "\e[31mCreating ssh keys...\e[0m"
	docker compose --file ../docker-compose.yaml up --detach
	[[ $( docker exec ansible-runner ls /home/ansible -a | grep .ssh | wc --word ) -eq 0 ]] \
		&& docker exec ansible-runner mkdir /home/ansible/.ssh
	docker exec ansible-runner ssh-keygen -N "" -f /home/ansible/.ssh/id_rsa
	
	for addr in $( cat temp ); do
		echo Setting up ssh for $addr...
		docker exec ansible-runner ssh-copy-id vagrant@$addr
	done

 	rm temp
	echo "Done."

else
	echo -e "\e[31mNot proceeding\e[0m"
fi
