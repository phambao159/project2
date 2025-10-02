FROM php:8.2-fpm


RUN apt-get update && apt-get install -y \
    libzip-dev unzip curl git netcat-openbsd \
    && docker-php-ext-install pdo pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*



COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy file composer trước (tận dụng cache layer)
COPY composer.json composer.lock ./

COPY . .

RUN composer install --no-dev --optimize-autoloader


# Copy script của bạn
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Override entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
