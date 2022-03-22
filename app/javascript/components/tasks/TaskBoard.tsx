import { Typography } from '@mui/material';
import React from 'react';
import { Task } from '../../types/models/Task';
import TaskCard from './TaskCard';

const TaskBoard = () => {
  const TASK: Task = {
    status_id: 1,
    title: 'test task',
    thumbnailUrl: 'https://placehold.jp/160x90.png',
    user_id: 1,
  };
  return (
    <div className="w-screen">
      <div className="mx-8 p-8 rounded-xl bg-blue-50 flex overflow-x-auto">
        {[...Array(7)].map((_, i) => (
          <div className="w-64 flex-shrink-0 px-4" key={i}>
            <Typography marginBottom={2}>Task{i}</Typography>
            <div className="grid gap-y-8">
              {[...Array(3)].map((_, j) => (
                <TaskCard key={`${i}_${j}`} task={TASK} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
