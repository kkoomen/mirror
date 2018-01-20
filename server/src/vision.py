#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

from picamera.array import PiRGBArray
from picamera import PiCamera
from threading import Thread
import numpy as np
import cv2

from datetime import datetime
import os

def get_cpu_temperature():
    res = os.popen('vcgencmd measure_temp').readline()
    return float(res.replace("temp=", "").replace("'C\n", ""))

def allowed_to_stream():
    state = False
    temp = get_cpu_temperature()
    hour = int(datetime.now().strftime('%H'))

    # Disable if temperature is 80+ because we don't want to overheat the
    # camera.
    if temp < 80 and (hour >= 6 and hour < 22):
        state = True

    return state

class PiVideoStream:

    def __init__(self):
        self.resolution = (112, 80)
        self.framerate = 1

        self.camera = PiCamera()
        self.camera.hflip = True
        self.camera.vflip = True
        self.camera.resolution = self.resolution
        self.camera.framerate = self.framerate
        self.rawCapture = PiRGBArray(self.camera, size=self.resolution)
        self.stream = self.camera.capture_continuous(self.rawCapture, format='bgr', use_video_port=True)
        self.image = None
        self.stopped = False

        self.cascade = 'cascades/haarcascade_frontalface_default.xml'
        self.face_cascade = cv2.CascadeClassifier(self.cascade)
        self.face_detected = False

    def start(self):
        t = Thread(target=self.update)
        t.daemon = True
        t.start()
        return self

    def update(self):
        for frame in self.stream:
            self.image = frame.array
            self.rawCapture.truncate(0)

            if self.stopped or not allowed_to_stream():
                self.stream.close()
                self.rawCapture.close()
                self.camera.close()
                return

    def read(self):
        return self.image


    def detect_face(self):
        if self.image is None:
            return False

        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        claheGray = clahe.apply(gray)

        faces = self.face_cascade.detectMultiScale(claheGray, 1.01, 4)
        if len(faces) > 0:
            self.face_detected = True
        else:
            self.face_detected = False

        return self.face_detected

    def stop(self):
        self.stopped = True
