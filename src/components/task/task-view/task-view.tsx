import {Editor} from "@monaco-editor/react";
import {TasksApi} from "../../../api/tasks.api";
import {Task} from "../../../types";
import {processTags} from "../../../utils/process-tags";
import {TagsList} from "../../tags-list";
import style from '../style.module.css';

const isPlaceholder = (obj:Task | null) => obj === null ? "placeholder placeholder-wave bg-secondary" : "";

type TaskViewProps = {
  task: Task,
  toggleViewMode: () => void
};

export const TaskView = ({
  task, toggleViewMode
}:TaskViewProps) => {
  const editTask = () => {
    toggleViewMode();
  };

  return (
    <div className={style.wrapper}>
      <div className={`card p-2 overflow-y-auto ${isPlaceholder(task)}`} aria-hidden={task === null}>
        {task && <>
          <div className="d-flex gap-2 justify-content-between">
            <h2 className={`h2 card-title flex-grow-1`}>{task?.title}</h2>

            <div className="">
              <button role="button" className="btn btn-warning" onClick={editTask}>Изменить</button>
            </div>
          </div>

          <div className="mt-4">
            {task?.description.split('\n').map((line, index) => <p className="card-text" key={index}>{line}</p>)}
          </div>

          <div className="mt-4">
            {task?.description.split('\n').map((line, index) => <p className="card-text" key={index}>{line}</p>)}
          </div>

          <pre className="card-text mt-2">{task?.examples}</pre>
          <p className={`card-text ${task || "visually-hidden"}`} aria-hidden={task === null}>Категория: {task?.category}</p>
          <p className={`card-text ${task || "visually-hidden"}`} aria-hidden={task === null}>Сложность: {task?.difficulty}</p>
          <div className="d-flex gap-1"><TagsList tags={task?.tags} editable={false} /></div>
          
        </>}
      </div>

      <div className={` ${isPlaceholder(task)}`} aria-hidden={task === null}>
        <Editor
          height={'100%'}
          language= "javascript"
          theme="vs-dark"
          value={task.code}
          options={{
            inlineSuggest: {enabled: true},
            fontSize: 16,
            formatOnType: true,
            autoClosingBrackets: 'always',
            minimap: {scale: 10},
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};
