import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blueTextColor } from "../constants";

const LineList = ({ lines }) => {
  const navigate = useNavigate();
  const onClickHandler = (line) => {
    navigate(`/details/${line}`);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" align="center" color={blueTextColor} fontWeight="bold">
        Lines
      </Typography>
      {lines && (
        <List>
          {lines.map((lineInfo) => (
            <ListItem
              key={lineInfo.line}
              onClick={() => onClickHandler(lineInfo.line)}
            >
              <ListItemButton>
                <ListItemText>
                  <Typography variant="body1" color={blueTextColor} fontWeight="bold">
                    {lineInfo.line}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default LineList;
