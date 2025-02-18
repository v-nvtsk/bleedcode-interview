import {Editor} from '@monaco-editor/react';
import {
  useRef, useState
} from 'react';
import {Task} from '../../../types';
import {processTags} from '../../../utils/process-tags';
import style from '../style.module.css';

type TaskEditProps = {
  task: Task,
  categories: string[],
  toggleViewMode: () => void,
  saveTask: (task:Task) => void
};

export const TaskEdit = ({
  task, categories, toggleViewMode, saveTask
}:TaskEditProps) => {
  const tagsRef = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState<string>(task.code);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const examplesRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const difficultyRef = useRef<HTMLSelectElement>(null);
  const save = () => {

    saveTask({
      id: task.id,
      title: titleRef.current?.value || task.title,
      description: descriptionRef.current?.value || task.description,
      examples: examplesRef.current?.value || task.examples,
      category: categoryRef.current?.value || task.category,
      difficulty: difficultyRef.current?.value || task.difficulty,
      tags: processTags(tagsRef.current?.value || "") || task.tags,
      additional_materials: [],
      code,
    });
  };
  const cancelEdit = () => {
    toggleViewMode();
  };

  return (
    <div className={style.wrapper}>
      <div className="card p-2">
        {task && <>
          <div className="d-flex justify-content-between">

            <div className="d-flex gap-2 ms-auto">
              <button role="button" className="btn btn-danger" onClick={cancelEdit}>Отменить</button>
              <button role="button" className="btn btn-success" onClick={save}>Сохранить</button>
            </div>
          </div>

          <label className="form-label text-info" htmlFor="titleInput">Введите название задачи:</label>
          <input ref={titleRef} id="titleInput" className="form-control" defaultValue={task.title} />
          <label className="form-label text-info" htmlFor="descriptionInput">Введите описание задачи:</label>
          <textarea ref={descriptionRef} id="descriptionInput" className="form-control" defaultValue={task.description} />
          <label className="form-label text-info" htmlFor="examplesInput">Введите примеры входных и выходных данных для задачи:</label>
          <textarea ref={examplesRef} id="examplesInput" className="form-control" defaultValue={task.examples} />
          <label className="form-label text-info" htmlFor="categoryInput">Выберите категорию задачи:</label>

          <select ref={categoryRef} className="form-select" id="categoryInput" defaultValue={task.category}>
            {categories.map((category) => <option value="frontend">{category}</option>)}
          </select>

          <label className="form-label text-info" htmlFor="difficultyInput">Выберите сложность задачи:</label>

          <select ref={difficultyRef} className="form-select" id="difficultyInput" defaultValue={task.difficulty}>
            <option value="easy">Легко</option>
            <option value="medium">Средне</option>
            <option value="hard">Сложно</option>
          </select>

          <label className="form-label text-info" htmlFor="tagsInput">Введите теги разделённые запятыми:</label>
          <input ref={tagsRef} id="tagsInput" className="form-control" type="text" defaultValue={task.tags.join(', ')} />
        </>}
      </div>

      <div>
        <Editor
          height={'100%'}
          language= "javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            inlineSuggest: {enabled: true},
            fontSize: 16,
            formatOnType: true,
            autoClosingBrackets: 'always',
            minimap: {scale: 10},
            readOnly: false,
          }}
        />
      </div>
    </div>
  );
};
