
#!/bin/bash

# Step 1: Install GitLab Runner Dependencies
echo "Step 1: Installing GitLab Runner Dependencies..."
sudo apt update
sudo apt install -y curl

# Step 2: Install GitLab Runner
echo "Step 2: Installing GitLab Runner..."

# Add the GitLab Runner repository and install GitLab Runner
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt install gitlab-runner

# Step 3: Start and Enable GitLab Runner
echo "Step 3: Starting and Enabling GitLab Runner..."
sudo systemctl start gitlab-runner
sudo systemctl enable gitlab-runner

# Step 4: Register GitLab Runner
echo "Step 4: Registering GitLab Runner..."

# Prompt for GitLab Runner configuration
echo "GitLab Runner coordinator URL: (e.g., https://gitlab.com/ or your self-hosted GitLab instance)"
read -p "Enter GitLab Runner coordinator URL: " coordinator_url
echo "GitLab Runner token: (First ensure you are MAINTAINER or OWNER of repo then You can obtain the Runner registration token from your GitLab project's Settings > CI/CD > Runners section)"
read -p "Enter GitLab Runner token: " runner_token
echo "Description: (Enter a meaningful description for your Runner, e.g., 'My EC2 Runner')"
read -p "Enter a description for the Runner: " runner_description
echo "Tags: (Specify any tags you want to associate with this Runner. Make sure this tag matches the tag specified in your .gitlab-ci.yml file)"
read -p "Enter tags for the Runner (comma-separated, e.g., ec2,production): " runner_tags
echo "Executor: (Choose the executor that matches your environment. For an EC2 instance, you might use the shell executor)"
read -p "Choose an executor: " runner_executor

# Register the GitLab Runner
sudo gitlab-runner register <<EOF
$coordinator_url
$runner_token
$runner_description
$runner_tags
$runner_executor
EOF

# Step 5: Verify the Installation
echo "Step 5: Verifying GitLab Runner Installation..."
gitlab-runner --version

echo "GitLab Runner has been installed and configured on your EC2 instance."
