#!/bin/bash
BOLD='\033[1m'
RESET='\033[0m'
# Prompt the user for their email address
read -p "Enter your email address: " EMAIL

# Generate a new SSH key with the provided email address
ssh-keygen -t rsa -b 4096 -C "$EMAIL"

# Prompt the user for a custom name for the new key
read -p "Enter a custom name for the new key (e.g., my_key): " NEW_KEY_NAME

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add the new SSH key to the agent
ssh-add ~/.ssh/"$NEW_KEY_NAME"

# Prompt the user for the remote repository host (GitHub, GitLab, etc.)
read -p "Enter the remote repository host (e.g., github.com, gitlab.com): " REMOTE_HOST

# Add the public key to GitHub
echo -e  "\033[1mAdd the following public key to your $REMOTE_HOST  account before moving forward:\033[0m"
cat ~/.ssh/"$NEW_KEY_NAME.pub"


# Prompt the user for Host and HostName
read -p "Enter Host name for SSH config: " HOSTNAME

# Add SSH configuration to the config file
echo -e "\nHost $HOSTNAME" >> ~/.ssh/config
echo "  HostName $REMOTE_HOST" >> ~/.ssh/config
echo "  IdentityFile ~/.ssh/$NEW_KEY_NAME" >> ~/.ssh/config
echo "" >> ~/.ssh/config

# Verify the SSH configuration
ssh -T "git@$REMOTE_HOST"

echo "\033[1mSSH configuration completed for $REMOTE_HOST using the key $NEW_KEY_NAME.\033[0m"
# Display a message for the user to clone a repository
echo -e "\033[1mNow you can clone a repository from $REMOTE_HOST by replacing $REMOTE_HOST with $HOSTNAME eg. below\033[0m"
echo -e "\033[1mgit clone git@$HOSTNAME:your_username/your_repository.git\033[0m"
