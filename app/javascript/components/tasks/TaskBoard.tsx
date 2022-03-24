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
  const onCancelCreate = (task: Task) => {
    setTaskMap({
      ...taskMap,
      [task.status_id]: [...taskMap[task.status_id].slice(0, -1)],
    });
  };
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // const items = Array.from()
    console.log(result);
    console.log(provided);
    if (
      !result.destination ||
      (result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index)
    )
      return;
    const sourceItems = taskMap[Number(result.source.droppableId)];
    console.log('sourceItems', sourceItems);
    const [reorderedItem] = sourceItems.splice(result.source.index, 1);
    const destinationItems =
      result.source.droppableId === result.destination.droppableId
        ? sourceItems
        : taskMap[Number(result.destination.droppableId)];
    destinationItems.splice(result.destination.index, 0, reorderedItem);

    let newTaskMap = {
      ...taskMap,
      [result.destination.droppableId]: destinationItems,
    };
    if (result.source.droppableId !== result.destination.droppableId) {
      newTaskMap = {
        ...newTaskMap,
        [result.source.droppableId]: sourceItems,
      };
    }
    setTaskMap(newTaskMap);
  };
  useEffect(() => {
    const getTaskMap = (): Record<number, Task[]> => {
      if (!status.length || !tasks.length) return {};
      const map: Record<number, Task[]> = {};
      status.forEach(({ id }) => {
        if (id) map[id] = [];
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
        <DragDropContext onDragEnd={onDragEnd}>
          {status.map((s) => (
            // col
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
              <Button onClick={() => addTask(s.id)} variant="outlined" fullWidth>
                Add new task +
              </Button>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
