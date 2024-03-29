require File.dirname(__FILE__) + '/../test_helper'
require 'users_controller'

# Re-raise errors caught by the controller.
class UsersController; def rescue_action(e) raise e end; end

class UsersControllerTest < Test::Unit::TestCase
  fixtures :users

  def setup
    @controller = UsersController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  def test_should_get_index
    get :index
    assert_response :success
    assert assigns(:users)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end
  
  def test_should_create_user
    old_count = User.count
    post :create, :user => { :name => 'Bob' }
    assert_equal old_count+1, User.count
    
    assert_redirected_to user_path(assigns(:user))
  end

  def test_should_show_user
    get :show, :id => 1
    assert_response :success
    assert_select 'table.actors th', :text => /Creator/, :count => 0
  end

  def test_should_get_edit
    get :edit, :id => 1
    assert_response :success
  end
  
  def test_should_update_user
    put :update, :id => 1, :user => { }
    assert_redirected_to user_path(assigns(:user))
  end
  
  def test_should_destroy_user
    old_count = User.count
    delete :destroy, :id => 1
    assert_equal old_count-1, User.count
    
    assert_redirected_to users_path
  end
end
