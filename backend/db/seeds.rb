require 'date'

User.destroy_all
Vendor.destroy_all
PurchaseTransaction.destroy_all
Customer.destroy_all
SalesTransaction.destroy_all

puts "🌱 Seeding spices..."

user1 = User.create(business_name: "Tech Solutions", username: "techuser", password: "tech1234")
user2 = User.create(business_name: "Bakery Heaven", username: "bakeryuser", password: "sweetbread")
user3 = User.create(business_name: "Car Repairs", username: "carfixer", password: "password1234")

vendor1a = Vendor.create(name: "Office Tech Supplies", user: user1)
vendor1b = Vendor.create(name: "Global IT Solutions", user: user1)
vendor1c = Vendor.create(name: "Tech Gear Ltd", user: user1)

vendor2a = Vendor.create(name: "Flourish Bakery Supplies", user: user2)
vendor2b = Vendor.create(name: "Sweet Aromas", user: user2)
vendor2c = Vendor.create(name: "Oven Tech Industries", user: user2)

vendor3a = Vendor.create(name: "Auto Parts Co.", user: user3)
vendor3b = Vendor.create(name: "Mechanic Tools Inc.", user: user3)
vendor3c = Vendor.create(name: "Car Care Solutions", user: user3)

users = User.all

users.each do |user|
  10.times do
    PurchaseTransaction.create(
      amount: rand(100.00..1000.00).round(2),
      description: "Transaction for #{user.username}",
      date: Date.new(2024, 7, rand(1..31)),
      vendor_id: user.vendors.sample.id,
      user_id: user.id
    )
  end
end

customer1a = Customer.create(name: "Power Home Remodeling", user: user1)
customer1b = Customer.create(name: "ShotBlast Inc.", user: user1)
customer1c = Customer.create(name: "A&Y Logistics", user: user1)

customer2a = Customer.create(name: "Cafe Delight", user: user2)
customer2b = Customer.create(name: "Sweet St Bakery", user: user2)
customer2c = Customer.create(name: "Doughnut World", user: user2)

customer3a = Customer.create(name: "Auto Supply Central", user: user3)
customer3b = Customer.create(name: "Quick Fix Garage", user: user3)
customer3c = Customer.create(name: "Car Enthusiasts Shop", user: user3)

users.each do |user|
  10.times do
    SalesTransaction.create(
      amount: rand(1000.00..1200.00).round(2),
      description: "Transaction for #{user.username}",
      date: Date.new(2024, 7, rand(1..31)),
      customer_id: user.customers.sample.id,
      user_id: user.id
    )
  end
end

puts "✅ Done seeding!"
