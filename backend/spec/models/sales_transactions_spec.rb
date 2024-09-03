RSpec.describe SalesTransaction do
  before(:all) do
    @user = User.create!(business_name: "Tech Solutions", username: "techuser", password: "tech1234")
    @customer = Customer.create!(name: "Power Home Remodeling", user: @user)

    today = Date.today
    10.times do
      SalesTransaction.create!(
        amount: 100,
        description: "Transaction for #{@user.username}",
        date: Date.new(today.year, today.month, rand(1..25)),
        customer: @customer,
        user: @user
      )
    end
  end
  
  it "returns the year to date sales" do
    expect(SalesTransaction.total_YTD_sales(@user.id)).to eq(1000)
  end

  it "returns the month to date sales" do
    expect(SalesTransaction.total_MTD_sales(@user.id)).to eq(1000)
  end

  it "returns last months todal sales" do
    expect(SalesTransaction.total_last_month_sales(@user.id)).to eq(0)
  end
end
