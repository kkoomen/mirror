#!/usr/bin/env bash

sudo true

APACHE_LOG_DIR=/var/log/apache2
MIRROR_ROOT=/var/www/mirror

# Set up apache vhost.
sudo chown -R $USER:$USER $MIRROR_ROOT
sudo mkdir -p $APACHE_LOG_DIR/mirror
sudo cp ./conf/apache/mirror.local.conf /etc/apache2/sites-available/mirror.local.conf
sudo a2ensite mirror.local
sudo systemctl reload apache2

# Add an alias for our vhost if it doesn't exists yet.
grep "mirror.local" /etc/hosts 1>&2 > /dev/null || echo "127.0.1.1 mirror.local" | sudo tee --append /etc/hosts 1>&2 > /dev/null

# Setup server.
echo "Setting up server"
cd $MIRROR_ROOT/server/

#echo "Creating virtualenv"
#virtualenv -p python3 env
#source $MIRROR_ROOT/server/env/bin/activate

if [[ ! -e ./src/.env ]]; then
  echo "Copying over .env.example. Make sure to fill in these values before starting the mirror."
  cp ./src/.env.example ./src/.env
else
  echo "File .env already exists, skipping copying process."
fi

# Dependencies.
echo "Installing requirements."
pip3 install -r requirements.txt

# OpenCV dependencies.
sudo apt-get install -y libcblas-dev libhdf5-dev libhdf5-serial-dev libatlas-base-dev libjasper-dev libqtgui4 libqt4-test

# Setup client.
echo "Setting up client"
cd $MIRROR_ROOT/client/

echo "Installing Yarn, NPM & NodeJS"
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn nodejs npm

# Install dependencies.
yarn install

# Create startup scripts directory.
[[ ! -e ~/.config/lxsession/LXDE-pi/autostart ]] && mkdir -p ~/.config/lxsession/LXDE-pi/
[[ ! -f ~/.config/lxsession/LXDE-pi/autostart ]] && touch ~/.config/lxsession/LXDE-pi/autostart

# Open chromium with our mirror webapp.
# --kiosk       Opens fullscreen
# --incognito   Open incognito mode because Chromium won't break our UI by
#               by prompting if we want to restore our session.
grep "chromium-browser" ~/.config/lxsession/LXDE-pi/autostart 1>&2 > /dev/null || echo "@chromium-browser --kiosk --incognito mirror.local" >> ~/.config/lxsession/LXDE-pi/autostart

# Install clutter to hide mouse automatically when there's no activity.
sudo apt-get install -y unclutter
grep "unclutter" ~/.config/lxsession/LXDE-pi/autostart 1>&2 > /dev/null || echo "@unclutter -idle 0.1 -root" >> ~/.config/lxsession/LXDE-pi/autostart
