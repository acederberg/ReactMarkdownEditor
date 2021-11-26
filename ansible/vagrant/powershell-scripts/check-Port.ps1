param (
	$port
)

if ( $port -eq $null ){ throw "You must specify a port." }

$port = get-NetTCPConnection | where-Object{ 
	$_.LocalPort -eq $port 
}


if ( $port -eq $null )
{
	Write-Verbose ( 'port={0} is free to use.' -f $port )
}
else {
	# List port 4343 details and the ascociated process.
	# https://azega.org/list-open-ports-using-powershell/

	$with_process = Get-NetTCPConnection `
		|	where {( $_.LocalPort -eq 4343 )} `
		| select LocalAdress,LocalPort,RemoteAdress,RemotePort,State,AppliedSetting,OwningProcess,@{
				Name = "Process";
				Expression={
					( Get-Process -Id $_.OwningProcess ).ProcessName
				};
		} | ft
	Write-Verbose ( 'port={0} is not free, here is some useful information:' -f $port )
	echo $with_process

}
