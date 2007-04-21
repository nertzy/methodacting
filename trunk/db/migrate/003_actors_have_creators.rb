class ActorsHaveCreators < ActiveRecord::Migration
  def self.up
    add_column :actors, :creator_id, :integer
  end

  def self.down
    remove_column :actors, :creator_id
  end
end
