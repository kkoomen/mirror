#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8


from os.path import join, dirname
import dotenv

env = dotenv.get_variables(join(dirname(__file__), '.env'))

# ---------------------------------------------------------------------------
# WEATHER
#
# Go to https://darksky.net/dev/docs for for information about the params.
# ---------------------------------------------------------------------------
WEATHER_API_TOKEN = env["WEATHER_API_TOKEN"]
WEATHER_LANG = 'en'
WEATHER_UNIT = 'auto'


# ---------------------------------------------------------------------------
# JOURNEY PLANNER
#
# Go to https://www.ns.nl/en/journeyplanner/ to find out about your departure
# and arrival options. A simple typo gives different information so make sure
# you copy-paste your departure / arrival well in the env file.
# ---------------------------------------------------------------------------
NS_DEPARTURE_LOCATION = env['NS_DEPARTURE_LOCATION']
NS_ARRIVAL_LOCATION = env['NS_ARRIVAL_LOCATION']
