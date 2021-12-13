test -d ansible && mkdir /home/ansible
useradd ansible -d /home/ansible -g sudo
chown ansible:ansible /home/ansible

apt install ansible
ansible-galaxy collection install community.docker 
ansible-galaxy collection install community.general

