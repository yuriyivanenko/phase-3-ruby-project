#!/bin/bash

cd backend
echo "Starting Sinatra server..."
nohup bundle exec rake server > sinatra.log 2>&1 &

cd ../frontend
echo "Starting React frontend..."
npm start
