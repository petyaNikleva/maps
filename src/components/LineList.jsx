import { useNavigate } from "react-router-dom";

const LineList = ({ lines }) => {

  // TO DO Onclick here and handlePolylineClick can be extract in separate file
  const navigate = useNavigate();
  const onClickHandler = (line) => {
    navigate(`/details/${line}`);
  };
  return (
    <div>
      <h2>Lines</h2>
      {lines && (
        <ul>
          {lines.map((lineInfo) => (
            <li onClick={() => onClickHandler(lineInfo.line)} key={lineInfo.line}>
              {lineInfo.line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LineList;
