import React from "react";
import { ITask } from "../interfaces";
import {
  Box,
  Checkbox,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface Props {
  task: ITask;
  toggleTask(id: string): void;
}

const TodoItem = ({ task, toggleTask }: Props) => {
  return (
    <Box>
      <ListItem key={task.id} disablePadding>
        <ListItemIcon>
          <Checkbox
            checked={task.completed}
            inputProps={{
              "aria-labelledby": `checkbox-list-label-${task.id}`,
            }}
            onClick={(): void => toggleTask(task.id)}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={task.taskName} />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </Box>
  );
};

export default TodoItem;
