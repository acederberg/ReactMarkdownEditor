# Install docker and docker compose
# NB: uname is used to keep display the unix name.
# 1. Use previous repos.
# 2. Make sure it installed by printing the version.
# 3. Curl the docker compose binary and set it executable.
# 4. Create a link so that the binary is found in general.
echo -e "\e[31mAdding users to group is done a per machine basis.\e[0m"
curl \
	-L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" \
	-o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose

sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
echo -e "\e[31mdocker compose version = $(docker-compose --version).\e[0m"
