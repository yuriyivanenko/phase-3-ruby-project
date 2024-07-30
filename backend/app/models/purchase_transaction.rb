class PurchaseTransaction < ActiveRecord::Base
  belongs_to :purchase_category
  belongs_to :vendor
  belongs_to :user

  def self.total_purchases_between_dates(id, start_date, end_date)
    where(user_id: id, date: start_date..end_date).sum(:amount)
  end
end
