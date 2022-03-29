import React, { useState } from 'react';
import { Status } from '../../types/models/Status';
import { Task } from '../../types/models/Task';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';

type Props = {
  // tasks: Task[];
  taskMap: Record<number, Task[]>;
  status: Status[];
  onCreateTask: (task: Task) => void;
  onDeleteTask: (task: Task, index: number) => void;
  onReplaceTask: (result: {
    fromStatusId: number;
    toStatusId: number;
    fromIndex: number;
    toIndex: number;
  }) => void;
  onShowTaskDetail: (task: Task) => void;
};

const TaskBoard: React.FC<Props> = ({
  taskMap,
  status,
  onCreateTask,
  onReplaceTask,
  onDeleteTask,
  onShowTaskDetail,
}) => {
  // const [taskMap, setTaskMap] = useState<Record<number, (Task | EditableTask)[]>>({});
  const [dummyId, setDummyId] = useState(0);
  const getDummyId = () => {
    const currentId = dummyId;
    setDummyId(dummyId - 1);
    return currentId;
  };
  const _onCreateTask = (task: Task) => {
    onCreateTask(task);
  };
  const _onUpdateTask = () => {
    alert('dummy! _onupdatetask');
  };
  const _onDeleteTask = (task: Task, index: number) => {
    onDeleteTask(task, index);
  };
  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      (result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index)
    )
      return;
    onReplaceTask({
      fromStatusId: +result.source.droppableId,
      toStatusId: +result.destination.droppableId,
      fromIndex: result.source.index,
      toIndex: result.destination.index,
    });
  };
  return (
    <div className="w-screen">
      <div className="mx-8 p-8 rounded-xl bg-blue-50 flex overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {status.map((s) => (
            <div className="w-64 flex-shrink-0 px-4" key={s.id}>
              <TaskColumn
                getDummyId={getDummyId}
                status={s}
                tasks={taskMap[s.id] || []}
                onCreateTask={_onCreateTask}
                onUpdateTask={_onUpdateTask}
                onDeleteTask={_onDeleteTask}
                onShowTaskDetail={onShowTaskDetail}
              />
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
