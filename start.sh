
#!/bin/bash

# Navigate to backend folder and install Ruby gems
echo "Installing gems..."
cd backend
bundle install

# Run databse migrations
echo "Running database migrations..."
bundle exec rake db:migrate db:seed


echo "Starting Sinatra server..."
nohup bundle exec rake server > sinatra.log 2>&1 &

# Navigate to the frontend folder
cd ../frontend

echo "Installing node packages..."
npm install

echo "Starting React frontend..."
npm start
