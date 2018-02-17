# Mirror

This is my version of the famous
[Smart Mirror](https://github.com/HackerHouseYT/Smart-Mirror/) project. The
widgets on the screen will animate in once there has been a face detected.

The project is built with Flask & React used on a Raspberry PI Model B.

![photo of the mirror](screenshot2.jpg)

![appliation screenshot](screenshot.png)


# Installation

- `$ git clone https://github.com/kkoomen/mirror.git && cd mirror/`
- `$ pip3 install -r server/requirements.txt`

Preferably I installed apache, created a build of the react app and put all the
contents in `/var/www/html`. For that installation you install `apache2`.

- `$ sudo apt-get install apache2`
- `$ cd client/`
- `$ npm run build`
- `$ cp build/* /var/www/html/`

If `npm run build` is going out of memory, just do it on your own laptop/pc and
`scp` all the files to your pi.

Example:

```
$ npm run build
$ scp -r build/* <raspberry-ip>:/var/www/html/
```

# Setup

- Put your DarkSky weather API token in `./server/src/.env`.
- Open `./server/src/settings.py` and enter your daily departure / arrival
  locations.

# Run the app

### Run flask app on startup

- `$ sudo systemctl edit --force flask-mirror-api.service`

Paste the following in the file:

```
[Unit]
Description=API for the smart mirror project
After=network.target

[Service]
User=pi
ExecStart=/home/pi/mirror/server/src/main.py
WorkingDirectory=/home/pi/mirror/server/src/
Restart=on-failure
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

### Run chromium on startup

Here we provide `--kiosk` for fullscreen mode and `--incognito` to prevent that
chromium will prompt us with "Restore pages?". This breaks fullscreen, which we
do want to prevent always.

Add the following to `~/.config/lxsession/LXDE-pi/autostart`:

```
@chromium-browser --kiosk --incognito 127.0.0.1
```

### Hide mouse cursor automatically when there's no activity

- `$ sudo apt-get install unclutter`

Add the following to `~/.config/lxsession/LXDE-pi/autostart`:

```
@unclutter -idle 0.1 -root
```

Finally reboot your raspberry and you should be all set.
