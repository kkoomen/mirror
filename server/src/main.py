#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

"""
TODO
"""


from flask import Flask, json
from flask_cors import CORS

from widgets.ns import NS
from widgets.weather import Weather
from vision import Vision

app = Flask(__name__)
CORS(app)


@app.route('/weather', methods=['GET'])
def weather():
    weather = Weather().get()
    return json.dumps(weather)


@app.route('/journey-planner', methods=['GET'])
def journeyPlanner():
    journeys = NS().get_journeys()
    return json.dumps(journeys)


@app.route('/activity', methods=['GET'])
def activity():
    vision = Vision()
    vision.capture()
    return json.dumps({
        'detected': vision.face_detected,
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
