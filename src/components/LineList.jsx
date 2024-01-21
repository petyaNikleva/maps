import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LineList = ({ lines }) => {
  const navigate = useNavigate();
  const onClickHandler = (line) => {
    navigate(`/details/${line}`);
  };
  return (
    <div>
      <Typography variant="h6" align="center" color="#1976d2" fontWeight="bold">
        All Lines
      </Typography>
      {lines && (
        <List>
          {lines.map((lineInfo, index) => (
            <ListItem
              key={lineInfo.line}
              onClick={() => onClickHandler(lineInfo.line)}
            >
              <ListItemButton>
                <ListItemText>
                  <Typography
                    variant="body1"
                    style={{ color: "#1976d2", fontWeight: "bold" }}
                  >
                    {lineInfo.line}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default LineList;
