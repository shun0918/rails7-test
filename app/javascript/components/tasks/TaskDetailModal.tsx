import { Button, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Task } from '../../types/models/Task';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

type Props = {
  open: boolean;
  task: Task;
  onClose: () => void;
  onUpdateTask: (task: Task) => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ButtonBox = { display: 'flex', justifyContent: 'end', marginTop: 2 };

const TaskDetailModal: React.FC<Props> = ({ open, task, onClose, onUpdateTask }) => {
  const [title, setTitle] = useState(task?.title ?? '');
  const [editable, setEditable] = useState<boolean>(false);
  const onEdit = () => {
    setTitle(task?.title ?? '');
    setEditable(true);
  };
  const onCancelEdit = () => {
    setEditable(false);
  };
  const _onClose = () => {
    closeModal();
  };
  const _onUpdateTask = () => {
    onUpdateTask({
      ...task,
      title,
    });
    setEditable(false);
  };
  const closeModal = () => {
    setEditable(false);
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={_onClose}
      aria-labelledby="modal-task-detail"
      aria-describedby="modal-task-detail"
    >
      <Box sx={style}>
        {editable ? (
          <>
            <TextField
              autoFocus
              autoComplete="off"
              value={title}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />
            <Box sx={ButtonBox}>
              <Button size="small" startIcon={<CancelIcon />} onClick={onCancelEdit}>
                Cancel
              </Button>
              <Button size="small" startIcon={<SaveIcon />} onClick={_onUpdateTask}>
                Save
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {task.title}
            </Typography>
            <Box sx={ButtonBox}>
              <Button size="small" startIcon={<EditIcon />} onClick={onEdit}>
                Edit
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TaskDetailModal;
