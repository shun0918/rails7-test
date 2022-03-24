import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Status } from '../../types/models/Status';
import { Task, EditableTask } from '../../types/models/Task';
import TaskCard from './TaskCard';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import styled from '@emotion/styled/types/base';

type Props = {
  tasks: Task[];
  status: Status[];
  onCreateTask: (task: Task) => void;
};

const _AddButton = styled(Button)({
  marginTop: 2,
  variant: 'text',
  width: '100%',
  borderStyle: 'dashed',
  borderWidth: '1px',
});

const TaskBoard: React.FC<Props> = ({ tasks, status, onCreateTask }) => {
  const [taskMap, setTaskMap] = useState<Record<number, (Task | EditableTask)[]>>({});
  const [dummyId, setDummyId] = useState(0);
  const getDummyId = () => {
    const currentId = dummyId;
    setDummyId(dummyId - 1);
    return currentId;
  };
  const updateTasksMap = (values: { [statusId: number]: Task[] }) => {
    setTaskMap({
      ...taskMap,
      ...values,
    });
  };
  const addTask = (statusId: number) => {
    const tasks = [
      ...taskMap[statusId],
      {
        id: getDummyId(),
        title: 'task',
        user_id: 2,
        status_id: statusId,
        editable: true,
      },
    ];
    updateTasksMap({
      [statusId]: tasks,
    });
  };
  const onSaveTask = (task: Task) => {
    const newTasks = [...taskMap[task.status_id].slice(0, -1), task];
    updateTasksMap({
      [task.status_id]: newTasks,
    });
    onCreateTask(task);
  };
  const onCancelCreate = (task: Task) => {
    updateTasksMap({
      [task.status_id]: [...taskMap[task.status_id].slice(0, -1)],
    });
  };
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (
      !result.destination ||
      (result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index)
    )
      return;

    // drag元のカラム
    const sourceItems = taskMap[Number(result.source.droppableId)];
    // target: dragされたTask & drag元のカラムから抽出(削除)
    const [target] = sourceItems.splice(result.source.index, 1);
    // drop先のカラム
    const destinationItems =
      result.source.droppableId === result.destination.droppableId
        ? sourceItems
        : taskMap[Number(result.destination.droppableId)];
    // drop先のカラムにdrop
    destinationItems.splice(result.destination.index, 0, target);
    // update state
    updateTasksMap({
      [result.source.droppableId]: sourceItems,
      [result.destination.droppableId]: destinationItems,
    });
  };
  useEffect(() => {
    const getTaskMap = (): Record<number, Task[]> => {
      if (!status.length || !tasks.length) return {};

      const map: Record<number, Task[]> = {};
      status.forEach(({ id }) => {
        map[id] = [];
      });
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
        <DragDropContext onDragEnd={onDragEnd}>
          {status.map((s) => (
            <div className="w-64 flex-shrink-0 px-4" key={s.id}>
              <Typography marginBottom={2}>{s.name}</Typography>
              <Droppable droppableId={String(s.id)}>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {taskMap[s.id]
                      ? taskMap[s.id].map((_task, index) => (
                          <Draggable
                            key={`${s.id}_${_task.id}`}
                            draggableId={`${_task.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mt-8"
                              >
                                <TaskCard
                                  task={_task}
                                  onSaveTask={onSaveTask}
                                  onCancel={() => onCancelCreate(_task)}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))
                      : null}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <_AddButton onClick={() => addTask(s.id)}>Add new task +</_AddButton>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
