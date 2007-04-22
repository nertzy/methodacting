# == Schema Information
# Schema version: 4
#
# Table name: connections
#
#  id          :integer(11)   not null, primary key
#  source_id   :integer(11)   
#  target_id   :integer(11)   
#  creator_id  :integer(11)   
#  tag         :string(255)   
#  description :string(255)   
#

class Connection < ActiveRecord::Base
  belongs_to :source, :class_name => 'Actor', :foreign_key => 'source_id'
  belongs_to :target, :class_name => 'Actor', :foreign_key => 'target_id'
  belongs_to :creator, :class_name => 'User', :foreign_key => 'creator_id'
  validates_presence_of :tag
  validates_length_of :tag, :minimum => 1
  validates_uniqueness_of :target_id, :scope => [:source_id, :tag]
end
