import { useEffect, useState } from 'react';
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

const useTaskState = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [taskMap, setTaskMap] = useState<Record<number, Task[]>>();

  const _getTaskMap = (): Record<number, Task[]> => {
    if (!status.length || !tasks.length) return {};

    const map: Record<number, Task[]> = {};
    status.forEach(({ id }) => {
      map[id] = [];
    });
    tasks.forEach((task) => {
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
      setTasks(res.data.tasks);
      setStatus(res.data.status);
      setTaskMap(_getTaskMap());
    }
  };

  const createTask = async (task: Task) => {
    const res = await apiClient.post<TaskRes['post']>('/tasks/new', { task: task });
    if (res.data) {
      console.log('created!');
      setTasks([...tasks, res.data.task]);
    }
  };

  const _updateTask = async (task: Task, index?: number) => {
    const res = await apiClient.patch<TaskRes['patch']>('/tasks/update', { task, index });
    if (res.data) {
      /** @TODO 並び順をデータとして保持すること */
      // setTasks([...tasks.filter((task) => task.id !== res.data?.task.id)])
    }
  };

  const deleteTask = async (task: Task) => {
    const res = await apiClient.delete<TaskRes['delete']>('/tasks/delete', { task });
    if (res.data) {
      const deletedTask = res.data.task;
      setTasks([...tasks.filter((task) => task.id !== deletedTask.id)]);
    }
  };

  const updateTaskMap = (values: { [statusId: number]: Task[] }) => {
    setTaskMap({
      ...taskMap,
      ...values,
    });
  };

  const replaceTask = (result: {
    fromStatusId: number;
    toStatusId: number;
    fromIndex: number;
    toIndex: number;
  }) => {
    if (!taskMap) throw new Error('taskMap is undefined!');
    const fromTasks = taskMap[result.fromStatusId];
    const [target] = fromTasks.splice(result.fromIndex, 1);
    const toTasks =
      result.fromStatusId === result.toStatusId ? fromTasks : taskMap[result.toStatusId];
    toTasks.splice(result.toIndex, 0, target);
    updateTaskMap({
      [result.fromStatusId]: fromTasks,
      [result.toStatusId]: toTasks,
    });
    _updateTask(
      {
        ...target,
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
    updateTaskMap({
      [task.status_id]: newTasks,
    });
    _updateTask(task);
  };

  useEffect(() => {
    _fetchTasks();
  });
  return {
    status,
    taskMap,
    createTask,
    deleteTask,
    replaceTask,
    editTask,
  };
};

export default useTaskState;
