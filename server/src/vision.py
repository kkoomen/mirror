#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

"""
TODO
"""


import picamera
import picamera.array
import cv2

class Vision():

    def __init__(self):
        self.resolution = (640, 480)
        self.framerate = 32
        self.face_detected = False

    def capture(self, cascade='cascades/haarcascade_frontalface_default.xml', debug=False):
        face_cascade = cv2.CascadeClassifier(cascade)
        with picamera.PiCamera() as camera:
            with picamera.array.PiRGBArray(camera) as stream:
                camera.resolution = self.resolution
                camera.vflip = True
                camera.hflip = True

                camera.capture(stream, 'bgr', use_video_port=True)
                frame = stream.array

                gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                scale_factor = 1.3
                min_neighbors = 6
                faces = face_cascade.detectMultiScale(gray_frame, scale_factor, min_neighbors)
                if len(faces) > 0:
                    self.face_detected = True
                    if debug:
                        for (x, y, w, h) in faces:
                            cv2.rectangle(frame, (x, y), (x+w, y+h), (255,0,0), 2)
                else:
                    self.face_detected = False

                if debug:
                    cv2.imshow('frame', frame)
                    # key = cv2.waitKey(1) & 0xFF
                    # if key == ord('q') or key == 27:
                        # break

                # reset the stream before the next capture
                stream.seek(0)
                stream.truncate()

                if debug:
                    cv2.destroyAllWindows()
