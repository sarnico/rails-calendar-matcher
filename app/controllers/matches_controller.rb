# frozen_string_literal: true
class MatchesController < ApplicationController
  before_action :set_match, only: %i[show edit update destroy]


  def index
    @validated = Match.find_by(id: params[:validated_id])
    @my_events = Match.joins(:users).where(owner_id: current_user.id).or(
      Match.joins(:users).where('users.id': current_user.id)
    ).where.not(match_date: nil).order(match_date: :desc).distinct
  end

  def show
    @results = FindMatch.date(@match.id, @match.owner_id, @match.user_ids, @match.min_time, @match.max_time, @match.max_date, @match.min_date)
  end

  def new
    @match = Match.new

    group = Group.find_by_id(params['group_id'])
    @group_user_ids = group.present? ? group.users.where.not(id: current_user.id).ids : []

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

    # 2. creer le match sans date finale !!!
    @match = Match.new(match_params)

    # set min_time and max_time with the correct time zone of the user
    a = params[:match]

    min_time_TZ = DateTime.new(Time.now.strftime("%Y").to_i,Time.now.strftime("%m").to_i,Time.now.strftime("%d").to_i,a["min_timeh"].to_i,a["min_timem"].to_i, 0 ,Time.now.zone)
    max_time_TZ = DateTime.new(Time.now.strftime("%Y").to_i,Time.now.strftime("%m").to_i,Time.now.strftime("%d").to_i,a["max_timeh"].to_i,a["max_timem"].to_i, 0 ,Time.now.zone)
    @match.min_time = min_time_TZ
    @match.max_time = max_time_TZ

    @match.owner_id = current_user.id
    if @match.save
      redirect_to match_path(@match)
    else
      render :new
    end
  end

  def edit
     @group_user_ids =[]
  end

  def update
    if @match.update(match_params)
      if request.env["HTTP_REFERER"]=="http://localhost:3000/matches/#{@match.id}/edit" || request.env["HTTP_REFERER"]=="www.calendarmatcher.com/matches/#{@match.id}/edit"
        SendInvitation.update_google_event(@match, current_user)
        redirect_to matches_path
      else
        respond_to do |format|
          format.json { render json: @match.as_json }
        end
      end
    end
  end

  def destroy
    @match.destroy
    redirect_to matches_path
  end

  private

  def match_params
    returned_params = params
                      .require(:match).permit(:id, :title, :description, :location, :match_date, :min_date, :max_date, :min_timeh, :min_timem, :max_timeh, :max_timem, :state, :owner_id)
    if params[:match][:user_ids].present?
      returned_params = returned_params.merge(user_ids: JSON.parse(params[:match][:user_ids]))
    end
    returned_params
  end

  def group_params
    params.permit(:group_name, :create_group)
  end

  def set_match
    @match = Match.find(params[:id])
  end

end
