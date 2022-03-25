class TasksController < ApplicationController
  def index
  end

  def show
    @tasks = @current_user.tasks.all
    @status = Status.all
    render json: { tasks: @tasks, status: @status }
  end

  def create
    @task = Task.create(task_params)
    render json: { task: @task }
  end

  def delete
    @task = Task.find(params[:task][:id])
    if @task.user_file_id.presence
      @task.user_file.destroy
    end
    @task.destroy

    render json: { task: @task }
  end

  private
    def task_params
      params.require(:task).permit(:title, :status_id).merge(user_id: @current_user.id)
    end
end
