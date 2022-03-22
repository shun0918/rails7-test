import { Typography } from '@mui/material';
import React from 'react';
import TaskCard from './TaskCard';

const TaskBoard = () => {
  return (
    <div className="w-screen p-8 rounded-xl bg-blue-50">
      <div className="flex overflow-x-auto">
        {[...Array(7)].map((_, i) => (
          <div className="w-96 flex-shrink-0 px-4" key={i}>
            <Typography marginBottom={2}>Task{i}</Typography>
            <div className="grid gap-y-8">
              <TaskCard />
              <TaskCard />
              <TaskCard />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
