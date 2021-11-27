# List port details and some for the ascociated process.
# https://azega.org/list-open-ports-using-powershell/

param ( $PORT )
if ( $PORT -eq $null ){ throw "You must specify a port." }

if ( Get-NetTCPConnection | where-Object{ $_.LocalPort -eq $PORT } ) {
	$with_process = Get-NetTCPConnection	-LocalPort $PORT `
		| select LocalAdress,LocalPort,RemoteAdress,RemotePort,State,AppliedSetting,OwningProcess,@{
				Name = "Process";
				Expression={
					( Get-Process -Id $_.OwningProcess ).ProcessName
				};
		} | ft
	echo ( 'port={0} is not free. Result:' -f $PORT ) ;	echo $with_process
} else { echo 'Port is open for use.' }
