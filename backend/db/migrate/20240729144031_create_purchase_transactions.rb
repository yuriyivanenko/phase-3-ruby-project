class CreatePurchaseTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :purchase_transactions do |t|
      t.decimal :amount, precision: 10, scale: 2
      t.string :description
      t.integer :purchase_category_id
      t.integer :vendor_id
      t.integer :user_id
      t.timestamps
    end
  end
end
