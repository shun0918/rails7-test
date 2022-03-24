import { Button, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Status } from '../../types/models/Status';
import { Task } from '../../types/models/Task';
import TaskCard from './TaskCard';

type Props = {
  status: Status;
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onCreateTask: (task: Task) => void;
  getDummyId: () => number;
};

const _AddButton = styled(Button)({
  marginTop: 16,
  variant: 'text',
  width: '100%',
  borderStyle: 'dashed',
  borderWidth: '1px',
});

const TaskColumn: React.FC<Props> = ({ status, tasks, onCreateTask, onUpdateTask, getDummyId }) => {
  const [newTask, setNewTask] = useState<Task>();
  const onNewTask = () => {
    setNewTask({
      id: getDummyId(),
      title: 'task',
      user_id: 2,
      status_id: status.id,
    });
  };
  const onCancelCreate = () => {
    setNewTask(undefined);
  };
  const onCancelEdit = (task: Task) => {
    alert('dummy');
  };
  return (
    <div>
      <Typography marginBottom={2}>{status.name}</Typography>
      <Droppable droppableId={String(status.id)}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((_task, index) => (
              <Draggable key={`${status.id}_${_task.id}`} draggableId={`${_task.id}`} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mt-8"
                  >
                    <TaskCard
                      task={_task}
                      onSaveTask={onUpdateTask}
                      onCancel={() => onCancelEdit(_task)}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {newTask ? (
              <TaskCard
                task={newTask}
                editable={true}
                onSaveTask={onCreateTask}
                onCancel={onCancelCreate}
              />
            ) : null}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <_AddButton onClick={onNewTask}>Add new task +</_AddButton>
    </div>
  );
};

export default TaskColumn;
