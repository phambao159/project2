#!/bin/sh
set -e

echo "⏳ Waiting for MySQL (nc)..."

: "${DB_HOST:=mysql}"
: "${DB_PORT:=3306}"

MAX_TRIES=30
TRIES=0

while ! nc -z $DB_HOST $DB_PORT; do
  echo "Waiting for $DB_HOST:$DB_PORT..."
  sleep 2
  TRIES=$((TRIES+1))
  if [ $TRIES -ge $MAX_TRIES ]; then
    echo "❌ MySQL not ready after 60s, exiting..."
    exit 1
  fi
done

echo "🚀 Checking migrations..."

if php artisan migrate:status | grep -q "Yes"; then
  echo "🔄 Database already migrated, running migrate (no seed)"
  php artisan migrate --force
else
  echo "✨ First time setup: migrate + seed"
  php artisan migrate --seed --force
fi

echo "✅ Starting PHP-FPM..."
exec php-fpm
