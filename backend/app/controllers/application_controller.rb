require "date"

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
    puts "PUTSS:: #{params}"
    start_date = params[:startDate]
    end_date = params[:endDate]
    sales = SalesTransaction
      .where(user_id: params[:id], date: start_date..end_date)
      .sum(:amount)
    purchases = PurchaseTransaction
      .where(user_id: params[:id], date: start_date..end_date)
      .sum(:amount)
    {
      sales: sales,
      purchases: purchases,
      profit_or_loss: sales - purchases
    }.to_json
  end
end
