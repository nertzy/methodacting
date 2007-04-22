require File.dirname(__FILE__) + '/../test_helper'
require 'connections_controller'

# Re-raise errors caught by the controller.
class ConnectionsController; def rescue_action(e) raise e end; end

class ConnectionsControllerTest < Test::Unit::TestCase
  def setup
    @controller = ConnectionsController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  # Replace this with your real tests.
  def test_tag
    get 'tag', :tag => 'Friend'
    assert_response :success
    assert_select 'ul.connections li', 2
  end
end
