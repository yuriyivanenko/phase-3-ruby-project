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

  post "/profitandloss" do 
    sales = SalesTransaction.where(user_id: params[:id]).sum(:amount)
    purchases = PurchaseTransaction.where(user_id: params[:id]).sum(:amount)
    {
      sales: sales,
      purchases: purchases,
      profit_or_loss: sales - purchases
    }.to_json
  end
end
