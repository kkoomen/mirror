#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#


from flask import Flask, json
from flask_cors import CORS
import time

from widgets.ns import NS
from widgets.weather import Weather
from vision import PiVideoStream
import settings

app = Flask(__name__)
CORS(app)


@app.route('/weather', methods=['GET'])
def weather():
    weather = Weather().get()
    return json.dumps(weather)


@app.route('/journey-planner', methods=['GET'])
def journeyPlanner():
    journeys = NS().get_journeys()
    return json.dumps({
        'departure': settings.NS_DEPARTURE_LOCATION,
        'arrival': settings.NS_ARRIVAL_LOCATION,
        'schedules': journeys,
    })


@app.route('/activity', methods=['GET'])
def activity():
    detected = stream.detect_face()
    return json.dumps({
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
