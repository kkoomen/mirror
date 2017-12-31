#!/usr/bin/env bash

cd ./server/
virtualenv -p python3 env
source ./env/bin/activate
cp ./src/.env.example ./src/.env
pip install -r requirements.txt
