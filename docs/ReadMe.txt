

###################
# GIT
# For create the repo on GitHub,
# On your local machine, do

echo "# YtDl" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/cocarica53120/YtDl.git
git push -u origin master



###################
# DOCKER
# For installing on Centos (Not the default one by yum of CentOs repo)
Web link : https://docs.docker.com/install/linux/docker-ce/centos/#install-docker-ce-1

sudo yum install -y yum-utils   device-mapper-persistent-data   lvm2
sudo yum-config-manager     --add-repo     https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce

# Start Daemon and enable it at each start
sudo systemctl start docker
sudo systemctl status docker

sudo groupadd docker
sudo usermod -aG docker $USER

# Reboot to be sure that docker group is taken into account.

# Test of docker after reboot
docker version
docker info

