param ( 
	$vagrant,
	$mode,
	$SSHKeys
)

import-Module './powershell-scripts/rebuild.local.ps1' -force

rebuild-LocalAppRunnerEnvironment -vagrant $vagrant -mode $mode -SSHKeys $SSHKeys
