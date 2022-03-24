import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { Task } from '../../types/models/Task';

type Props = {
  task: Task;
  editable?: boolean;
  onSaveTask: (val: Task) => void;
  onCancel: () => void;
};

const TaskCard: React.FC<Props> = ({ task, editable = false, onSaveTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string>('');
  const validate = () => {
    if (title.length <= 0) {
      return { ok: false, error: 'Title cannot be empty.' };
    }
    return { ok: true };
  };
  const valid = useMemo(validate, [title]);
  const _onSaveTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (valid.error) {
      setError(valid.error);
      return;
    }
    const newTask = {
      ...task,
      title,
    };
    onSaveTask(newTask);
  };
  const onEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel();
    }
  };
  useEffect(() => {
    if (editable) {
      document.addEventListener('keyup', onEsc, false);
    }
    return () => {
      document.removeEventListener('keyup', onEsc, false);
    };
  }, []);
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
        {editable ? (
          <Box component="form" onSubmit={_onSaveTask}>
            <TextField
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />
            <p className="text-red-500 text-xs mt-2">{error}</p>
            <div className="flex items-center mt-2">
              <Button onClick={onCancel} variant="contained" size="small">
                Cancel
              </Button>
              <Button
                disabled={!valid.ok}
                type="submit"
                sx={{ marginLeft: 1 }}
                variant="contained"
                size="small"
              >
                Save
              </Button>
            </div>
          </Box>
        ) : (
          <p>{task.title}</p>
        )}
      </div>
    </div>
  );
};
export default TaskCard;
