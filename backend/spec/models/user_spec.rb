RSpec.describe User do
  user = User.new(
    business_name: "Power Home Remodeling", 
    username: "yivanenko", 
    password: "password"
  )

  it "check for user creation" do
    expect(user.business_name).to eq("Power Home Remodeling")
    expect(user.username).to eq("yivanenko")
    expect(user.password).to eq("password")
  end
end
