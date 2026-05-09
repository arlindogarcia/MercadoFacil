#!/bin/sh
set -e
cd /var/www

echo "[app] Limpando caches antigos..."
php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true
php artisan cache:clear || true

echo "[app] Manifest de pacotes..."
php artisan package:discover --ansi || true

echo "[app] Symlink public/storage..."
mkdir -p storage/app/public
php artisan storage:link || true

echo "[app] Migrations..."
php artisan migrate --force || true

echo "[app] Caches de produção..."
php artisan config:cache
php artisan route:cache
php artisan view:cache || true

mkdir -p storage/logs bootstrap/cache
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true

echo "[app] Iniciando Supervisor (Nginx, PHP-FPM, workers, scheduler)..."
exec supervisord -c /etc/supervisor/supervisord.conf
