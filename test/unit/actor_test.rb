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
end
