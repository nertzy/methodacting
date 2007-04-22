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
  CONNECTIONS = {
    'Member' => [
      [Actor, Actor]
    ],
    'Friend' => [
      [Actor, Actor]
    ],
    'Leader' => [
      [Actor, Actor]
    ]
  }
  
  belongs_to :source, :class_name => 'Actor', :foreign_key => 'source_id'
  belongs_to :target, :class_name => 'Actor', :foreign_key => 'target_id'
  belongs_to :creator, :class_name => 'User', :foreign_key => 'creator_id'
  
  validates_presence_of :tag
  validates_length_of :tag, :minimum => 1
  validates_uniqueness_of :target_id, :scope => [:source_id, :tag]
  validates_inclusion_of :tag, :in => CONNECTIONS, :message => "can be #{CONNECTIONS.keys.to_sentence} only"
  validate :validate_tag, :validate_source_is_not_target
  
  private
  
  def validate_tag
    if CONNECTIONS[tag]
      unless CONNECTIONS[tag].include?([source.class, target.class])
        errors.add(:tag, "\"#{tag}\" cannot be between #{source.class} and #{target.class}")
      end
    end
  end
  
  def validate_source_is_not_target
    errors.add(:target_id, 'cannot be the same as source') if source == target
  end
  
end