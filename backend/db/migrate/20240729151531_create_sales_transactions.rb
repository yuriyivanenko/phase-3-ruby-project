class CreateSalesTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :sales_transactions do |t|
      t.decimal :amount, precision: 10, scale: 2
      t.string :description
      t.integer :sales_category_id
      t.integer :customer_id
      t.integer :user_id
      t.timestamps
    end
  end
end
