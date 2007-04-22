# == Schema Information
# Schema version: 4
#
# Table name: actors
#
#  id         :integer(11)   not null, primary key
#  name       :string(255)   
#  created_on :datetime      
#  updated_on :datetime      
#  active     :boolean(1)    
#  creator_id :integer(11)   
#

class Actor < ActiveRecord::Base
  belongs_to :creator, :class_name => 'User', :foreign_key => 'creator_id'
  has_many :inbound_connections, :class_name => 'Connection', :foreign_key => 'target_id'
  has_many :outbound_connections, :class_name => 'Connection', :foreign_key => 'source_id'
  validates_presence_of :name

  def connections
    self.inbound_connections + self.outbound_connections
  end
end
