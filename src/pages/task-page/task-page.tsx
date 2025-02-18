import {
  useEffect, useState
} from "react";
import {useParams} from "react-router";
import {TasksApi} from "../../api/tasks.api";
import {
  TaskEdit, TaskView
} from "../../components/task";
import {Task} from "../../types";

export const TaskPage = () => {
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');
  const [error, setError] = useState("");
  const [task, setTask] = useState<Task | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const params = useParams<string>();
  const id = Number(params.id);
  const saveTask = (taskData:Task) => {
    TasksApi.updateTask(taskData);
    setTask(taskData);
    toggleViewMode();
  };
  const toggleViewMode = () => setViewMode(viewMode === 'view' ? 'edit' : 'view');

  useEffect(() => {
    if (Number.isNaN(id)){
      setError(`Задача с id="${params.id}" не найдена...`);

      return;
    }
    TasksApi.getTask(id)
      .then((res) => setTask(res));
    TasksApi.getAllCategories().then((res) => setCategories(res));
  }, [params.id]);
  //
  if (error || task === null){
    return <h2>{error}</h2>;
  }

  return (viewMode === 'view' ?
    <TaskView task={task} toggleViewMode={toggleViewMode} />
    :
    <TaskEdit task={task} toggleViewMode={toggleViewMode} saveTask={saveTask} categories={categories} />
  );
};