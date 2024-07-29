# frozen_string_literal: true

class ApplicationController < Sinatra::Base
  set :default_content_type, "application/json"

  # Add your routes here
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end

  post "/users" do
    user = User.find_by( username: params[:username] )

    if user && user[:password] == params[:password]
      user.to_json
    else
      { username: "error" }.to_json
    end
  end
end
