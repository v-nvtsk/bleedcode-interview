import {
  useRef, useState
} from "react";
import {Link} from "react-router";

type TagsListProps =
{
  tags: string[],
  editable?: boolean,
  onEdit?: (value:string)=>void
};

export const TagsList = ({
  tags = [],
  editable = false,
  onEdit = () => {}
}: TagsListProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleEditMode = () => {
    if (editMode){
      onEdit(inputRef.current!.value);
    }
    setEditMode(!editMode);
  };
  const keyboardHandler = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {toggleEditMode();}
  };

  return (
    <div className="d-flex gap-2 w-100">
      {!editMode && tags.map((tag) => <Link to={`/tasks?tag=${tag}`} className="btn btn-sm btn-outline-info align-content-center" key={tag}>{tag}</Link>)}

      {editMode &&
      <input ref={inputRef} type="text" className="form-control flex-grow-1" id="tag" placeholder="Tag" defaultValue={tags.join(', ')} onKeyDown={keyboardHandler} />}

      {editable && <button type="submit" className="btn btn-primary ms-auto" onClick={toggleEditMode}>{editMode ? '🖫' : '🖉'}</button>}
    </div>
  );
};
