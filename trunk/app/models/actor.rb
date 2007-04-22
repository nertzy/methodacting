# == Schema Information
# Schema version: 5
#
# Table name: actors
#
#  id         :integer(11)   not null, primary key
#  name       :string(255)   
#  created_on :datetime      
#  updated_on :datetime      
#  active     :boolean(1)    
#  creator_id :integer(11)   
#  tag        :string(255)   
#

class Actor < ActiveRecord::Base
  include ActionController::UrlWriter
  default_url_options[:host] = 'localhost:3000'
  
  TAGS = %w{Individual Group}
  
  belongs_to :creator, :class_name => 'User', :foreign_key => 'creator_id'
  
  has_many :inbound_connections, :class_name => 'Connection', :foreign_key => 'target_id'
  has_many :outbound_connections, :class_name => 'Connection', :foreign_key => 'source_id'
  
  validates_presence_of :name
  validates_length_of :name, :minimum => 1
  validates_presence_of :tag
  validates_inclusion_of :tag, :in => TAGS

  def connections
    self.inbound_connections + self.outbound_connections
  end
  
  def url
    actor_url(self) + '.xml'
  end
end
