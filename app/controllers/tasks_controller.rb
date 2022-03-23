class TasksController < ApplicationController
  def index
  end

  def show
    @tasks = @current_user.tasks.all
    @status = Status.all
    render json: { tasks: @tasks, status: @status }
  end
end
