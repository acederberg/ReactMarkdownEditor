param ( 
	$vagrant,
	$mode
)

import-Module './powershell-scripts/rebuild-modules.ps1' -force

main -vagrant $vagrant -mode $mode 
