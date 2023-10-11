#!/bin/bash

# Replace with your project directory and branch
PROJECT_DIR=/path/to/your/project
BRANCH_NAME=your-branch-name

# Navigate to the project directory
cd $PROJECT_DIR

# Pull the latest changes from the GitLab repository
git pull origin $BRANCH_NAME

# Restart your Node.js application (replace with your actual start command)
pm2 restart your-app-name
