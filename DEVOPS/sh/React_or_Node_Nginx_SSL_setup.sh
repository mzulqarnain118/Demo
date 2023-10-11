#!/bin/bash

# Prompt the user for a domain or IP address
read -p "Enter a domain or IP address (leave empty for localhost): " DOMAIN_OR_IP

# If the input is empty, use "localhost" as the default
if [ -z "$DOMAIN_OR_IP" ]; then
    DOMAIN_OR_IP="localhost"
fi

# Prompt the user for the choice of app (Node.js or React)
read -p "Choose the type of app you want to set up (node/react): " APP_TYPE

# Define variables for app-specific settings
if [ "$APP_TYPE" == "node" ]; then
    # For Node.js app
    read -p "Enter the Node.js app's port (default is 3000): " NODEJS_APP_PORT

    # If the input is empty, use port 3000 as the default
    if [ -z "$NODEJS_APP_PORT" ]; then
        NODEJS_APP_PORT=3000
    fi
elif [ "$APP_TYPE" == "react" ]; then
    # For React app
    read -p "Enter the path to your React app's build directory (e.g., /path/to/build): " REACT_APP_DIR
else
    echo "Invalid app type. Please choose either 'node' or 'react'."
    exit 1
fi

# Prompt the user for SSL choice (free or paid)
read -p "Do you want to use paid SSL? (yes/no): " USE_PAID_SSL

# Define the server block file based on the domain or IP address
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN_OR_IP"

# Update the package manager
sudo apt update

# Install Nginx
sudo apt install nginx -y

# Install Git
sudo apt install git -y

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install Node.js (change the version to your desired version)
nvm install node

# Install PM2
npm install pm2 -g

# Create a directory for the app (Node.js or React)
if [ "$APP_TYPE" == "node" ]; then
    # For Node.js app
    sudo mkdir -p "/var/www/$DOMAIN_OR_IP"
else
    # For React app
    sudo mkdir -p "$REACT_APP_DIR"
fi

# Copy the app's files to the specified directory
# Assuming you have already prepared the app files
# Customize this part to match your deployment process
# Example: sudo cp -r /path/to/your/app/* "/var/www/$DOMAIN_OR_IP"
# Uncomment the line above and replace the path accordingly.

if [ "$USE_PAID_SSL" == "yes" ]; then
    # Prompt the user for SSL certificate and key paths
    read -p "Enter the path to your SSL certificate file (e.g., /path/to/certificate.crt): " SSL_CERTIFICATE_PATH
    read -p "Enter the path to your SSL certificate key file (e.g., /path/to/privatekey.key): " SSL_KEY_PATH

    # Create an Nginx server block configuration with paid SSL
    sudo tee "$NGINX_CONF" > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:$NODEJS_APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /static/ {
        alias /var/www/$DOMAIN_OR_IP/static/;
    }

    location /media/ {
        alias /var/www/$DOMAIN_OR_IP/media/;
    }

    access_log /var/log/nginx/$DOMAIN_OR_IP-access.log;
    error_log /var/log/nginx/$DOMAIN_OR_IP-error.log;

    # SSL Configuration
    ssl_certificate $SSL_CERTIFICATE_PATH;
    ssl_certificate_key $SSL_KEY_PATH;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_timeout 1d;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Additional SSL Security Headers (optional)
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
EOF
else
    # Create an Nginx server block configuration without SSL
    sudo tee "$NGINX_CONF" > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:$NODEJS_APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /static/ {
        alias /var/www/$DOMAIN_OR_IP/static/;
    }

    location /media/ {
        alias /var/www/$DOMAIN_OR_IP/media/;
    }

    access_log /var/log/nginx/$DOMAIN_OR_IP-access.log;
    error_log /var/log/nginx/$DOMAIN_OR_IP-error.log;
}
EOF
fi

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
    echo "Node.js app files should be copied to: /var/www/$DOMAIN_OR_IP"
else
    # For React app
    echo "React app files should be copied to: $REACT_APP_DIR"
fi

