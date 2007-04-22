class ActorsController < ApplicationController
  # GET /actors
  # GET /actors.xml
  def index
    @actors = Actor.find(:all)

    respond_to do |format|
      format.html # index.rhtml
      format.xml  { render :xml => @actors.to_xml(:except => [:creator_id]) }
    end
  end

  # GET /actors/1
  # GET /actors/1.xml
  def show
    @actor = Actor.find(params[:id])

    respond_to do |format|
      format.html # show.rhtml
      format.xml  { render :xml => @actor.to_xml(:except => [:creator_id]) }
    end
  end

  # GET /actors/new
  def new
    @actor = Actor.new
    @actor.creator_id = params[:creator_id]
  end

  # GET /actors/1;edit
  def edit
    @actor = Actor.find(params[:id])
  end

  # POST /actors
  # POST /actors.xml
  def create
    @actor = Actor.new(params[:actor])

    respond_to do |format|
      if @actor.save
        flash[:notice] = 'Actor was successfully created.'
        format.html { redirect_to actor_url(@actor) }
        format.xml  { head :created, :location => actor_url(@actor) }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @actor.errors.to_xml }
      end
    end
  end

  # PUT /actors/1
  # PUT /actors/1.xml
  def update
    @actor = Actor.find(params[:id])

    respond_to do |format|
      if @actor.update_attributes(params[:actor])
        flash[:notice] = 'Actor was successfully updated.'
        format.html { redirect_to actor_url(@actor) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @actor.errors.to_xml }
      end
    end
  end

  # DELETE /actors/1
  # DELETE /actors/1.xml
  def destroy
    @actor = Actor.find(params[:id])
    @actor.destroy

    respond_to do |format|
      format.html { redirect_to actors_url }
      format.xml  { head :ok }
    end
  end
end
