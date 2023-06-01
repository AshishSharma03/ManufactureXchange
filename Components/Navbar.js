import React from 'react'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Input,
    ListItem,
    MenuItem,
    Select,
    Stack,
    TextField,
    Toolbar,
    Typography,
  } from "@mui/material";
function Navbar() {
  return (
    <AppBar
    position="static"
    sx={{ boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)", background: "#fff" }}
    >
    <Toolbar sx={{ display: "flex", gap: "10px" }}>
    <Typography sx={{textTransform:"uppercase",fontWeight:700,fontSize:"20px"}}>Cargo</Typography>
      <span style={{ flex: 1 }} />

      <Avatar />
    </Toolbar>
  </AppBar>
  )
}

export default Navbar