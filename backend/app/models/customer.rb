class Customer < ActiveRecord::Base
  has_many :sales_transactions
  belongs_to :user
end
