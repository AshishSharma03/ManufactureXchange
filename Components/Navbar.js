import React from 'react'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Input,
    ListItem,
    MenuItem,
    Select,
    Stack,
    TextField,
    Toolbar,
    Typography,
  } from "@mui/material";
  import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Users/User';
import { useRouter } from 'next/router';
function Navbar({userName,lastName}) {
    const dispatch = useDispatch()
    const router = useRouter()
    const onLogoutHandle = ()=>{
        dispatch(logout())
        router.push('/')

    }


  return (
    <AppBar
    position="static"
    sx={{ boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)", background: "#fff" }}
    >
    <Toolbar sx={{ display: "flex", gap: "10px" }}>
    <Typography sx={{textTransform:"uppercase",fontWeight:700,fontSize:"20px"}}>Cargo</Typography>
      <span style={{ flex: 1 }} />
      <Stack direction={"row"} alignItems={"center"} gap={1} sx={{borderRadius:"30px",padding:"5px 9px 5px 5px",color:"#FF9B00",background:"#FFEEBA"}}>
      <Avatar 
      
      sx={{background:"#FF9B00",boxShadow:"0px 0px 100px 20px rgba(184, 112, 1 ,0.1)"}}
      >
        {userName.slice(0,1)}
        {lastName.slice(0,1)}
      </Avatar>
      <Typography sx={{fontSize:"15px",fontWeight:"700",fontStyle:"italic"}}>{userName+" "+lastName}</Typography>
     
        </Stack>
        <IconButton sx={{boxShadow:"0px 0px 15px 10px rgba(0,0,0,0.1)"}} onClick={onLogoutHandle}>
          <LogoutRoundedIcon/>
        </IconButton>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar