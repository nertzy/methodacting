require File.dirname(__FILE__) + '/../test_helper'

class ActorTest < Test::Unit::TestCase
  fixtures :actors

  # Replace this with your real tests.
  def test_tag_is_present
    actor = Actor.new(
      :name => 'No Tag',
      :tag => ''
    )
    assert !actor.valid?
  end
  
  def test_tag_is_possible
    actor = Actor.new(
      :name => 'No Such Tag',
      :tag => 'FakeTag'
    )
    assert !actor.valid?
  end
  
  def test_name_is_present
    actor = Actor.new(
      :name => '',
      :tag => 'Individual'
    )
    assert !actor.valid?
  end
  
end
