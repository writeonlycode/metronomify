# frozen_string_literal: true

# Process the requests related to CRUD time entries.
class TimeEntriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_time_entry, only: %i[show update destroy]

  # GET /time_entries
  # GET /time_entries.json
  def index
    @time_entries = current_user.time_entries.all.order(started_at: :desc)
  end

  # GET /time_entries/1
  # GET /time_entries/1.json
  def show
  end

  # POST /time_entries
  # POST /time_entries.json
  def create
    @time_entry = current_user.time_entries.new(time_entry_params)

    if @time_entry.save
      render :show, status: :created, location: @time_entry
    else
      render json: @time_entry.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /time_entries/1
  # PATCH/PUT /time_entries/1.json
  def update
    if @time_entry.update(time_entry_params)
      render :show, status: :ok, location: @time_entry
    else
      render json: @time_entry.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /time_entries/1
  # DELETE /time_entries/1.json
  def destroy
    @time_entry.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_time_entry
    @time_entry = current_user.time_entries.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def time_entry_params
    params.require(:time_entry).permit(:description, :started_at, :ended_at, :lasted_for)
  end
end
