class PurchaseTransaction < ActiveRecord::Base
  belongs_to :vendor
  belongs_to :user

  def self.total_purchases_between_dates(id, start_date, end_date)
    where(user_id: id, date: start_date..end_date).sum(:amount)
  end

  def self.total_YTD_purchases(id)
    today = Date.today
    start_of_year = Date.new(today.year, 1, 1)

    where(user_id: id, date: start_of_year..today).sum(:amount)
  end

  def self.total_MTD_purchases(id)
    today = Date.today
    start_of_month = Date.new(today.year, today.month, 1)

    where(user_id: id, date: start_of_month..today).sum(:amount)
  end

  def self.total_last_month_purchases(id)
    today = Date.today
    sametime_last_month = today << 1
    start_of_last_month = Date.new(sametime_last_month.year, sametime_last_month.month, 1)
    end_of_last_month = Date.new(today.year, today.month, 1) - 1
    where(user_id: id, date: start_of_last_month..end_of_last_month).sum(:amount)
  end
end
