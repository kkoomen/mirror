#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

import settings
import requests
import json

icon_lookup = {
    'clear-day': "assets/images/Sun.png",
    'wind': "assets/images/Wind.png",
    'cloudy': "assets/images/Cloud.png",
    'partly-cloudy-day': "assets/images/PartlySunny.png",
    'rain': "assets/images/Rain.png",
    'snow': "assets/images/Snow.png",
    'snow-thin': "assets/images/Snow.png",
    'fog': "assets/images/Haze.png",
    'clear-night': "assets/images/Moon.png",
    'partly-cloudy-night': "assets/images/PartlyMoon.png",
    'thunderstorm': "assets/images/Storm.png",
    'tornado': "assets/images/Tornado.png",
    'hail': "assets/images/Hail.png"
}


class Weather():

    def get_ip(self):
        try:
            ip_url = 'http://jsonip.com/'
            req = requests.get(ip_url)
            ip_json = json.loads(req.text)
            return ip_json['ip']
        except Exception as e:
            return 'Error: {}. Cannot get ip.'.format(e)

    def get(self):
        weather = {}
        try:
            # get location
            location_req_url = 'http://freegeoip.net/json/{}'.format(self.get_ip())
            r = requests.get(location_req_url)
            location_obj = json.loads(r.text)

            lat = location_obj['latitude']
            lon = location_obj['longitude']

            weather['location'] = '{}, {}'.format(location_obj['city'], location_obj['region_code'])

            # get weather
            weather_req_url = 'https://api.darksky.net/forecast/{}/{},{}?lang={}&units={}'.format(
                settings.WEATHER_API_TOKEN,
                lat,
                lon,
                settings.WEATHER_LANG,
                settings.WEATHER_UNIT
            )

            r = requests.get(weather_req_url)
            weather_obj = json.loads(r.text)

            weather['temperature'] = int((weather_obj['daily']['data'][0]['temperatureMin'] + weather_obj['daily']['data'][0]['temperatureMax']) / 2)
            weather['summary'] = weather_obj['daily']['data'][0]['summary']
            weather['icon'] = weather_obj['daily']['data'][0]['icon']
        except Exception as e:
            print('Error: {}. Cannot get weather.'.format(e))
        finally:
            return weather
