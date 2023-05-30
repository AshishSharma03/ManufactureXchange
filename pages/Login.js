import { Box, Button,CheckBox ,FormControlLabel, FormGroup, Input, Stack, Typography } from "@mui/material";
import React from "react";
import Link from "../muiSrc/LInk";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';



function LogIn() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position:"relative"
      }}
    >
        
        
      
      <Stack sx={{width:"300px"}} gap={2}> 
        
      <Typography sx={{fontSize:"20px",fontWeight:"700"}}>Log In </Typography>
      <Stack direction={"column"}  gap={1} sx={{border:'2px solid #43CF8C',padding:"10px",borderRadius:"5px"}}>
      <Typography sx={{fontSize:"12px",fontWeight:"700",color:"#616161"}}>Tap on to change your bussiness </Typography>
      <Stack  direction={"row"}>
            <Button fullWidth sx={{gap:1,fontWeight:"700"}}>
                Manufacturer
                <CheckCircleOutlineRoundedIcon/>
            </Button>
            <Button fullWidth sx={{color:"#ccc",gap:1,fontWeight:"700"}}>
                Transporter 
                </Button>
        </Stack> 
      </Stack>
        <Input
          disableUnderline
          type="email"
          sx={{ 
            background: "#F3F3F3", 
            padding: "10px 20px",
            borderRadius:"5px" }}
          placeholder="Example@email.com"
        />
        <Input
          disableUnderline
          type="password"
          sx={{ 
            background: "#F3F3F3", 
            padding: "10px 20px",
            borderRadius:"5px" }}
          placeholder="Password"
        />
        
        <Stack direction={"row"}>

        <span style={{flex:1}} />
        <Link href="/">Forget Password?</Link>
        </Stack>
        <Button variant="contained" sx={{boxShadow:"none",color:"#fff",padding:"10px"}} >Log in</Button>
        <Stack direction={"row"} gap={1}>
        <Typography sx={{color:"#ccc"}}>I have no account,</Typography>
        <Link href="/SignUp" >Sign Up</Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default LogIn;
