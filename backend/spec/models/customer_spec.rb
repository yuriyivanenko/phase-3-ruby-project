RSpec.describe Customer do
  customer = Customer.create(name: "The Warf")
  
  it "check for valid customer creation" do
    expect(customer.name).to eq("The Warf")
    expect(customer.id).to be > 0
  end
end
