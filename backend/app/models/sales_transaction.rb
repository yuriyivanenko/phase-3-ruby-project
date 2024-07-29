class SalesTransaction < ActiveRecord::Base
  belongs_to :user
  belongs_to :customer
  belongs_to :sales_category
end
