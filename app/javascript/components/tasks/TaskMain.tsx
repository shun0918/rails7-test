import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../libs/api/client';
import { Status } from '../../types/models/Status';
import { Task } from '../../types/models/Task';
import Header from '../global/Header';
import TaskBoard from './TaskBoard';

type TaskRes = {
  get: {
    status: Status[];
    tasks: Task[];
  };
  post: {
    task: Task;
  };
};

const TaskMain: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await apiClient.get<TaskRes['get']>('/tasks/show');
      if (res.data) {
        setTasks(res.data.tasks);
        setStatus(res.data.status);
      }
    };
    fetchTasks();
  }, []);
  const onCreateTask = async (task: Task) => {
    console.log('created');
    const res = await apiClient.post<TaskRes['post']>('/tasks/new', { task: task });
    if (res.data) {
      console.log('created!');
      setTasks([...tasks, res.data.task]);
    }
  };
  return (
    <Box>
      <Header />
      <Box sx={{ paddingY: 8 }}>
        <TaskBoard tasks={tasks} status={status} onCreateTask={onCreateTask} />
      </Box>
    </Box>
  );
};

export default TaskMain;
