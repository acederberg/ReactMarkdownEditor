./vagrant/add_ansible.sh

apt install ansible
ansible-galaxy collection install community.docker 
ansible-galaxy collection install community.general

