test -d ansible && mkdir /home/ansible
useradd ansible -d /home/ansible 
usermod -aG sudo ansible
chown ansible:ansible /home/ansible
echo 'ansible:ansible' | chpasswd

apt install ansible -y
ansible-galaxy collection install community.docker 
ansible-galaxy collection install community.general

