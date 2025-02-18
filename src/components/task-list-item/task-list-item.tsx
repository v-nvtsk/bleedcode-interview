import {useState} from "react";
import {NavLink} from "react-router";
import {Task} from "../../types";
import {processTags} from "../../utils/process-tags";
import {TagsList} from "../tags-list";
import style from './style.module.css';

type TaskListItemProps = {
  task: Task,
  tagsEditHandler: (task:Task)=>void
};

export const TaskListItem = ({
  task, tagsEditHandler
}:TaskListItemProps) => {
  const {
    id, title, category, description, difficulty, tags
  } = task;
  const [editableTags, setEditableTags] = useState<Task["tags"]>(tags);
  const editTags = (value:string) => {
    const updatedTags = processTags(value);

    setEditableTags(updatedTags);
    task.tags = updatedTags;
    tagsEditHandler(task);
  };

  return (
    <div className="card">
      <div className="card-header d-flex gap-2">
        <NavLink
          className={"h3 flex-grow-1" + " " +
          "link-primary link-offset-2 link-underline" + " " +
          "link-underline-opacity-0 link-underline-opacity-75-hover"}
          to={`/task/${id}`}
        >
          {title}
        </NavLink>

        <p className={`${style.category } badge rounded-pill text-bg-info`}>{category}</p>
        <p className={`${style.difficulty } badge rounded-pill text-bg-success`}>{difficulty}</p>
      </div>

      <div className="card-body">
        <p className={style.description}>{description}</p>
      </div>

      <div className="card-footer">

        <div className={style.tags}>
          <TagsList tags={editableTags} editable={true} onEdit={editTags} />
        </div>
      </div>
    </div>
  );
};
