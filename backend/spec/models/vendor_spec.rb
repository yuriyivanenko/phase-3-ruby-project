RSpec.describe Vendor do
  vendor = Vendor.create(name: "Marts Big House")
  
  it "check for valid vendor creation" do
    expect(vendor.name).to eq("Marts Big House")
    expect(vendor.id).to be > 0
  end
end
