#!/bin/bash

#This file will setup the server by:
# Creating Anaconda environment
# Set up Gunicorn service instance
# Create nginx server block
# If the user does not put a file path for the conda environment, the program will assume the
# condaPath is in a default /home/$USER directory
if [[ $1 != "" ]]; then
    condaPath=$1
else
    condaPath=/home/$SUDO_USER/anaconda3/bin/conda
fi

echo $condaPath

echo "Enter the version number of EGG-View (NOTE: specifying an existing version will overwrite that file): "
read versionNumber

appPath=$PWD

echo app path: $appPath
echo conda path: $condaPath

echo Creating Anaconda environment with required packages...
$condaPath create -p ./condaenv -c rdkit python=3.7 flask=1.1.1 flask-cors=3.0.8 gunicorn=20.0.4


echo Anaconda environment created.


#Add Gunicorn service

echo Creating EGG-View$versionNumber.service file...
cat <<EOF >/etc/systemd/system/EGG-View$versionNumber.service
[Unit]
Description=Creates an instance of Gunicorn to allow clients access the application
After=network.target
[Service]
User=$SUDO_USER
Group=www-data
WorkingDirectory=$appPath/app
Environment="PATH=$appPath/condaenv/bin"
ExecStart=$appPath/condaenv/bin/gunicorn --workers 4 --bind unix:EGG-View.sock -m 007 wsgi:app
[Install]
WantedBy=multi-user.target
EOF
echo EGG-View$versionNumber.service successfully created.

#Add nginx server block

echo Creating nginx server block...
cat <<EOF >/etc/nginx/sites-available/EGG-View$versionNumber
server {
    listen 80;
    location /egg-view {
        include proxy_params;
        proxy_pass http://unix:/$appPath/app/EGG-View.sock;
    }
}
EOF

echo nginx server block successfully created.

echo Initializing nginx server block...
#Command to enable and prepare nginx server block config
ln -s /etc/nginx/sites-available/EGG-View$versionNumber /etc/nginx/sites-enabled

#test for syntax errors
nginx -t

systemctl daemon-reload

#restart nginx to initialize server block
systemctl restart nginx
echo nginx restarted and server block is operational.

systemctl start EGG-View$versionNumber
systemctl enable EGG-View$versionNumber

echo EGG-View$versionNumber.service should be operational. Here is its status:
systemctl status EGG-View$versionNumber

echo nginx should be operational. Here is its status:
systemctl status nginx

echo "Is the EGG-View$versionNumber and nginx status green (y/n)"
read response

if [[ $response = 'n' || $response = 'N' ]]; then
    echo Site failed to launch
    echo Removing created service file...
    rm /etc/systemd/system/EGG-View$versionNumber.service
    echo Removing created nginx sites-available and sites-enabled files...
    rm /etc/nginx/sites-available/EGG-View$versionNumber
    rm /etc/nginx/sites-enabled/EGG-View$versionNumber
    echo Created /etc files successfully deleted

else
    echo Enter name of last version to prevent it from being started by the server on boot-up
    read lastVersionNumber
    systemctl disable $lastVersionNumber
    echo Start service on boot-up for EGG-View$lastVersionNumber is:
    systemctl is-enabled $lastVersionNumber
    echo Site setup successfully
fi