class CreateSalesCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :sales_categories do |t|
      t.string :name
      t.integer :user_id
    end
  end
end
