#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#


from flask import Flask, jsonify
from flask_cors import CORS
import time

from widgets.ns import NS
from widgets.weather import Weather
from vision import PiVideoStream
import settings

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/weather', methods=['GET', 'OPTIONS'])
def weather():
    weather = Weather().get()
    return jsonify(weather)


@app.route('/journey-planner', methods=['GET', 'OPTIONS'])
def journeyPlanner():
    journeys = NS().get_journeys()
    return jsonify({
        'departure': settings.NS_DEPARTURE_LOCATION,
        'arrival': settings.NS_ARRIVAL_LOCATION,
        'schedules': journeys,
    })


@app.route('/activity', methods=['GET', 'OPTIONS'])
def activity():
    detected = stream.detect_face()
    return jsonify({
        'detected': detected,
    })


if __name__ == '__main__':
    # Run the camera & sleep for X seconds to let it warm up.
    stream = PiVideoStream()
    stream.start()
    time.sleep(2)

    # Finally run our app.
    app.run(host='0.0.0.0', debug=False, use_reloader=False)

    # Stop the stream when the app is being closed.
    stream.stop()
