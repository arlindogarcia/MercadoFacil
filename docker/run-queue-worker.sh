#!/bin/sh
set -e
cd /var/www
exec php artisan queue:work "${QUEUE_CONNECTION:-database}" "$@"
