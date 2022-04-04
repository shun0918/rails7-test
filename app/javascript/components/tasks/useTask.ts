import { useEffect, useRef, useState } from 'react';
import BoardChannel from '../../channels/board_channel';
import { apiClient } from '../../libs/api/client';
import { Status } from '../../types/models/Status';
import { Task } from '../../types/models/Task';

type TaskRes = {
  get: {
    status: Status[];
    tasks: Task[];
  };
  post: {
    task: Task;
  };
  patch: {
    task: Task;
  };
  delete: {
    task: Task;
  };
};

const useTask = () => {
  const tasks = useRef<Task[]>([]);
  const status = useRef<Status[]>([]);
  const [taskMap, setTaskMap] = useState<Record<number, Task[]>>({});
  // const channel = useMemo(() => createBoardChannel.({ received: _received }), [taskMap]);

  const _getTaskMap = (): Record<number, Task[]> => {
    if (!status.current.length) return {};

    const map: Record<number, Task[]> = {};
    status.current.forEach(({ id }) => {
      map[id] = [];
    });
    tasks.current.forEach((task) => {
      if (!map[task.status_id])
        throw new Error(
          `'Invalid status object exists. statusId: '${task.status_id} val: ${map[task.status_id]}`,
        );
      map[task.status_id].push(task);
    });
    return map;
  };

  const _fetchTasks = async () => {
    const res = await apiClient.get<TaskRes['get']>('/tasks/show');
    if (res.data) {
      tasks.current = res.data.tasks;
      status.current = res.data.status;
      setTaskMap(_getTaskMap());
    }
  };

  const _updateTask = async (task: Task, index?: number) => {
    const res = await apiClient.patch<TaskRes['patch']>('/tasks/update', { task, index });
    if (res.data) {
    }
  };

  const _updateTaskMap = (values: { [statusId: number]: Task[] }) => {
    setTaskMap({
      ...taskMap,
      ...values,
    });
  };

  const createTask = async (task: Task) => {
    const res = await apiClient.post<TaskRes['post']>('/tasks/new', { task: task });
    if (res.data) {
    }
  };

  const deleteTask = async (task: Task, index: number) => {
    apiClient.delete<TaskRes['delete']>('/tasks/delete', { task });
  };

  const replaceTask = (result: {
    fromStatusId: number;
    toStatusId: number;
    fromIndex: number;
    toIndex: number;
  }) => {
    if (!taskMap) throw new Error('taskMap is undefined!');
    _updateTask(
      {
        ...taskMap[result.fromStatusId][result.fromIndex],
        status_id: result.toStatusId,
      },
      result.toIndex,
    );
  };

  const editTask = (task: Task) => {
    if (!taskMap) throw new Error('taskMap is undefined!');
    const newTasks = taskMap[task.status_id];
    newTasks.splice(
      newTasks.findIndex(({ id }) => id === task.id),
      1,
      task,
    );
    _updateTaskMap({
      [task.status_id]: newTasks,
    });
    _updateTask(task);
  };

  const _received = ({
    task,
    destroyed,
    index,
  }: {
    task: Task;
    destroyed?: boolean;
    index?: number;
  }) => {
    // tasks内ターゲット特定
    let oldTaskIndex = tasks.current.findIndex(({ id }) => id === task.id);

    // ターゲットが存在しない -> CREATE
    if (oldTaskIndex === -1) {
      const newTasks = [...(taskMap[task.status_id] ?? []), task];
      _updateTaskMap({ [task.status_id]: newTasks });
      return;
    }

    // DELETE
    const [oldTask] = tasks.current.splice(oldTaskIndex, 1); // しれっとtasksから削除
    const fromTasks = [...taskMap[oldTask.status_id]];
    oldTaskIndex = fromTasks.findIndex(({ id }) => id === oldTask.id);
    fromTasks.splice(oldTaskIndex, 1);

    if (destroyed) {
      _updateTaskMap({ [oldTask.status_id]: fromTasks });
      return;
    }

    // UPDATE(DELETE済なのでCREATEのみ)
    const toTasks =
      task.status_id === oldTask.status_id ? [...fromTasks] : taskMap[task.status_id] ?? [];
    toTasks.splice(index ?? oldTaskIndex, 0, task);
    tasks.current.push(task);
    _updateTaskMap({
      [oldTask.status_id]: fromTasks,
      [task.status_id]: toTasks,
    });
  };

  useEffect(() => {
    _fetchTasks();
  }, []);
  useEffect(() => {
    BoardChannel.received = _received;
  }, [taskMap]);

  return {
    status,
    taskMap,
    createTask,
    deleteTask,
    replaceTask,
    editTask,
  };
};

export default useTask;
