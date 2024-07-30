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
    id = params[:id]
    start_date = params[:startDate]
    end_date = params[:endDate]

    sales = SalesTransaction.total_sales_between_dates(id, start_date, end_date)
    purchases = PurchaseTransaction.total_purchases_between_dates(id, start_date, end_date)

    {
      sales: sales,
      purchases: purchases,
      profit_or_loss: sales - purchases
    }.to_json
  end

  post "/query_vendor_or_customer" do 
    id = params[:id]
    transactionType = params[:transactionType]
    if transactionType == "Sale"
      Customer.where(user_id: id).to_json
    else 
      Vendor.where(user_id: id).to_json
    end
  end

  post "/new_transaction" do 
    if params[:transactionType] == "Sale"
      SalesTransaction.create(
        amount: params[:amount],
        description: params[:description],
        date: params[:date],
        customer_id: params[:party],
        user_id: params[:userId]
      )
    else 
      PurchaseTransaction.create(
        amount: params[:amount],
        description: params[:description],
        date: params[:date],
        vendor_id: params[:party],
        user_id: params[:userId]
      )
    end
    {message: "Worked"}.to_json
  end
end
