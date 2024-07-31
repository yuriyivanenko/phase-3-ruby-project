class User < ActiveRecord::Base
  has_many :vendors
  has_many :purchase_transactions
  has_many :customers
  has_many :sales_transactions
end
