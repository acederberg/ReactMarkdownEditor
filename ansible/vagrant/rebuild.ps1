param ( $vagrant )


function get-IPAddr
{
	param( $name )
	return ( vagrant ssh $name -c "ip address show eth0 | grep 'inet ' | sed -e 's/^.*inet //' -e 's/\/.*$//'" )
}


function new-TestHosts
{
	
  # Make a new hosts file and return a list of hosts.
	$outfile = '../tests_hosts.ini'
	$hosts  = ( @( 'gitlab-runner', 'app-runner' ) | forEach-Object{ get-IPAddr -name $_ } )
	$addrs = @{
		my_runner = $hosts[0];
		my_server = $hosts[1];
	}
	
	# Build file
	echo '# This is an autogenerated file'>>$outfile

	forEach ( $item in $addrs.GetEnumerator() ){
		echo ( '[{0}]' -f $item.Name ) >> $outfile
		echo $item.Value >> $outfile
	}
	
	return $hosts

}


function new-Vagrant
{

	vagrant.exe destroy -f
	vagrant.exe up

}


function restart-Ansible
{
	
	$ansible = 'ansible-runner'
	$all_containers = docker container ls -a --format '{{.Names}}' 
	$active_containers = docker container ls --format '{{.Names}}'

	# Container does not exist
	if ( !($all_containers -contains $ansible ) )
	{
		out-Host -InputObject ( 'Creating {0}.' -f $ansible )
		docker compose --file ../docker-compose.yaml up --detach 
	}
	# Container is already running.
	elseIf( $active_containers -contains $ansible )
	{
		out-Host -InputObject ( '{0} is already active.' -f $ansible )
	}
	else{
		out-Host -InputObject ( 'Start {0}.' -f $ansible )
		docker start ansible-runner
	}

}


function create-SSHKey
{
	if ( !( ( docker exec ansible-runner ls '/home/ansible' -a ) -contains '.ssh' ) )
	{
		docker exec ansible-runner mkdir '/home/ansible/.ssh'
		docker exec ansible-runner bash -c "ssh-keygen -N '' -f '/home/ansible/.ssh/id_rsa'"
	}
	else
	{
		out-Host -InputObject "Keys already exists."
	}
}


function distribute-SSHKey
{
	param( $hosts )
	$hosts | forEach-Object{
		$args = "ssh-copy-id -f ansible@{0}" -f $_ 
		out-Host -InputObject ( "Adding ssh key to {0}" -f $_ )
		docker exec -it ansible-runner bash -c $args
	}
}


function main(){
	param( $vagrant ) 
  if ( $vagrant -eq $true ){ new-Vagrant }
	$hosts = new-TestHosts
	restart-Ansible
	create-SSHKey
	distribute-SSHKey -hosts $hosts	
}


main -vagrant $vagrant
