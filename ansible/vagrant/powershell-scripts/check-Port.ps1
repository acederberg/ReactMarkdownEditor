param (
	$PORT
)

if ( $PORT -eq $null ){ throw "You must specify a port." }

$localport = Get-NetTCPConnection | where-Object{ 
	$_.LocalPort -eq $PORT 
}

if ( $localport ) {

	# List port 4343 details and the ascociated process.
	# https://azega.org/list-open-ports-using-powershell/

	$with_process = Get-NetTCPConnection `
		|	where {( $_.LocalPort -eq $PORT )} `
		| select LocalAdress,LocalPort,RemoteAdress,RemotePort,State,AppliedSetting,OwningProcess,@{
				Name = "Process";
				Expression={
					( Get-Process -Id $_.OwningProcess ).ProcessName
				};
		} | ft
	echo ( 'port={0} is not free, here is some useful information:' -f $PORT )
	echo $with_process

} else {
	
	echo 'port is open for use.'

}
