require "date"
require "pry"

class ApplicationController < Sinatra::Base
  set :default_content_type, "application/json"

  post "/users" do
    user = User.find_by(username: params[:username])

    if user && user[:password] == params[:password]
      user.to_json
    else
      {username: "error"}.to_json
    end
  end

  post "/sign_up_user" do
    new_user = User.create(
      business_name: params[:businessName],
      username: params[:username],
      password: params[:password]
    )
    new_user.to_json
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

  post "/fetch_all_vendors_and_customers" do
    id = params[:id]
    vendors = Vendor.where(user_id: id).order(name: :asc)
    customers = Customer.where(user_id: id).order(name: :asc)
    {
      vendors: vendors,
      customers: customers
    }.to_json
  end

  patch "/update_vendor_or_customer" do
    if params[:type] == "vendor"
      vendor = Vendor.find(params[:party_id])
      vendor.update(name: params[:partyName])
      {party: vendor, type: "vendor"}.to_json
    else 
      customer = Customer.find(params[:party_id])
      customer.update(name: params[:partyName])
      {party: customer, type: "customer"}.to_json
    end
  end

  post "/delete_vendor_or_customer" do
    puts params
    if params[:type] == "vendor"
      vendor = Vendor.find(params[:party_id])
      vendor.destroy
      {party: vendor, type: "vendor"}.to_json
    else
      customer = Customer.find(params[:party_id])
      customer.destroy
      {party: customer, type: "customer"}.to_json
    end
  end

  post "/add_vendor" do
    vendor = Vendor.create(name: params[:name], user_id: params[:user_id])
    vendor.to_json
  end

  post "/add_customer" do
    customer = Customer.create(name: params[:name], user_id: params[:user_id])
    customer.to_json
  end

  post "/get_all_sales_transactions" do
    user = User.find(params[:id])
    sales = user.sales_transactions.order(date: :asc) 
    sales.to_json(include: :customer)
  end

  post "/get_all_purchases_transactions" do
    user = User.find(params[:id])
    purchases = user.purchase_transactions.order(date: :asc)
    purchases.to_json(include: :vendor)
  end

  post "/generate_YTD_PandL" do
    user_id = params[:id]
    sales = SalesTransaction.total_YTD_sales(user_id)
    purchases  = PurchaseTransaction.total_YTD_purchases(user_id)
    {
      sales: sales,
      purchases: purchases,
      profit_or_loss: sales - purchases,
      end_date: Date.today,
      start_date: Date.new(Date.today.year, 1, 1)
    }.to_json
  end

  post "/generate_MTD_PandL" do
    user_id = params[:id]
    sales = SalesTransaction.total_MTD_sales(user_id)
    purchases  = PurchaseTransaction.total_MTD_purchases(user_id)
    {
      sales: sales,
      purchases: purchases,
      profit_or_loss: sales - purchases,
      end_date: Date.today,
      start_date: Date.new(Date.today.year, Date.today.month, 1)
    }.to_json
  end

  post "/generate_last_month_PandL" do
    today = Date.today
    sametime_last_month = today << 1
    start_of_last_month = Date.new(sametime_last_month.year, sametime_last_month.month, 1)
    end_of_last_month = Date.new(today.year, today.month, 1) - 1

    user_id = params[:id]
    sales = SalesTransaction.total_last_month_sales(user_id)
    purchases  = PurchaseTransaction.total_last_month_purchases(user_id)
    {
      sales: sales,
      purchases: purchases,
      profit_or_loss: sales - purchases,
      start_date: start_of_last_month,
      end_date: end_of_last_month
    }.to_json
  end
end
