RSpec.describe PurchaseTransaction do
  before(:all) do
    @user = User.create!(business_name: "Tech Solutions", username: "techuser", password: "tech1234")
    @vendor = Vendor.create!(name: "Power Home Remodeling", user: @user)

    today = Date.today
    10.times do
      PurchaseTransaction.create!(
        amount: 50,
        description: "Purchase for #{@user.username}",
        date: Date.new(today.year, today.month, rand(1..31)),
        vendor: @vendor,
        user: @user
      )
    end
  end
  
  it "returns the year to date sales" do
    expect(PurchaseTransaction.total_YTD_purchases(@user.id)).to eq(500)
  end

  it "returns the month to date sales" do
    expect(PurchaseTransaction.total_MTD_purchases(@user.id)).to eq(500)
  end

  it "returns last months todal sales" do
    expect(PurchaseTransaction.total_last_month_purchases(@user.id)).to eq(0)
  end
end
