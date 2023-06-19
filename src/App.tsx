import React, { ChangeEvent, FC, useState } from "react";
import { ITask } from "./interfaces";
import "./App.css";
import {
  Box,
  Checkbox,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { nanoid } from "nanoid";

const theme = createTheme();

const App: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [newTask, setNewTask] = useState<string>("");

  const newTaskOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(event.target.value);
  };

  const newTaskOnKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === "Enter") {
      newTaskOnSubmit();
    }
  };

  const newTaskOnSubmit = (): void => {
    const task: ITask = {
      id: nanoid(),
      taskName: newTask,
      completed: false,
      deadline: 0,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: string): void => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  let completedCount : number = 0;
  tasks.forEach((task) => {
    if (task.completed) completedCount++;
  })

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ ml: 2 }} variant="h4">
            Todos
          </Typography>
          <Typography sx={{ ml: 2, mt: 1 }} variant="body1">
            {completedCount} Completed
          </Typography>
          <List sx={{ width: "100%", bgcolor: "background.paper", mt: 2 }}>
            {tasks.map((task: ITask) => (
              <TodoItem key={task.id} task={task} toggleTask={toggleTask} />
            ))}
            <ListItem key="new-task" disablePadding>
              <ListItemIcon>
                <Checkbox
                  disabled
                  inputProps={{ "aria-labelledby": `checkbox-list-label-new` }}
                />
              </ListItemIcon>
              <TextField
                sx={{ width: "100%" }}
                id="new-task-text-field"
                variant="standard"
                value={newTask}
                onChange={newTaskOnChange}
                onKeyDown={newTaskOnKeyDown}
                onSubmit={newTaskOnSubmit}
              />
            </ListItem>
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
