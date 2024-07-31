class SalesTransaction < ActiveRecord::Base
  belongs_to :user
  belongs_to :customer

  def self.total_sales_between_dates(id, start_date, end_date)
    where(user_id: id, date: start_date..end_date).sum(:amount)
  end
end
