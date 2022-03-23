import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Status } from '../../types/models/Status';
import { Task, EditableTask } from '../../types/models/Task';
import TaskCard from './TaskCard';

type Props = {
  tasks: Task[];
  status: Status[];
  onCreateTask: (task: Task) => void;
};

const TaskBoard: React.FC<Props> = ({ tasks, status, onCreateTask }) => {
  const [taskMap, setTaskMap] = useState<Record<number, (Task | EditableTask)[]>>({});
  const [dummyId, setDummyId] = useState(0);
  const getDummyId = () => {
    const currentId = dummyId;
    setDummyId(dummyId - 1);
    return currentId;
  };
  const addTask = (statusId: number) => {
    console.log('hogehoge');
    setTaskMap({
      ...taskMap,
      [statusId]: [
        ...taskMap[statusId],
        {
          id: getDummyId(),
          title: 'task',
          user_id: 2,
          status_id: statusId,
          editable: true,
        },
      ],
    });
  };
  const onSaveTask = (task: Task) => {
    const newTasks = [...taskMap[task.status_id].slice(0, -1), task];
    setTaskMap({
      ...taskMap,
      [task.status_id]: newTasks,
    });
    onCreateTask(task);
  };
  useEffect(() => {
    const getTaskMap = (): Record<number, Task[]> => {
      if (!status.length || !tasks.length) return {};
      const map: Record<number, Task[]> = {};
      status.forEach(({ id }) => {
        map[id] = [];
      });
      console.log(status);
      console.log(map);
      tasks.forEach((task) => {
        if (!map[task.status_id])
          throw new Error(
            `'Invalid status object exists. statusId: '${task.status_id} val: ${
              map[task.status_id]
            }`,
          );
        map[task.status_id].push(task);
      });
      return map;
    };
    setTaskMap(getTaskMap());
  }, [tasks, status]);
  return (
    <div className="w-screen">
      <div className="mx-8 p-8 rounded-xl bg-blue-50 flex overflow-x-auto">
        {status.map((s) => (
          // col
          <div className="w-64 flex-shrink-0 px-4" key={s.id}>
            <Typography marginBottom={2}>{s.name}</Typography>
            <div className="grid gap-y-8">
              {taskMap[s.id]
                ? taskMap[s.id].map((_task) => (
                    <TaskCard key={`${s.id}_${_task.id}`} task={_task} onSaveTask={onSaveTask} />
                  ))
                : null}
              <Button onClick={() => addTask(s.id)} variant="outlined" fullWidth>
                Add new task +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
