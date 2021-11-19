mkdir /home/ansible 
useradd -d /home/ansible ansible
chown ansible /home/ansible && chgrp ansible /home/ansible
echo 'ansible:ansible' | chpasswd
echo 'ansible ALL=(ALL) NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
