import React from 'react';
import { Task } from '../../types/models/Task';

type Props = {
  task: Task;
};

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="rounded-lg p-4 shadow-md bg-white">
      {task.thumbnailUrl ? (
        <div className="mb-4">
          <img
            src={task.thumbnailUrl}
            width="160"
            height="90"
            className="object-cover w-full"
            alt=""
          />
        </div>
      ) : null}
      <div>
        <p>{task.title}</p>
      </div>
    </div>
  );
};
export default TaskCard;
