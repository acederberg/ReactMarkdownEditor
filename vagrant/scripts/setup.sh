# Per the instructions on the docker website
# This script must be ran using sudo
# https://docs.docker.com/engine/install/debian/
# https://docs.docker.com/compose/install/

# Register repo
# 1. install necessary ingredients for the subsequent commands.
# 2. get gpg keys for apt configuration file
# 3. modify the apt configuration to include repo.
# 4. call apt update
apt install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update -y

# Install docker and docker compose
# NB: uname is used to keep display the unix name.
# 1. Use previous repos.
# 2. Make sure it installed by printing the version.
# 3. Curl the docker compose binary and set it executable.
# 4. Create a link so that the binary is found in general.
apt install -y docker-ce docker-ce-cli containerd.io
echo docker engine version = $( docker --version )
curl \
-L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" \
-o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
echo docker compose version = $(docker-compose --version)
usermod -G docker app-runner


# Bash rc
cp .bashrc ~/.bashrc
source .bashrc
