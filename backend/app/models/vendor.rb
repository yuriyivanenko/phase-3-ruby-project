
class Vendor < ActiveRecord::Base
  belongs_to :user
  has_many :purchase_transactions
end
