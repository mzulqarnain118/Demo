#!/bin/bash

# Update system packages
sudo apt update

# Install necessary tools and packages
sudo sh -c "
apt install wget elinks gpg -y
mkdir -p ~/temp 
cd ~/temp

# Install Slack
wget -nc https://downloads.slack-edge.com/releases/linux/4.29.149/prod/x64/slack-desktop-4.29.149-amd64.deb
dpkg -i slack*.deb

# Install Microsoft Visual Studio Code
wget -nc -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
rm -f packages.microsoft.gpg
apt install apt-transport-https -y
apt update 
apt install code -y

# Install NVM (Node Version Manager)
wget -nc -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# Install MySQL Server (provide credentials when prompted)
apt install -y mysql-server mysql-server

# Install Brave Browser
curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
echo 'deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main' | sudo tee /etc/apt/sources.list.d/brave-browser-release.list
apt update
apt install brave-browser -y

# Install Node.js and npm
apt install npm nodejs -y

# Install libproj22 (if needed)
apt install libproj22 -y

# Fix any broken packages
apt install --fix-broken -y

# Install Yarn globally
sudo npm i -g yarn

# Install MySQL Workbench
wget -nc https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community_8.0.31-1ubuntu22.04_amd64.deb
dpkg -i mysql*.deb

# Install Git
apt install git -y

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
apt update
apt install mongodb-org -y

# Install WhatsApp
wget -nc https://web.whatsapp.com/desktop/build/setup/WhatsAppSetup.exe
chmod +x WhatsAppSetup.exe
./WhatsAppSetup.exe

# Install Postman
snap install postman

# Check if Chrome is installed; if not, install it
if ! command -v google-chrome &> /dev/null; then
  wget -nc https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  dpkg -i google-chrome*.deb
  apt install -f -y
fi

# Configure NVM
export NVM_DIR='$HOME/.nvm'
[ -s '$NVM_DIR/nvm.sh' ] && \. '$NVM_DIR/nvm.sh'  # This loads nvm
[ -s '$NVM_DIR/bash_completion' ] && \. '$NVM_DIR/bash_completion'  # This loads nvm bash_completion
source ~/.bash_profile
"
# Install the latest stable Node.js version
nvm install --lts

# Set the latest stable Node.js version as the default
nvm use --lts
nvm alias default "$(nvm current)"

echo "Development environment setup complete."

