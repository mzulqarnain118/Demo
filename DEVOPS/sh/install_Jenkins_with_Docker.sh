#!/bin/bash

# Install Docker
apt update
apt install -y docker.io

# Start the Docker service
systemctl start docker
systemctl enable docker

# Create a Docker volume for Jenkins data
docker volume create jenkins_home

# Pull and run the Jenkins Docker container with the volume and Docker socket
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-master \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(which docker):/usr/bin/docker \
  jenkins/jenkins:lts

# Provide initial Jenkins admin password
echo "Wait for Jenkins to start..."
sleep 30  # Wait for Jenkins to start (adjust as needed)
echo "Jenkins initial admin password:"
docker exec jenkins-master cat /var/jenkins_home/secrets/initialAdminPassword

echo "Jenkins is now running. Access it at http://localhost:8080/"

# You can add more instructions here if needed
