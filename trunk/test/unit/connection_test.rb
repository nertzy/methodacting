require File.dirname(__FILE__) + '/../test_helper'

class ConnectionTest < Test::Unit::TestCase
  fixtures :connections

  def test_presence_of_tag
    connection = Connection.new(
      :source_id => 1,
      :tag => '',
      :target_id => 2
    )
    assert !connection.valid?
  end

  def test_uniqueness
    connection = Connection.new
    connection.source_id = connections(:grant_friend_jason).source_id
    connection.target_id = connections(:grant_friend_jason).target_id
    connection.tag = connections(:grant_friend_jason).tag
    assert !connection.valid?
  end

  def test_tag
    connection = Connection.new(
      :source_id => 1,
      :target_id => 2,
      :tag => 'Peer'
    )
    assert !connection.valid?
  end
  
  def test_source_is_not_target
    connection = Connection.new(
      :source_id => 1,
      :target_id => 1,
      :tag => 'Friend'
    )
    assert !connection.valid?
  end

end
