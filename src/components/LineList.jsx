const LineList = ( {lines} ) => {
  return (
  <div> 
    <h2>Lines</h2>
    {lines && (
      <ul>
        {lines.map((lineInfo) => (
          <li key={lineInfo.line}>{lineInfo.line}</li>
        ))}
      </ul>
    )}
  </div>);
};

export default LineList;
