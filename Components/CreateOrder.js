import React, { useState } from 'react'
import {
  Alert,
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



function CreateOrder() {

  const [To, setTo] = useState();
  const [From, setFrom] = useState();
  const [Quantity, setQuantity] = useState(11);
  const [Transporter, setTransporter] = useState(11);
  const [pinCode, setpinCode] = useState();
  const [State, setState] = useState();
  const [City, setCity] = useState();
  const [Country, setCountry] = useState();
  const [Address, setAddress] = useState();
  const [errorMsg,setErrorMsg] = useState('')
  const [error,setError] = useState(false)


  const onorderaddHandle = () => {




      if(To && From && Quantity && Transporter && pinCode && State && City && Country && Address){
        // setError(false)
      }else{
        setErrorMsg("fill the form")
        setError(true)
      }

  }
  



  return (
    <Box sx={{display:"flex",justifyContent:'center',alignItems:'center',minHeight:"80vh",padding:"0px 20px"}}>
      <Stack sx={{width:"400px"}} gap={2}> 
        <Typography sx={{fontSize:"20px",fontWeight:"700"}}>New Order</Typography>
        <Alert 
        sx={{display:error?"stack":"none"}}
        severity="error"
        >
          {errorMsg}
        </Alert>
        <Stack direction={"column"}  gap={1} sx={{border:'2px solid #43CF8C',padding:"10px",borderRadius:"5px"}}>
        <Typography sx={{fontSize:"12px",fontWeight:"700",color:"#616161"}}>Order id is auto generated :</Typography>
        <Stack  direction={"row"}>
              <Typography  sx={{gap:1,fontWeight:"700"}}>
                   id :  #1212A
                  {/* <CheckCircleOutlineRoundedIcon/> */}
              </Typography>
          </Stack> 
        </Stack>
          <Input
            disableUnderline
            type="text"
            sx={{ 
              background: "#F3F3F3", 
              padding: "10px 20px",
              borderRadius:"5px" }}
            placeholder="To"
            
          />
          <Input
            disableUnderline
            type="text"
            sx={{ 
              background: "#F3F3F3", 
              padding: "10px 20px",
              borderRadius:"5px" }}
            placeholder="From"
          />
          <Stack direction={"row"}  gap={2}>
            <Stack gap={1}>
            <Typography sx={{fontSize:"12px",fontWeight:"700",color:"#616161"}}>Quantity</Typography>
            <Select
            value={1000}
            
            >  
                <MenuItem value={1000}>1000</MenuItem>
            </Select>
            </Stack>
            <Stack gap={1} width={"100%"}>
            <Typography sx={{fontSize:"12px",fontWeight:"700",color:"#616161"}}>Transporter</Typography>
            <Select fullWidth value={"Ravi"} >
              <MenuItem value={"Ravi"}>Ravi</MenuItem>
            </Select>
            </Stack>

          </Stack>
          
            <Typography sx={{fontSize:"12px",fontWeight:"700",color:"#616161"}}>Address</Typography>
           <Stack direction={"row"} gap={1} >
            <Input 
              fullWidth
              placeholder='Pin Code'
              />
            <Input 
            fullWidth
              placeholder='State'
              />
            </Stack>
           <Stack direction={"row"} gap={1} >
            <Input 
              fullWidth
              placeholder='City'
              />
            <Input 
            fullWidth
              placeholder='Country'
              />
            </Stack>
            
            <TextField multiline rows={2} />

          <Button variant="contained" sx={{boxShadow:"none",color:"#fff",padding:"10px"}} onClick={onorderaddHandle} >Add Order</Button>
          <Stack direction={"row"} gap={1}>
          </Stack>
        </Stack>
        </Box>
  )
}

export default CreateOrder