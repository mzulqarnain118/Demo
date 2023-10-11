#!/bin/bash

# Prompt the user for the domain or IP address of the existing server
read -p "Enter the domain or IP address of the existing server: " DOMAIN_OR_IP

# Prompt the user for the choice of SSL (free or paid)
read -p "Choose the type of SSL certificate you want to set up (free/paid): " SSL_TYPE

# Define the paths for the SSL certificate and key
SSL_CERT_PATH="/etc/ssl/certs/$DOMAIN_OR_IP.crt"
SSL_KEY_PATH="/etc/ssl/private/$DOMAIN_OR_IP.key"

# Check if SSL is already configured in the Nginx default server block
if grep -q "ssl_certificate" /etc/nginx/sites-available/default; then
    echo "SSL is already configured in the Nginx default server block."
    exit 1
fi

# Install Certbot (if not already installed)
if ! command -v certbot &> /dev/null; then
    sudo apt update
    sudo apt install certbot -y
fi

# Check if SSL_TYPE is "free" or "paid" and set up SSL accordingly
if [ "$SSL_TYPE" == "free" ]; then
    # Set up free SSL certificate with Certbot
    sudo certbot --nginx -d $DOMAIN_OR_IP
elif [ "$SSL_TYPE" == "paid" ]; then
    # Prompt the user for the path to the SSL certificate and key files
    read -p "Enter the path to your SSL certificate file (e.g., /path/to/certificate.crt): " CUSTOM_SSL_CERT_PATH
    read -p "Enter the path to your SSL certificate key file (e.g., /path/to/privatekey.key): " CUSTOM_SSL_KEY_PATH

    # Copy the custom SSL certificate and key to the appropriate paths
    sudo cp $CUSTOM_SSL_CERT_PATH $SSL_CERT_PATH
    sudo cp $CUSTOM_SSL_KEY_PATH $SSL_KEY_PATH

    # Update Nginx configuration to use the custom SSL certificate and key
    sudo sed -i "s|listen 80;|listen 443 ssl;|g" /etc/nginx/sites-available/default
    sudo sed -i "s|#ssl_certificate|ssl_certificate $SSL_CERT_PATH;|g" /etc/nginx/sites-available/default
    sudo sed -i "s|#ssl_certificate_key|ssl_certificate_key $SSL_KEY_PATH;|g" /etc/nginx/sites-available/default
else
    echo "Invalid SSL type. Please choose either 'free' or 'paid'."
    exit 1
fi

# Test Nginx configuration
sudo nginx -t

# Reload Nginx to apply the new SSL configuration
sudo systemctl reload nginx

# Display SSL setup completion message
echo "SSL certificate is set up for $DOMAIN_OR_IP."

# Clean up
if [ "$SSL_TYPE" == "free" ]; then
    echo "Certbot has been used to set up the SSL certificate."
else
    echo "Custom SSL certificate and key files have been configured."
fi

