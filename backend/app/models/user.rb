class User < ActiveRecord::Base
  has_many :vendors
  has_many :purchase_categories
  has_many :purchase_transactions
end
