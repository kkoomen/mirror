#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

from picamera.array import PiRGBArray
from picamera import PiCamera
from threading import Thread
import numpy as np
import cv2

class PiVideoStream:

    def __init__(self, resolution=(640, 480), framerate=30):
        self.camera = PiCamera()
        self.camera.hflip = True
        self.camera.vflip = True
        self.camera.resolution = resolution
        self.camera.framerate = framerate
        self.rawCapture = PiRGBArray(self.camera, size=resolution)
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
        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        claheGray = clahe.apply(gray)

        faces = self.face_cascade.detectMultiScale(claheGray,1.3,5)
        if len(faces) > 0:
            for (x,y,w,h) in faces:
                if w > 90 or h > 90:
                    self.face_detected = True
                    #detected_face = cv2.rectangle(image,(x,y),(x+w,y+h),(0, 0, 255), 2)
                    break
                else:
                    self.face_detected = False
        else:
            self.face_detected = False

        return self.face_detected

    def stop(self):
        self.stopped = True
