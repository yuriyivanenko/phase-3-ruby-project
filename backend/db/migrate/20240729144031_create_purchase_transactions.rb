class CreatePurchaseTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :purchase_transactions do |t|
      t.decimal :amount, precision: 10, scale: 2
      t.string :description
      t.date :date
      t.integer :vendor_id
      t.integer :user_id
      t.timestamps
    end

    add_foreign_key :purchase_transactions, :vendors, column: :vendor_id
  end
end
