#!/bin/bash
# Define ANSI escape codes for bold text
BOLD='\033[1m'
RESET='\033[0m'

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run this script with sudo or as root."
  exit 1
fi

# Install OpenJDK (Java Development Kit)
apt update
sudo apt install openjdk-8-jdk
export INSTALL4J_JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64

# Create a dedicated "nexus" user and group
sudo groupadd nexus
sudo useradd -m -g nexus -s /bin/bash nexus

# Nexus installation directory
INSTALL_DIR="/opt/nexus"

# Create the installation directory
mkdir -p "$INSTALL_DIR"
chown -R nexus:nexus "$INSTALL_DIR"  # Set ownership to the "nexus" user

# Download the latest Nexus version
echo "Downloading Nexus Repository Manager $NEXUS_VERSION..."
sudo -u nexus wget -O nexus.tar.gz "https://download.sonatype.com/nexus/3/nexus-3.60.0-02-unix.tar.gz"

# Extract Nexus
tar -xzf nexus.tar.gz -C "$INSTALL_DIR" --strip-components=1

# Create a symbolic link for convenience
ln -s "$INSTALL_DIR/bin/nexus" /usr/local/bin/nexus

# Configure Nexus to run as a service
tee /etc/systemd/system/nexus.service > /dev/null <<EOF
[Unit]
Description=Nexus Repository Manager
After=network.target

[Service]
Type=forking
LimitNOFILE=65536
ExecStart="$INSTALL_DIR/bin/nexus" start
ExecStop="$INSTALL_DIR/bin/nexus" stop
User=nexus  # Run as the "nexus" user
Restart=on-abort

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd
systemctl daemon-reload

# Start Nexus service
systemctl start nexus

# Enable Nexus service to start on boot
systemctl enable nexus

# Display installation information
echo "Nexus Repository Manager $NEXUS_VERSION has been installed and started."
echo -e "${BOLD} Run su - nexus for user then ps aux | grep nexus; netstat -lpnt; for confirmation if nexus not started then start with command sudo /opt/nexus/bin/nexus start and open port 8081 if you are on remote server${RESET}"
echo "You can access Nexus at http://localhost:8081/ or ipaddress:8081"
echo -e "${BOLD} login with password: sudo cat /opt/sonatype-work/nexus3/admin.password${RESET}"
