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

def average_hsv(roi):
    """ Average the HSV colors in a region of interest.
    :param roi: the image array
    :returns: tuple
    """
    h   = 0
    s   = 0
    v   = 0
    num = 0
    for y in range(len(roi)):
        if y % 10 == 0:
            for x in range(len(roi[y])):
                if x % 10 == 0:
                    chunk = roi[y][x]
                    num += 1
                    h += chunk[0]
                    s += chunk[1]
                    v += chunk[2]
    h /= num
    s /= num
    v /= num
    return (int(h), int(s), int(v))

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

            if self.stopped:
                self.stream.close()
                self.rawCapture.close()
                self.camera.close()
                return

    def read(self):
        return self.image


    def detect_face(self):
        if self.image is None:
            return False

        hsv = cv2.cvtColor(self.image, cv2.COLOR_BGR2HSV)
        h, s, v = average_hsv(hsv)

        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        claheGray = clahe.apply(gray)

        # If a face is detected we obviously set the property to True, but if
        # the value of the HSV output is too dark, just assume we detect
        # someone. This is because in the morning it's really dark and then it
        # won't show any data, which we really do want to.
        faces = self.face_cascade.detectMultiScale(claheGray, 1.01, 4)
        hour = int(datetime.now().strftime('%H'))
        if len(faces) > 0 or v < 90 and (6 <= hour <= 22):
            self.face_detected = True
        else:
            self.face_detected = False

        return self.face_detected

    def stop(self):
        self.stopped = True
