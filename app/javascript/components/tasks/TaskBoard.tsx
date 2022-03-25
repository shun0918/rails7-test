import React, { useEffect, useState } from 'react';
import { Status } from '../../types/models/Status';
import { Task, EditableTask } from '../../types/models/Task';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';

type Props = {
  tasks: Task[];
  status: Status[];
  onCreateTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
};

const TaskBoard: React.FC<Props> = ({
  tasks,
  status,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
}) => {
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
    onCreateTask(task);
  };
  const _onUpdateTask = () => {
    alert('dummy! _onupdatetask');
  };
  const _onDeleteTask = (task: Task, index: number) => {
    const newTasks = [...taskMap[task.status_id]];
    newTasks.splice(index, 1);
    updateTasksMap({ [task.status_id]: newTasks });
    onDeleteTask(task);
  };
  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      (result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index)
    )
      return;
    const fromStatusId = Number(result.source.droppableId);
    const toStatusId = Number(result.destination.droppableId);

    // drag元のカラム
    const fromTasks = taskMap[fromStatusId];
    // target: dragされたTask & drag元のカラムから抽出(削除)
    const [target] = fromTasks.splice(result.source.index, 1);
    // drop先のカラム
    const toTasks = fromStatusId === toStatusId ? fromTasks : taskMap[toStatusId];
    // drop先のカラムにdrop
    toTasks.splice(result.destination.index, 0, target);
    // update state
    updateTasksMap({
      [result.source.droppableId]: fromTasks,
      [result.destination.droppableId]: toTasks,
    });
    onUpdateTask({
      ...target,
      status_id: toStatusId,
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
                  onDeleteTask={_onDeleteTask}
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
