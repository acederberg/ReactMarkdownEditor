test -d ansible && mkdir /home/ansible
useradd ansible -d /home/ansible 
usermod -aG sudo ansible
chown ansible:ansible /home/ansible
echo 'ansible:ansible' | chpasswd

apt install ansible pip -y
su -l ansible-runner -c ansible-galaxy collection install community.docker 
su -l ansible-runner -c ansible-galaxy collection install community.general

