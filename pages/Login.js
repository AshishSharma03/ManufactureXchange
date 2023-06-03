import { Alert, Box, Button,CheckBox ,CircularProgress,FormControlLabel, FormGroup, IconButton, Input, InputAdornment, Snackbar, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from "axios";
import { useRouter } from "next/router";
import Link from "../muiSrc/Link";
import { useDispatch } from "react-redux";
import {  addUser, login } from "../Redux/Users/User";
import LoadingScreen from "../Components/LoadingScreen";


function LogIn() {
  const [passVisibility, setPassVisibility] = useState(false);
  const [Email,setEmail]= useState()
  const [password ,setPassword]= useState()
  const [ErrorMsg ,setErrorMsg]= useState("")
  const [Error ,setError]= useState(false)
  const [LogInLoading , setLogInLoading] = useState(false)
  const [ScreenLoad,setScreenLoad] = useState(true)
  const [LogInSuccess, setLogInSuccess] = React.useState(false);
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(()=>{

    setTimeout(()=>{
      setScreenLoad(false)
    },500)

  },[])




  const onLoginHandle = async()=>{
    if(Email && password){
      setError(false)
      setLogInLoading(true)
      try{
        
        const res = await axios.post('/api/userLogin',{
          Email : Email,
          password : password
        })
       const userdata = res.data

        if(res.status === 200){
          setLogInLoading(false)
          setLogInSuccess(true)
          dispatch(addUser(userdata))
          dispatch(login())
          router.push('/')
        }
      }catch(error){
          if(error.response && error.response.status === 401 ){
            setErrorMsg("email or password is incorrect!")
            setError(true)
            setLogInLoading(false)
          }
      }finally{
        setLogInLoading(false)
      }

    }else{
      setErrorMsg("Fill All the Field")
      setError(true)
    }
  }

  if(ScreenLoad){

    return <LoadingScreen/>

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
        <Button variant="contained" disabled={LogInLoading}  sx={{boxShadow:"none",color:"#fff",padding:"10px",background:LogInLoading?"#D0D0D0":""}} onClick={onLoginHandle}>
         {LogInLoading? 
         <CircularProgress size={"20px"} thickness={5} sx={{color:"#A9A9A9"}} />
         :
         "Log in"
         } 
        </Button>
        <Stack direction={"row"} gap={1}>
        <Typography sx={{color:"#ccc"}}>I have no account,</Typography>
        <Link href="/SignUp" >Sign Up</Link>
        </Stack>
      </Stack>
      <Snackbar sx={{position:"absolute",width:"fit-content"}} anchorOrigin={{ vertical :"top" , horizontal: "center" }} open={LogInSuccess} autoHideDuration={5000}  onClose={()=>{setLogInSuccess(false)}}>
      <Alert onClose={()=>{setLogInSuccess(false)}} severity="success" sx={{ width: '100%' ,fontSize:"15px",fontWeight:700,color:"#2A9233"}}>
        Login successfull
      </Alert>
    </Snackbar>
    </Box>
  );
}

export default LogIn;
