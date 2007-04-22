class AddTagToActors < ActiveRecord::Migration
  def self.up
    add_column :actors, :tag, :string
  end

  def self.down
    remove_column :actors, :tag
  end
end
