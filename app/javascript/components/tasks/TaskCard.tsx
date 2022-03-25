// import styled from '@emotion/styled';
import { Button, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Task } from '../../types/models/Task';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TaskCardInnerMenu from './TaskCardInnerMenu';
type Props = {
  task: Task;
  editable?: boolean;
  onSaveTask: (val: Task) => void;
  onCancel: () => void;
  onDelete: () => void;
};

const TaskCard: React.FC<Props> = ({ task, editable = false, onSaveTask, onCancel, onDelete }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string>('');
  const taskCardId = useMemo(() => `task_card_menu_${task.id}`, [task]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuElm = useRef<HTMLDivElement>(null);
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
  const onClickMenu = (e: React.MouseEvent) => {
    setIsOpenMenu(true);
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
    <div className="relative rounded-lg p-4 shadow-md bg-white">
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
            <p className="text-red-500 text-xs mt-2 break-words">{error}</p>
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
          <p className="break-words">{task.title}</p>
        )}
      </div>
      <div className="absolute top-2 right-2">
        <div className="relative" ref={menuElm} id={taskCardId}>
          <IconButton onClick={onClickMenu} aria-label="Example">
            <MoreHorizIcon />
          </IconButton>
          {isOpenMenu ? <TaskCardInnerMenu onDelete={onDelete} /> : null}
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
