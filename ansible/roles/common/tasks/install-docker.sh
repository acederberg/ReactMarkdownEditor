# Register repo
# 1. install necessary ingredients for the subsequent commands.
# 2. get gpg keys for apt configuration file
# 3. modify the apt configuration to include repo.
# 4. call apt update

apt install -y ca-certificates curl gnupg lsb-release
test -f /usr/share/keyrings/docker-archive-keyring.gpg  && rm /usr/share/keyrings/docker-archive-keyring.gpg
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null


apt update -y
apt install -y docker-ce docker-ce-cli containerd.io
echo docker engine version = $( docker --version )


test -f gitlab-runner_amd64.deb && rm gitlab-runner_amd64.deb
