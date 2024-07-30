require 'date'

User.destroy_all
Vendor.destroy_all
PurchaseCategory.destroy_all
PurchaseTransaction.destroy_all
Customer.destroy_all
SalesCategory.destroy_all
SalesTransaction.destroy_all

puts "🌱 Seeding spices..."

# Seed your database here
user1 = User.create(business_name: "Tech Solutions", username: "techuser", password: "tech1234")
user2 = User.create(business_name: "Bakery Heaven", username: "bakeryuser", password: "sweetbread")
user3 = User.create(business_name: "Car Repairs", username: "carfixer", password: "password1234")

# Vendor Seed Data for User 1
vendor1a = Vendor.create(vendor_name: "Office Tech Supplies", user: user1)
vendor1b = Vendor.create(vendor_name: "Global IT Solutions", user: user1)
vendor1c = Vendor.create(vendor_name: "Tech Gear Ltd", user: user1)

# Vendor Seed Data for User 2
vendor2a = Vendor.create(vendor_name: "Flourish Bakery Supplies", user: user2)
vendor2b = Vendor.create(vendor_name: "Sweet Aromas", user: user2)
vendor2c = Vendor.create(vendor_name: "Oven Tech Industries", user: user2)

# Vendor Seed Data for User 3
vendor3a = Vendor.create(vendor_name: "Auto Parts Co.", user: user3)
vendor3b = Vendor.create(vendor_name: "Mechanic Tools Inc.", user: user3)
vendor3c = Vendor.create(vendor_name: "Car Care Solutions", user: user3)

# Purchase Category Seed Data for User 1
category1a = PurchaseCategory.create(name: "Electronics", user: user1)
category1b = PurchaseCategory.create(name: "Office Supplies", user: user1)
category1c = PurchaseCategory.create(name: "Software", user: user1)

# Purchase Category Seed Data for User 2
category2a = PurchaseCategory.create(name: "Baking Ingredients", user: user2)
category2b = PurchaseCategory.create(name: "Packaging", user: user2)
category2c = PurchaseCategory.create(name: "Decorations", user: user2)

# Purchase Category Seed Data for User 3
category3a = PurchaseCategory.create(name: "Auto Parts", user: user3)
category3b = PurchaseCategory.create(name: "Tools", user: user3)
category3c = PurchaseCategory.create(name: "Car Care Products", user: user3)

# Seed Purchase Transactions for each user
users = User.all

users.each do |user|
  10.times do
    PurchaseTransaction.create(
      amount: rand(100.00..1000.00).round(2),
      description: "Transaction for #{user.username}",
      date: Date.new(2024, 7, rand(1..31)),
      purchase_category_id: user.purchase_categories.sample.id,
      vendor_id: user.vendors.sample.id,
      user_id: user.id
    )
  end
end

# Customer Seed Data for User 1
customer1a = Customer.create(name: "Power Home Remodeling", user: user1)
customer1b = Customer.create(name: "ShotBlast Inc.", user: user1)
customer1c = Customer.create(name: "A&Y Logistics", user: user1)

# Customer Seed Data for User 2
customer2a = Customer.create(name: "Cafe Delight", user: user2)
customer2b = Customer.create(name: "Sweet St Bakery", user: user2)
customer2c = Customer.create(name: "Doughnut World", user: user2)

# Customer Seed Data for User 3
customer3a = Customer.create(name: "Auto Supply Central", user: user3)
customer3b = Customer.create(name: "Quick Fix Garage", user: user3)
customer3c = Customer.create(name: "Car Enthusiasts Shop", user: user3)

# Sales Categories for a Tech Solutions Business
sales1a = SalesCategory.create(name: "Computers", user_id: user1.id)
sales1b = SalesCategory.create(name: "Software", user_id: user1.id)
sales1c = SalesCategory.create(name: "Peripherals", user_id: user1.id)

# Sales Categories for a Bakery
sales2a = SalesCategory.create(name: "Breads", user_id: user2.id)
sales2b = SalesCategory.create(name: "Cakes", user_id: user2.id)
sales2c = SalesCategory.create(name: "Pastries", user_id: user2.id)

# Sales Categories for a Car Repair Shop
sales3a = SalesCategory.create(name: "Engine Parts", user_id: user3.id)
sales3b = SalesCategory.create(name: "Bodywork Supplies", user_id: user3.id)
sales3c = SalesCategory.create(name: "Maintenance Services", user_id: user3.id)

users.each do |user|
  10.times do
    SalesTransaction.create(
      amount: rand(1000.00..1200.00).round(2),
      description: "Transaction for #{user.username}",
      date: Date.new(2024, 7, rand(1..31)),
      sales_category_id: user.sales_categories.sample.id,
      customer_id: user.customers.sample.id,
      user_id: user.id
    )
  end
end

puts "✅ Done seeding!"
