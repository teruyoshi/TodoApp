import { ListItemText } from "@mui/material";
import React from "react";

function TodoTitle ({children} : {children: React.ReactNode}) {
  return (
    <ListItemText>{children}</ListItemText>
  )
}

export default TodoTitle