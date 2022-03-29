import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Task } from '../../types/models/Task';
import Header from '../global/Header';
import TaskBoard from './TaskBoard';
import TaskDetailModal from './TaskDetailModal';
import useTask from './useTask';

const TaskMain: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTask, setModalTask] = useState<Task>();
  const { status, taskMap, createTask, deleteTask, replaceTask, editTask } = useTask();
  const onCreateTask = (task: Task) => {
    createTask(task);
  };
  const onDeleteTask = (task: Task, index: number) => {
    deleteTask(task, index);
  };
  const onShowTaskDetail = (task: Task) => {
    setModalTask(task);
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
  };
  const onReplaceTask = (result: {
    fromStatusId: number;
    toStatusId: number;
    fromIndex: number;
    toIndex: number;
  }) => {
    replaceTask(result);
  };
  const onEditTask = (task: Task) => {
    editTask(task);
  };
  return (
    <Box>
      <Header />
      <Box sx={{ paddingY: 8 }}>
        <TaskBoard
          taskMap={taskMap}
          status={status.current}
          onCreateTask={onCreateTask}
          onReplaceTask={onReplaceTask}
          onDeleteTask={onDeleteTask}
          onShowTaskDetail={onShowTaskDetail}
        />
      </Box>
      {modalTask ? (
        <TaskDetailModal
          open={modalOpen}
          onClose={onCloseModal}
          task={modalTask}
          onUpdateTask={onEditTask}
        />
      ) : null}
    </Box>
  );
};

export default TaskMain;
