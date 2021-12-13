Get-NetIPInterface -interfaceAlias 'vEthernet (WSL)' | forEach-Object{
	set-NetIPInterface -ifIndex $_.ifIndex -forwarding Enabled
}

