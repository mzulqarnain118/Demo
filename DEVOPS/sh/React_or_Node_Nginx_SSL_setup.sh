#!/bin/bash
BOLD='\033[1m'
RESET='\033[0m'
# Prompt the user for their email address
read -p "Enter your email address: " EMAIL

# Generate a new SSH key with the provided email address
ssh-keygen -t rsa -b 4096 -C "$EMAIL"

# Prompt the user for a custom name for the new key
read -p "Enter a custom name for the new key (e.g., my_key): " NEW_KEY_NAME

#! Start the SSH agent
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

# Prompt the user for a domain or IP address
read -p "Enter a domain or IP address (leave empty for localhost): " DOMAIN_OR_IP

# If the input is empty, use "localhost" as the default
if [ -z "$DOMAIN_OR_IP" ]; then
    DOMAIN_OR_IP="localhost"
fi

# Prompt the user for the choice of app (Node.js or React)
read -p "Choose the type of app you want to set up (node/react): " APP_TYPE

#! Install Git
sudo apt install git -y

#! Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install Node.js (change the version to your desired version)
nvm install node

    #! Prompt the user for the Git clone link
    read -p "Enter the Git clone link for the Node.js project: " GIT_CLONE_LINK

    # Clone the Node.js project
    git clone $GIT_CLONE_LINK
    read -p "Enter the path to your app's source directory (e.g., /home/ubuntu/project-dir): " APP_SRC
    cd $APP_SRC
    read -p "Enter the Git Branch in which you wanna checkout (e.g., main/develop): " BRANCH
    git fetch -a
    git checkout $BRANCH
  #! Prompt the user for the package manager (npm or yarn)
    read -p "Enter the package manager (npm/yarn): " PACKAGE_MANAGER

    # Install dependencies based on the chosen package manager
    if [ "$PACKAGE_MANAGER" == "npm" ]; then
        npm install
    elif [ "$PACKAGE_MANAGER" == "yarn" ]; then
       npm install yarn -g
        yarn install
    else
        echo "Invalid package manager. Please choose either 'npm' or 'yarn'."
        exit 1
    fi
# Define variables for app-specific settings
if [ "$APP_TYPE" == "node" ]; then
    # For Node.js app
    read -p "Enter the Node.js app's port (default is 3000): " NODEJS_APP_PORT

    # If the input is empty, use port 3000 as the default
    if [ -z "$NODEJS_APP_PORT" ]; then
        NODEJS_APP_PORT=3000
    fi

    # Install PM2
    npm install pm2 -g

elif [ "$APP_TYPE" == "react" ]; then
    # For React app
    REACT_APP_DIR="/var/www/html"

    # Build the React project
    if [ "$PACKAGE_MANAGER" == "npm" ]; then
        npm run build
    elif [ "$PACKAGE_MANAGER" == "yarn" ]; then
        yarn build
    else
        echo "Invalid package manager. Please choose either 'npm' or 'yarn'."
        exit 1
    fi

      #! Prompt the user for the build folder (dist or build)
    read -p "Enter the package manager (build/dist): " BUILD_FOLDER

    # Copy the React build to /var/www/html
    sudo cp -r ./BUILD_FOLDER/* $REACT_APP_DIR

else
    echo "Invalid app type. Please choose either 'node' or 'react'."
    exit 1
fi

# Define the server block file based on the domain or IP address
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN_OR_IP"

# Update the package manager
sudo apt update

# Install Nginx
sudo apt install nginx -y

#! Prompt the user for SSL configuration
read -p "Do you want to use SSL for this domain? (yes/no): " USE_SSL

# Check if SSL is requested
if [ "$USE_SSL" == "yes" ]; then
    sudo apt install certbot python3-certbot-nginx
    # Generate SSL certificate
    sudo certbot --nginx -d $DOMAIN_OR_IP
fi

# Create an Nginx server block configuration based on the app type
if [ "$APP_TYPE" == "node" ]; then
    # For Node.js app
    NGINX_CONFIG="proxy_pass http://localhost:$NODEJS_APP_PORT;"
else
    # For React app
    NGINX_CONFIG="root $REACT_APP_DIR;"
fi

# Create the Nginx server block configuration
sudo tee "$NGINX_CONF" > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN_OR_IP;

    location / {
        $NGINX_CONFIG
        index index.html;
    }

    access_log /var/log/nginx/$DOMAIN_OR_IP-access.log;
    error_log /var/log/nginx/$DOMAIN_OR_IP-error.log;
}
EOF

# Enable the server block
sudo ln -s "$NGINX_CONF" "/etc/nginx/sites-enabled/"

# Test Nginx configuration
sudo nginx -t

# Reload Nginx to apply the new configuration
sudo systemctl reload nginx

# Display Nginx status and provide further instructions
echo "Nginx is installed and configured for $DOMAIN_OR_IP."
echo "You can check its status using: sudo systemctl status nginx"
echo "To start Nginx, run: sudo systemctl start nginx"
echo "To enable Nginx at boot, run: sudo systemctl enable nginx"

# Clean up
if [ "$APP_TYPE" == "node" ]; then
    # For Node.js app
    echo "Node.js app files should be cloned to: $HOME"
    echo "PM2 is installed for managing the Node.js app."
else
    # For React app
    echo "React build files are copied to: $REACT_APP_DIR"
fi


