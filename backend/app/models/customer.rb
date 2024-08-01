class Customer < ActiveRecord::Base
  has_many :sales_transactions, dependent: :destroy
  belongs_to :user
end
