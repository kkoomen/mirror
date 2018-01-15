#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

"""
TODO
"""

# import the necessary packages
from picamera.array import PiRGBArray
from picamera import PiCamera
import time
import cv2

# initialize the camera and grab a reference to the raw camera capture
camera = PiCamera()
resolution = (100, 75)
camera.resolution = resolution
camera.framerate = 10
camera.hflip = True
camera.vflip = True
rawCapture = PiRGBArray(camera, size=resolution)

# allow the camera to warmup
time.sleep(2)

cascade = '../cascades/haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(cascade)

# capture frames from the camera
for frame in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
    # grab the raw NumPy array representing the image, then initialize the timestamp
    # and occupied/unoccupied text
    image = frame.array

    # show the frame
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    claheGray = clahe.apply(gray)

    faces = face_cascade.detectMultiScale(claheGray, 1.01, 4)
    if len(faces) > 0:
        for (x, y, w, h) in faces:
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 1)

    cv2.imshow('default', image)
    cv2.imshow('gray', gray)
    cv2.imshow('claheGray', claheGray)
    key = cv2.waitKey(1) & 0xFF

    # clear the stream in preparation for the next frame
    rawCapture.truncate(0)

    # if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break
