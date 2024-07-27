#!/bin/sh

if [ "$NODE_ENV" = "production" ]; then
  echo "Starting in production mode..."
  npm run build:client
  npm start
else
  echo "Starting in development mode..."
  npm run start:dev
fi
