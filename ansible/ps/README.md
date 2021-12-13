# Using Powershell Scripts For Vagrant Automation

To avoid doing all the work involved in bringing up vagrant machines, sharing SSH, getting correct virtual machines and containers started in a 'local' (e.g. your desktop) environment, just use the functions included in `./ps/rebuild.local.ps1`. Some of the more useful functions are the following :

* `new-LocalInventory` -- Create a new inventory file for the `app-runner` and `gitlab-runner` machines.
* `invoke-SSHKey` -- Share SSH keys on the `ansible-runner` to nodes.
* `rebuild-LocalAppRunnerEnvironment` -- Rebuild vagrant machines with SSH setup for ansible. Also rebuilds the `test_hosts.ini` inventory file for `ansible`. Does not include backup, restoration of the volumes backed up, or running of other ansible tasks. See `new-LocalAppRunner`.
* `share-Secrets` -- Share local secrets ( or really any file ) with the ansible runner.
*	`new-LocalAppRunner` -- Back up  volumes on `app-runner`, rebuild and re-provision virtual machines, run `ansible` playbooks, start `docker` containers, etc.
