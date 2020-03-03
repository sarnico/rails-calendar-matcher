class MatchesController < ApplicationController

  before_action :set_match, only: [:show, :edit, :update, :destroy]


  def index
    @matchs = Match.all
  end

  def show
  end

  def new
    @match = Match.new
  end

  def create
    @match = Match.new(match_params)
    @match.save
    redirect_to matches_path
  end

  def edit
  end

  def update
    @match.update(match_params)
    redirect_to matches_path
  end

  def destroy
    @match.destroy
    redirect_to matches_path
  end

  private

  def match_params
    params.require(:match).permit(:id, :title, :description, :location, :match_date, :min_date, :max_date, :state)
  end

  def set_match
    @match = Match.find(params[:id])
  end


end
