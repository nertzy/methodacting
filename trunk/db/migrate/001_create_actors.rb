class CreateActors < ActiveRecord::Migration
  def self.up
    create_table :actors do |t|
      t.column :name, :string
      t.column :created_on, :date
      t.column :updated_on, :date
      t.column :active, :boolean
    end
  end

  def self.down
    drop_table :actors
  end
end
