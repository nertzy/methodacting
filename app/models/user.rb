# == Schema Information
# Schema version: 3
#
# Table name: users
#
#  id              :integer(11)   not null, primary key
#  name            :string(255)   
#  hashed_password :string(255)   
#  salt            :string(255)   
#

class User < ActiveRecord::Base
  has_many :actors, :foreign_key => 'creator_id'
  validates_presence_of :name
  validates_uniqueness_of :name, :case_sensitive => false
  
end
