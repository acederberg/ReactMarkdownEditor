$HOST_ADDR = '143.244.159.97'

function invoke-RemoteCommand
{
	param( $command )
	$command = "sudo su -l ansible -c 'ssh {0} {1}'" -f $HOST_ADDR, $command
	echo $command
	vagrant ssh -c $command
}

function new-RemoteSession
{
	invoke-RemoteCommand -command ''
}
