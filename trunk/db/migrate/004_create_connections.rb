class CreateConnections < ActiveRecord::Migration
  def self.up
    create_table :connections do |t|
      t.column :source_id, :integer
      t.column :target_id, :integer
      t.column :creator_id, :integer
      t.column :tag, :string
      t.column :description, :string
    end
  end

  def self.down
    drop_table :connections
  end
end
