class CreateTargets < ActiveRecord::Migration[5.1]
  def change
    create_table :targets do |t|
      t.string :name
      t.integer :x
      t.integer :y
      t.integer :keyX
      t.integer :keyY

      t.timestamps
    end
  end
end
