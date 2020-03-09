class MatchesController < ApplicationController

  before_action :set_match, only: [:show, :edit, :update, :destroy]


  def index
    @matches = Match.all
    @events_owner = current_user.matches
    @events_attendee = @matches.select { |m| m.attendees.include?(current_user) }
    @my_events = @events_owner + @events_attendee

  end

  def show

    @results = FindMatch.date(@match.id, @match.owner_id, @match.user_ids, @match.min_time, @match.max_time, @match.max_date, @match.min_date = Date.today)

  end

  def new
    @match = Match.new
    group = Group.find_by_id(params['group_id'])
    @group_user_ids = group.present? ? group.users.map(&:id) : []
  end

  def create

    # 1. verifier s'il faut creer un groupe
    if group_params[:create_group]
      @group = Group.new
      @group.name = group_params[:group_name]
      @group.creater_id = current_user.id
      @group.user_ids = match_params[:user_ids]
      @group.save
    end

    # 2. creer le match
    @match = Match.new(match_params)
    @match.owner_id = current_user.id
     if @match.save
      redirect_to match_path(@match)
    else
      render :new
    end
  end

  def edit
  end

  def update
    @match.update(match_params)
    redirect_to matches_path
  end

  def destroy

  end

  private

  def match_params
    params.require(:match).permit(:id, :title, :description, :location, :match_date, :min_date, :max_date, :min_time, :max_time, :state, :owner_id, :user_ids => [])
  end

  def group_params
    params.permit(:group_name, :create_group)
  end


  def set_match
    @match = Match.find(params[:id])
  end

end
