import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { EditableTask, Task } from '../../types/models/Task';

type Props = {
  task: Task | EditableTask;
  onSaveTask: (val: Task) => void;
};

const TaskCard: React.FC<Props> = ({ task, onSaveTask }) => {
  const [title, setTitle] = useState('');
  const _onSaveTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newTask = {
      ...task,
      title,
    };
    if ('editable' in newTask) delete newTask.editable;
    onSaveTask(newTask);
  };
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
        {'editable' in task && task.editable ? (
          <Box component="form" onSubmit={_onSaveTask}>
            <TextField
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />
            <Button type="submit" sx={{ marginTop: 1 }} variant="contained" size="small">
              Save
            </Button>
          </Box>
        ) : (
          <p>{task.title}</p>
        )}
      </div>
    </div>
  );
};
export default TaskCard;
