# The dry run option will also exist.

echo "WARNING: This will only work with vmware and not the windows hypervisor."

if [[ -z $1 || $1 != 'DryRun' ]]; then

	echo -e "\e[33mWARNING: This will destroy both virtual machines ( and worst of all, take a long time ) and result in the need to re-register a runner. A better option is \e[37m'vagrant.exe reload'. \n\e[33mProceed? ('Yes' to continue, 'Soft' for \e[37mvagrant.exe reload\e[33m, and 'Restart' for a plane \e[37mvagrant.exe up\e[31m )\e[0m"
	read proceed

else

	proceed=$1

fi


if [[ $proceed == 'Yes' || $proceed == 'Soft' || $proceed == 'Restart' || $proceed == 'DryRun' ]]; then

	if [[ $proceed == 'DryRun' || $2 == 'NoVagrant' ]]; then

		echo -e "\e[31mDryRun: Nothing done with vagrant.\e[0m"

	else

		# Decide what to do with vagrant.
		if [[ $proceed == 'Yes' ]]; then
			echo -e "\e[31mProceeding with hard rebuild...\e[0m"
			vagrant.exe destroy
			vagrant.exe up
		elif [[ $proceed == 'Restart' ]]; then
			echo -e "\e[31mJust restarting...\e[0m"
			vagrant.exe up
		else
			echo -e "\e[31mSoft rebuild...\e[0m"
			vagrant.exe reload
		fi


	fi
		
	# Make the new hosts file.
	echo -e "\e[31mCreating a new hosts.ini with updated ip addresses...\e[0m"
	echo $( sh ./rebuild_hosts.sh )>temp

	# Start the ansible container.
	# It will mount hosts.ini and use it to setup ssh between hosts and the ansible runner.

	# Container does not exist. 
	if ((	$( docker container ls -a --format '{{.Names}}' \
		| grep 'ansible-runner' \
		| wc --word ) == 0 )); then

		echo -e "\e[32mCreating ansible-runner...\e[0m"
		docker compose --file ../docker-compose.yaml up --detach
		
	# If it exists, then checks if it is running.
	elif ((	$( docker container ls --format '{{.Names}}' \
		| grep 'ansible-runner' \
		| wc --word ) == 1 )); then
		
		echo -e "\e[32mAnsible-runner is already running\e[0m"

	else

		echo -e "\e[32mStarting ansible-runner...\e[0m"
		docker start ansible-runner

	fi

	# Make a new ssh key.
	if [[ $proceed == 'DryRun' ]]; then
		
		echo -e "\e[31mDryRun: Nothing done with ssh keys.\e[0m"

	else

		echo -e "\e[32mCreating ssh keys...\e[0m"

		# If ssh keys do not exist on the ansible-runner, make them.
		if (( $( docker exec ansible-runner ls /home/ansible -a | grep .ssh | wc --word ) == 0 )); then
			docker exec ansible-runner mkdir /home/ansible/.ssh
			docker exec ansible-runner ssh-keygen -N "" -f /home/ansible/.ssh/id_rsa
		fi


		# Put the ansible-runner ssh key onto the machines.	
		echo "Please run the following commands and authenticate yourself:"
		for addr in $( cat temp ); do
			echo addr
			docker exec -it ansible-runner ssh-copy-id -f ansible@$addr
		done
		rm temp
		echo "Done."

	fi

else

	echo -e "\e[31mNot proceeding\e[0m"

fi
