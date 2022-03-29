class BoardChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "task_board_#{current_user.id.to_s}"
  end

  def receive(data)
    ActionCable.server.broadcast("task_board_#{current_user.id.to_s}", data);
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
