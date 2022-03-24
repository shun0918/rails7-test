import React, { useEffect, useState } from 'react';
import { Status } from '../../types/models/Status';
import { Task, EditableTask } from '../../types/models/Task';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';

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
  const updateTasksMap = (values: { [statusId: number]: Task[] }) => {
    setTaskMap({
      ...taskMap,
      ...values,
    });
  };
  const _onCreateTask = (task: Task) => {
    const newTasks = [...taskMap[task.status_id].slice(0, -1), task];
    updateTasksMap({
      [task.status_id]: newTasks,
    });
    onCreateTask(task);
  };
  const _onUpdateTask = () => {
    alert('dummy! _onupdatetask');
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
          {status.map((s) =>
            taskMap[s.id] ? (
              <div className="w-64 flex-shrink-0 px-4" key={s.id}>
                <TaskColumn
                  getDummyId={getDummyId}
                  status={s}
                  tasks={taskMap[s.id]}
                  onCreateTask={_onCreateTask}
                  onUpdateTask={_onUpdateTask}
                />
              </div>
            ) : null,
          )}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
