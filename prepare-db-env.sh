#!/usr/bin/env bash
# Extract database variables from DATABASE_URL and update .env file

# Import env variables from .env
set -a
source .env

# Extract variables from DATABASE_URL
DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')
DB_NAME=$(echo "$DATABASE_URL" | awk -F'/' '{print $4}')

# Check if we're using the default password
if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Generate a random password? [y/N]: " -r REPLY
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Generate a random URL-safe password
    DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
    # Update DATABASE_URL with new password
    sed -i '' "s#:password@#:$DB_PASSWORD@#" .env
  else
    echo "Warning: Using default password 'password'"
  fi
fi

# Add DB variables to .env
grep -q "^DB_PASSWORD=" .env || echo "DB_PASSWORD=$DB_PASSWORD" >> .env
grep -q "^DB_PORT=" .env || echo "DB_PORT=$DB_PORT" >> .env
grep -q "^DB_NAME=" .env || echo "DB_NAME=$DB_NAME" >> .env

echo "Environment variables prepared. To start the database, run: docker-compose up -d" 