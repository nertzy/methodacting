class AddTypeToActors < ActiveRecord::Migration
  def self.up
    add_column :actors, :type, :string
  end

  def self.down
    remove_column :actors, :type
  end
end
