class GroupsController < ApplicationController

before_action :set_group, only: [:show, :edit, :update, :destroy]

  def index
    @groups = Group.all
    @groups_creater = Group.where(creater_id: current_user.id)
    @groups_member = @groups.select { |g| g.members.include?(current_user) }

    @my_groups = @groups_creater + @groups_member
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

  def set_group
    @group = Group.find(params[:id])
  end

end
