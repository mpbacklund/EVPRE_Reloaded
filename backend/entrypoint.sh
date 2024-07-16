#!/bin/sh

# Run database migrations
python manage.py migrate

# Start the server
exec "$@"