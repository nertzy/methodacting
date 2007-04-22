class CreateActors < ActiveRecord::Migration
  def self.up
    create_table :actors do |t|
      t.column :name, :string
      t.column :created_on, :datetime
      t.column :updated_on, :datetime
      t.column :active, :boolean
    end
  end

  def self.down
    drop_table :actors
  end
end
