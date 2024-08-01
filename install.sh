#!/bin/bash

cd backend
echo "Installing gems..."
bundle install

echo "Running database migrations..."
bundle exec rake db:migrate db:seed

cd ../frontend
echo "Installing node packages..."
npm install
