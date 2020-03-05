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
  end

  def create
    @match = Match.new(match_params)
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

  def set_match
    @match = Match.find(params[:id])
  end


end
