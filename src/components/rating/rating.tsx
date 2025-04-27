export const Rating = ({
  rating = 0, onChange, ratingValues = [0, 1, 2, 3, 4, 5]
}:{
  rating?: number,
  onChange: (value:number)=>void,
  ratingValues?: number[]
}) => {
  
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <select className="form-select" defaultValue={rating} onChange={changeHandler}>
      {ratingValues.map((value) => (
        <option key={value} value={value}>{value}</option>
      ))}
    </select>
  );
};
