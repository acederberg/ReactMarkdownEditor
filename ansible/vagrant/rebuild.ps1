param ( 
	$vagrant,
	$mode,
	$SSHKeys
)

import-Module './powershell-scripts/rebuild-modules.ps1' -force

main -vagrant $vagrant -mode $mode -SSHKeys $SSHKeys
