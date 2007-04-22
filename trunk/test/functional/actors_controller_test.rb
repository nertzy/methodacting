require File.dirname(__FILE__) + '/../test_helper'
require 'actors_controller'

# Re-raise errors caught by the controller.
class ActorsController; def rescue_action(e) raise e end; end

class ActorsControllerTest < Test::Unit::TestCase
  fixtures :actors

  def setup
    @controller = ActorsController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  def test_should_get_index
    get :index
    assert_response :success
    assert assigns(:actors)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end
  
  def test_should_create_actor
    old_count = Actor.count
    post :create, :actor => { :name => 'Yoyodyne', :tag => 'Group' }
    assert_equal old_count+1, Actor.count
    
    assert_redirected_to actor_path(assigns(:actor))
  end

  def test_should_show_actor
    get :show, :id => 1
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => 1
    assert_response :success
  end
  
  def test_should_update_actor
    put :update, :id => 1, :actor => { }
    assert_redirected_to actor_path(assigns(:actor))
  end
  
  def test_should_destroy_actor
    old_count = Actor.count
    delete :destroy, :id => 1
    assert_equal old_count-1, Actor.count
    
    assert_redirected_to actors_path
  end
end
