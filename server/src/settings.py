#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

from os.path import join, dirname
import dotenv

env = dotenv.get_variables(join(dirname(__file__), '.env'))

# ------------------------------------------------------------------------
# WEATHER

# Go to https://darksky.net/dev/docs for for information about the params.
# ------------------------------------------------------------------------
WEATHER_API_TOKEN = env["WEATHER_API_TOKEN"]
WEATHER_LANG = 'nl'
WEATHER_UNIT = 'auto'
