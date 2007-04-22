class ConnectionsController < ApplicationController
  # GET /connections
  # GET /connections.xml
  def index
    @connections = Connection.find(:all)

    respond_to do |format|
      format.html # index.rhtml
      format.xml  { render :xml => @connections.to_xml(:except => [:source_id, :target_id]) }
    end
  end

  # GET /connections/1
  # GET /connections/1.xml
  def show
    @connection = Connection.find(params[:id])

    respond_to do |format|
      format.html # show.rhtml
      format.xml  { render :xml => @connection.to_xml(:except => [:source_id, :target_id]) }
    end
  end

  # GET /connections/new
  def new
    @connection = Connection.new
    @connection.creator_id = params[:creator_id]
    @connection.tag = params[:tag]
    @connection.source_id = params[:source_id]
    @connection.target_id = params[:target_id]
  end

  # POST /connections
  # POST /connections.xml
  def create
    @connection = Connection.new(params[:connection])

    respond_to do |format|
      if @connection.save
        flash[:notice] = 'Connection was successfully created.'
        format.html { redirect_to connection_url(@connection) }
        format.xml  { head :created, :location => connection_url(@connection) }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @connection.errors.to_xml }
      end
    end
  end
  
  # GET /connections/1;edit
  def edit
    @connection = Connection.find(params[:id])
  end

  # PUT /connections/1
  # PUT /connections/1.xml
  def update
    @connection = Connection.find(params[:id])

    respond_to do |format|
      if @connection.update_attributes(params[:connection])
        flash[:notice] = 'Connection was successfully updated.'
        format.html { redirect_to connection_url(@connection) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @connection.errors.to_xml }
      end
    end
  end

  # DELETE /connections/1
  # DELETE /connections/1.xml
  def destroy
    @connection = Connection.find(params[:id])
    @connection.destroy

    respond_to do |format|
      format.html { redirect_to connections_url }
      format.xml  { head :ok }
    end
  end
end
