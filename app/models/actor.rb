# == Schema Information
# Schema version: 3
#
# Table name: actors
#
#  id         :integer(11)   not null, primary key
#  name       :string(255)   
#  created_on :date          
#  updated_on :date          
#  active     :boolean(1)    
#  creator_id :integer(11)   
#

class Actor < ActiveRecord::Base
  belongs_to :creator, :class_name => 'User', :foreign_key => 'creator_id'
  validates_presence_of :name
end
