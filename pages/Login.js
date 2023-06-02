import { Alert, Box, Button,CheckBox ,FormControlLabel, FormGroup, IconButton, Input, InputAdornment, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from "axios";
import { useRouter } from "next/router";
import Link from "../muiSrc/Link";


function LogIn() {
  const [passVisibility, setPassVisibility] = useState(false);
  const [Email,setEmail]= useState()
  const [password ,setPassword]= useState()
  const [ErrorMsg ,setErrorMsg]= useState("")
  const [Error ,setError]= useState(false)
  const router = useRouter()
  const onLoginHandle = async()=>{
    if(Email && password){
      setError(false)
      try{
        
        const res = await axios.post('/api/userLogin',{
          Email : Email,
          password : password
        })
        if(res.status){
          router.push('/Landing')
        }
      }catch(error){
          if(error.response && error.response.status === 401 ){
            setErrorMsg("email or password is incorrect!")
            setError(true)
          }
      }

    }else{
      setErrorMsg("Fill All the Field")
      setError(true)
    }
  }


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
      <Alert 
        sx={{display:Error?"stack":"none"}}
        severity="error"
        >
          {ErrorMsg}
        </Alert>
  
        <Input
          disableUnderline
          type="email"
          sx={{ 
            background: "#F3F3F3", 
            padding: "10px 20px",
            borderRadius:"5px" }}
          placeholder="Example@email.com"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <Input
          disableUnderline
          type={passVisibility?"text":"password"}
          sx={{ 
            background: "#F3F3F3", 
            padding: "10px 5px 10px 20px",
            borderRadius:"5px" }}
          placeholder={"Password"}
          onChange={(e)=>{setPassword(e.target.value)}}
          endAdornment={
            <InputAdornment>
              <IconButton onClick={()=>{setPassVisibility(!passVisibility)}}>
                 {passVisibility?
                  <VisibilityOutlinedIcon/>
                :
                <VisibilityOffOutlinedIcon/> }
              </IconButton>
            </InputAdornment>
          }
        />
        
        <Stack direction={"row"}>

        <span style={{flex:1}} />
        <Link href="/" sx={{fontSize:"12px"}}>Forget Password?</Link>
        </Stack>
        <Button variant="contained" sx={{boxShadow:"none",color:"#fff",padding:"10px"}} onClick={onLoginHandle}>Log in</Button>
        <Stack direction={"row"} gap={1}>
        <Typography sx={{color:"#ccc"}}>I have no account,</Typography>
        <Link href="/SignUp" >Sign Up</Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default LogIn;
