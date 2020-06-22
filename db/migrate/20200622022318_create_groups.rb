class CreateGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :groups do |t|
      t.string :title, null: false
      t.index :title, unique: true
      t.timestamps
    end
  end
end
