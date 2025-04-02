#!/bin/bash

python manage.py clearsessions
python manage.py makemigrations
python manage.py migrate

gunicorn -c gunicorn.conf.py feed_this_much.wsgi
