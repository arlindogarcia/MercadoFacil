# Mercado Fácil — imagem única: Nginx + PHP-FPM + Supervisor (workers + scheduler)
#
# Build: docker build -t mercado-facil:latest .
# Dev:   docker compose up -d

FROM node:20-bookworm AS node_assets

WORKDIR /var/www

COPY package.json package-lock.json* ./
RUN npm ci --include=dev --no-audit --no-fund 2>/dev/null || npm install --include=dev --no-audit --no-fund

COPY . .
RUN npm run build-deploy

FROM php:8.2-fpm-bookworm AS production

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    default-mysql-client \
    gzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    openssl \
    unzip \
    git \
    curl \
    supervisor \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /var/log/supervisor /var/www/storage/logs /var/www/bootstrap/cache \
    && rm -f /etc/nginx/sites-enabled/default

RUN docker-php-ext-install -j"$(nproc)" \
    pdo_mysql \
    mbstring \
    zip \
    exif \
    pcntl \
    bcmath \
    gd \
    soap \
    intl

RUN sed -i 's/^listen = .*/listen = 127.0.0.1:9000/' /usr/local/etc/php-fpm.d/www.conf

COPY docker/entrypoint-all.sh docker/run-queue-worker.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint-all.sh /usr/local/bin/run-queue-worker.sh

COPY docker/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/mercado-facil.conf

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_PROCESS_TIMEOUT=0

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist

COPY --from=node_assets /var/www/public/build ./public/build
COPY --from=node_assets /var/www/public/build-front ./public/build-front

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public/build /var/www/public/build-front \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 755 /var/www/public/build /var/www/public/build-front

RUN mkdir -p storage/app/public \
    && ln -sfn ../storage/app/public public/storage \
    && chown -h www-data:www-data public/storage 2>/dev/null || true

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -fsS http://127.0.0.1/health >/dev/null || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint-all.sh"]
