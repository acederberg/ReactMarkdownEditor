# WARNING!!!

DO NOT USE MANY OF THESE VARIABLES IN PRODUCTION!!! USE EXTRAVARS TO UTILIZE YOUR OWN VAULTED VARIABLES, e.g.

~~~sh
ansible-vault <my_playbook> -i actual_hosts.ini --ask-vault --extra-vars '@my_extra_varsfiles'>
~~~


