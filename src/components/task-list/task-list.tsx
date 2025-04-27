import {
  useEffect, useState
} from "react";
import {TasksApi} from "../../api/tasks.api";
import {Task} from "../../types";
import {TaskListItem} from "../task-list-item";
import style from './style.module.css';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const tagsEditHandler = (task:Task) => {
    TasksApi.updateTask(task);
  };

  useEffect(() => {
    TasksApi.getAllTasks({}).then(
      (result:Task[]) => {
        setTasks(result);
      }
    )
      .catch((e) => console.error(e));
    
  }, []);
  
  return (
    <ul className={style.taskList}>
      {tasks.map((task) => (
        <li className={style.listItem} key={task.id}>
          <TaskListItem task={task} tagsEditHandler={tagsEditHandler} />
        </li>
      ))}
    </ul>
  );
}
