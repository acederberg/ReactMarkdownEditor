FROM ubuntu

RUN apt update --yes && apt install --yes ansible
RUN mkdir /home/ansible && useradd -d /home/ansible/ ansible
RUN echo 'ansible:Ans1ble!' | chpasswd
WORKDIR /opt/ansible
RUN chown ansible /opt/ansible \ 
	&& chgrp ansible /opt/ansible \
	&& chown ansible /home/ansible \
	&& chgrp ansible /home/ansible
USER ansible
RUN ansible-galaxy collection install community.docker

