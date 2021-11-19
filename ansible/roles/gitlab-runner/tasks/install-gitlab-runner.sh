# Install gitlab runner and add it to the docker group.
# The adr1an user will be responsible for creating runner instances.
# Cannot use `arch` here since the values do not line up with values defined for the runnr.
echo -e "\e[31mWARNING: Gitlab runner must be manually registed.\e[0m"
curl -LJO "https://gitlab-runner-downloads.s3.amazonaws.com/latest/deb/gitlab-runner_amd64.deb"
dpkg -i "gitlab-runner_amd64.deb"
