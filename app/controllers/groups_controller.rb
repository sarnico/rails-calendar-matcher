class GroupsController < ApplicationController

  def index
    @groups = Group.all
  end

  def show
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    @group.save
  end

  def update
    @group.update(group_params)
    redirect_to groups_path
  end

  def destroy
    @group.destroy
    redirect_to groups_path
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end

  def set_match
    @group = Group.find(params[:id])
  end

end
