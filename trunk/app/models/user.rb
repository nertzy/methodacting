class User < ActiveRecord::Base
  has_many :actors, :foreign_key => 'creator_id'
end
