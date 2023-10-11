#!/bin/bash

# Install Homebrew if not already installed
if ! command -v brew &> /dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install iTerm2
brew install --cask iterm2

# Configure iTerm2 (you may customize these settings)
# Note: These settings are just examples; you can customize them further.
# You can export your own iTerm2 settings and import them using "Preferences > General > Preferences"
# Example: https://github.com/MartinSeeler/iterm2-material-design

# Install development tools and applications via Homebrew
brew install git
brew install node
brew install nvm
brew install mysql
brew install --cask visual-studio-code
brew install --cask slack
brew install --cask brave-browser
brew install --cask postman
brew install --cask whatsapp

# Install MongoDB using Homebrew tap
brew tap mongodb/brew
brew install mongodb-community

# Check if Chrome is installed; if not, install it
if ! command -v google-chrome &> /dev/null; then
  brew install --cask google-chrome
fi

# Install additional development tools (customize as needed)
# brew install ...

# Configure NVM (Node Version Manager)
mkdir -p ~/.nvm
export NVM_DIR="$HOME/.nvm"
source "$(brew --prefix nvm)/nvm.sh"

# Install the latest stable Node.js version
nvm install --lts

# Set the latest stable Node.js version as the default
nvm use --lts
nvm alias default "$(nvm current)"

echo "Development environment setup complete."

