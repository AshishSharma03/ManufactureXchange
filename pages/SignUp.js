import {
  Box,
  Button,
  CheckBox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  IconButton,
  Input,
  Stack,
  Typography,
  Alert,
  TextField,
  CircularProgress,
  Snackbar,
  Icon,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import axios from "axios";
import Link from "../muiSrc/Link";
import LoadingScreen from "../Components/LoadingScreen";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const USERTYPE = {
  MENUFECTURE :"Menufecture",
  TRANSPORTER : "Transporter"
}

function SignUp() {
  const [FirstName, setFirstName] = useState();

  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ConfirmPass, setConfirmPass] = useState();
  const [errorMsg,setErrorMsg] = useState('')
  const [error,setError] = useState(false)
  const [passVisibility, setPassVisibility] = useState(false);
  const [ConpassVisibility, setConPassVisibility] = useState(false);
  const [AddressInput, setAddressInput] = useState(false);
  const [state,setState ] = useState();
  const [city,setCity ] = useState();
  const [Country,setCountry ] = useState();
  const [pinCode,setPinCode ] = useState();
  const [Address,setAddress ] = useState();
  const [Order,setOrder ] = useState([]);
  const [userType,setUserType ] = useState(USERTYPE.MENUFECTURE);
  const router = useRouter()
  const [ScreenLoad,setScreenLoad] = useState(true)
  const [userID , setUserId] = useState("")
  const [LogInLoading , setLogInLoading] = useState(false)
  const [SignUpSuccess, setSignUpSuccess] = React.useState(false);
  const [chnageColor, setChnageColor] = React.useState(false);

  // const dispatch = useDispatch();

  useEffect(()=>{

    setTimeout(()=>{
      setScreenLoad(false)
    },500)

  },[])


  const SendDataTodb = async () =>{

    const NewUser =  {
      FirstName : FirstName,
      LastName : LastName,
      Email : Email,
      password : password,
      Address : Address,
      state : state, 
      pinCode : pinCode,
      city : city ,
      order: Order,
      userType: userType

    }
    try{

      const res = await axios.post("/api/userRegister",NewUser)
      if(res.status === 200){
        setUserId(res.data.userId)
        return true
      }
    }
    catch(error){
        if(error.response && error.response.status ){
          setErrorMsg("Email is Already exist")
          setError(true)
          setAddressInput(false)
          setLogInLoading(false)
        } 
    }

    return false 

  }




const FinalStepHandle =  async ()=>{
  if(state && city && Country && pinCode && Address){

    setError(false)   
    const userRegisterd = await SendDataTodb()
    if(userRegisterd){
      setSignUpSuccess(true)
      setTimeout(()=>{
        setChnageColor(true)
      },100)
      setLogInLoading(false)
      router.push('/Login')
    }
  }else{
    setErrorMsg("fill all address field")
    setError(true)
    setLogInLoading(false)
  }
}

  
  const SignInHandle = async () =>{
    var Ere = /\S+@\S+\.\S+/;
    let pass = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;
    if(FirstName && LastName && Email && password && ConfirmPass){
             
          if(Email.match(Ere)){
            setError(false)
                if(password.match(pass)){
                  setError(false)
                    if(ConfirmPass.match(password)){
                      setError(false)
                      
                       setAddressInput(true)
                    

                    }else{
                      setErrorMsg("Password not match")
                      setError(true)
                    }

                }else{

                  setErrorMsg("Password  must 8 to 16 characters which contain at least one numeric digit, one uppercase and one lowercase letter and  one Special Symbol.")
                  setError(true)
                }
            
          }else{
            
            setErrorMsg("Email not valid")
            setError(true)
          }

    }else{

      setErrorMsg("Please fill the all field")
      setError(true)
    }
  
  }

  if(ScreenLoad){

    return <LoadingScreen/>

  }

  if(SignUpSuccess){

    return <Box sx={{minHeight:"100vh",display:'flex',alignItems:'center',justifyContent:'center',flexDirection:"column"}}>
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Typography sx={{fontSize:"30px",fontWeight:"700",color:"#484848"}}>Sign Up successfully!</Typography>
      {chnageColor?
      <CheckCircleRoundedIcon sx={{fontSize:"30px",color:"#31E040"}}  />
      :
      <CheckCircleOutlineRoundedIcon sx={{fontSize:"30px",color:"#ccc"}}  />
    }
    </Stack>
      <Typography sx={{fontSize:"20px",color:'#A1A1A1'}}>User registerd as {userType}.</Typography>
    </Box>

  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Stack sx={{ width: "300px" }} gap={2}>
        <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
          Sign Up
        </Typography>
        <Alert 
        sx={{display:error?"stack":"none"}}
        severity="error"
        >
          {errorMsg}
        </Alert>
        <Stack
          direction={"column"}
          gap={1}
          sx={{
            border: "2px solid #43CF8C",
            padding: "10px",
            borderRadius: "5px",
          }}
        > 
          <Typography
            sx={{ fontSize: "12px", fontWeight: "700", color: "#616161" }}
          >
            Tap on to change your bussiness{" "}
          </Typography>
          <Stack direction={"row"}>
            <Button fullWidth onClick={()=>{setUserType(USERTYPE.MENUFECTURE)}} sx={{color: userType === USERTYPE.MENUFECTURE? "": "#ccc" ,gap: 1, fontWeight: "700" }}>
              Manufacturer
              { userType === USERTYPE.MENUFECTURE ? <CheckCircleOutlineRoundedIcon />
              :""
              }
            </Button>
            <Button fullWidth onClick={()=>{setUserType(USERTYPE.TRANSPORTER)}} sx={{ color: userType === USERTYPE.TRANSPORTER? "": "#ccc" , gap: 1, fontWeight: "700" }}>
              Transporter
              { userType === USERTYPE.TRANSPORTER ?<CheckCircleOutlineRoundedIcon />
              :""
              }
            </Button>
          </Stack>

        </Stack>
        <Stack gap={1} sx={{display:AddressInput?"flex":"none"}}>
        <Input
          disableUnderline
          type="text"
          sx={{
            background: "#F3F3F3",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
          placeholder="State" 
          onChange={(e)=>{setState(e.target.value)}}
        />
        <Input
          disableUnderline
          type="text"
          sx={{
            background: "#F3F3F3",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
          placeholder="city" 
          onChange={(e)=>{setCity(e.target.value)}}
        /><Input
        disableUnderline
        type="text"
        sx={{
          background: "#F3F3F3",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
        placeholder="Country" 
        onChange={(e)=>{setCountry(e.target.value)}}
      />
      <Input
        disableUnderline
        type="text"
        sx={{
          background: "#F3F3F3",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
        placeholder="Pin Code" 
        onChange={(e)=>{setPinCode(e.target.value)}}
      />  
       <Input
       multiline
       disableUnderline
       rows={3}
        type="text"
        sx={{
          background: "#F3F3F3",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
        placeholder="Ex : A16, Block A, Sector A.." 
        onChange={(e)=>{setAddress(e.target.value)}}
        />  
        </Stack>
         <Stack gap={1} sx={{display:!AddressInput?"flex":"none"}}>
        <Input
          disableUnderline
          type="text"
          sx={{
            background: "#F3F3F3",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
          placeholder="First Name" 
          onChange={(e)=>{setFirstName(e.target.value)}}
        />
        <Input
          disableUnderline
          type="text"
          sx={{
            background: "#F3F3F3",
            padding: "10px 20px",
            // border:"2px solid red",
            // boxShadow:"0px 0px 5px 5px rgba(255,0,0,0.1)",
            borderRadius: "5px",
          }}
          placeholder="Last Name"
          onChange={(e)=>{setLastName(e.target.value) }}
        />
        <Input
          disableUnderline
          type="email"
          sx={{
            background: "#F3F3F3",
            padding: "10px 20px",
            borderRadius: "5px",
            textTransform:"lowercase"
          }}
          placeholder="Example@email.com"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <Input
          disableUnderline
          type={passVisibility?"text":"password"}
          sx={{
            background: "#F3F3F3",
            padding: "10px 5px 10px 20px",
            borderRadius: "5px",
          }}
          placeholder="Password"
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
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <Input
          disableUnderline
          type={ConpassVisibility?"text":"password"}
          sx={{
            background: "#F3F3F3",
            padding: "10px 5px 10px 20px",
            borderRadius: "5px",
          }}
          placeholder="Confirm Password"
          endAdornment={
            <InputAdornment>
              <IconButton onClick={()=>{setConPassVisibility(!ConpassVisibility)}}>
                 {ConpassVisibility?
                  <VisibilityOutlinedIcon/>
                :
                <VisibilityOffOutlinedIcon/> }
              </IconButton>
            </InputAdornment>
          }
          onChange={(e)=>{setConfirmPass(e.target.value)}}
        />
  </Stack> 
        <Button
          variant="contained"
          sx={{ boxShadow: "none", color: "#fff", padding: "10px" ,display:!AddressInput?"block":"none" }}
          onClick={SignInHandle}
        >
          Sign in step 1
        </Button>
        <Button
          variant="contained"
          disabled={LogInLoading}
          sx={{ boxShadow: "none",background:LogInLoading?"#D0D0D0":"" , color: "#fff", padding: "10px",display:AddressInput?"block":"none"}}
          onClick={FinalStepHandle}
        > 
         {LogInLoading? 
         <CircularProgress size={"20px"} thickness={5} sx={{color:"#A9A9A9"}} />
         :
         "Sign in step 2"
         } 
          
        </Button>
        <Stack direction={"row"} gap={1}>
          <Typography sx={{ color: "#ccc" }}>
            Already have an account,
          </Typography>
          <Link href="/Login">Log in</Link>
        </Stack>
      </Stack>
     
    </Box>
  );
}

export default SignUp;
