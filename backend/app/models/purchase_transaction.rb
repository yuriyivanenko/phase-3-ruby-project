class PurchaseTransaction < ActiveRecord::Base
  belongs_to :purchase_category
  belongs_to :vendor
  belongs_to :user
end
