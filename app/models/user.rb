# == Schema Information
# Schema version: 5
#
# Table name: users
#
#  id              :integer(11)   not null, primary key
#  name            :string(255)   
#  hashed_password :string(255)   
#  salt            :string(255)   
#  created_on      :datetime      
#  updated_on      :datetime      
#

class User < ActiveRecord::Base
  has_many :actors, :foreign_key => 'creator_id'
  has_many :connections, :foreign_key => 'creator_id'
  validates_presence_of :name
  validates_uniqueness_of :name, :case_sensitive => false
end
