# Make the ansible users home directory.
mkdir /home/ansible 
useradd -G sudo -d /home/ansible ansible --shell /bin/bash
# Set correct ownership.
chown ansible /home/ansible && chgrp ansible /home/ansible
# Set password, add to sudoers file.
echo 'ansible:ansible' | chpasswd
echo 'ansible ALL=(ALL) NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
