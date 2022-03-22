import { Box } from '@mui/system';
import React from 'react';
import Header from '../global/Header';
import TaskBoard from './TaskBoard';

const TaskMain: React.FC = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ paddingY: 8 }}>
        <TaskBoard />
      </Box>
    </Box>
  );
};

export default TaskMain;
