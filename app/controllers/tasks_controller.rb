class TasksController < ApplicationController
  def index
  end

  def show
    @tasks = @current_user.tasks.all.order(:pos)
    @status = Status.all
    render json: { tasks: @tasks, status: @status }
  end

  def create
    max_pos = Task.where(user_id: @current_user.id).maximum(:pos) || 0
    @task = Task.create(task_params pos: max_pos += 1)
    render json: { task: @task }
  end

  def update
    @task = Task.find(params[:task][:id])
    if params[:index] == 0
      pos = (Task.where(user_id: @current_user.id, status_id: params[:task][:status_id]).minimum(:pos) || 1) / 2
    else
      @tasks = Task.where(user_id: @current_user.id, status_id: params[:task][:status_id])
          .where.not(id: @task.id)
          .order(:pos)
          .limit(2)
          .offset(params[:index] - 1)
      pos = @tasks.size < 2 ? @tasks.last[:pos] + 1 : (@tasks[0][:pos] + @tasks[1][:pos]) / 2
    end
    @task.update(task_params(pos: pos))
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
    def task_params(pos:)
      params.require(:task).permit(:title, :status_id).merge(user_id: @current_user.id, pos: pos)
    end
end
