#!/bin/bash

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js LTS version
nvm install --lts

# Set the default Node.js version
nvm alias default "lts/*"

# Install NPM (Node Package Manager)
npm install -g npm

# Display Node.js and NPM versions
node -v
npm -v

echo "Node.js and NPM have been installed."
