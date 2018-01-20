#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

from datetime import datetime
import requests
import json
import settings


class NS():

    def __init__(self):
        self.departure = settings.NS_DEPARTURE_LOCATION
        self.arrival = settings.NS_ARRIVAL_LOCATION
        self.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://www.ns.nl/reisplanner/',
            'DNT': '1',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
        }

    def get_journeys(self):
        journeys = []
        for journeyInfo in self.data['reismogelijkheden']:
            journey = {}

            journey['cancelled'] = (journeyInfo['status'] == 'VERVALLEN')
            journey['malfunction'] = (journeyInfo['status'] == 'ALTERNATIEF')

            if journey['cancelled']:
                journey['error'] = 'This journey has been cancelled'

            if journey['malfunction']:
                journey['error'] = 'This journey has one or more malfunctions'

            journey['departureTime'] = datetime.strptime(
                journeyInfo['vertrektijd'],
                "%Y-%m-%dT%H:%M"
            ).strftime('%H:%M')

            journey['arrivalTime'] = datetime.strptime(
                journeyInfo['aankomsttijd'],
                "%Y-%m-%dT%H:%M"
            ).strftime('%H:%M')

            journey['departureDelay'] = 0
            if journeyInfo['vertrektijdVertraging']:
                delay = journeyInfo['vertrektijdVertraging']['minuten']
                delay += (journeyInfo['vertrektijdVertraging']['uren'] * 60)
                journey['departureDelay'] = delay

            journey['arrivalDelay'] = 0
            if journeyInfo['aankomsttijdVertraging']:
                delay = journeyInfo['aankomsttijdVertraging']['minuten']
                delay = (journeyInfo['aankomsttijdVertraging']['uren'] * 60)
                journey['arrivalDelay'] = delay

            journey['transportImage'] = self.get_transport_image(journeyInfo)
            journeys.append(journey)
        return journeys

    def get_transport_image(self, journeyInfo):
        params = {
            'q': journeyInfo['reisdelen'][0]['treinnummer'],
            'vertrekstation': journeyInfo['reisdelen'][0]['stops'][0]['locatie']['id'],
            'vertrektijd': journeyInfo['vertrektijd'],
        }
        url = 'https://www.ns.nl/reisinfo-api/service/treininformatie'
        response = requests.get(url, params=params, headers=self.headers)
        if response.status_code == 200:
            modality = json.loads(response.content.decode('utf-8'))
            try:
                image = modality[0]['materieeldelen'][0]['afbeelding']
                return image
            except Exception:
                return None


    @property
    def data(self):
        params = {
            'vertreklocatie': 'TREINSTATION-{}'.format(self.departure),
            'aankomstlocatie': 'TREINSTATION-{}'.format(self.arrival),
            'onbeperktReizen': 'false',
            'overstaptijd': '0',
            'tijdstip': datetime.now().strftime('%Y-%m-%dT%H:%M'),
            'toonHSL': 'true',
            'type': 'VERTREK',
        }
        url = 'https://www.ns.nl/reisinfo-api/service/reisadvies'
        response = requests.get(url, params=params, headers=self.headers)
        return json.loads(response.content.decode('utf-8')) if response.status_code == 200 else {}
