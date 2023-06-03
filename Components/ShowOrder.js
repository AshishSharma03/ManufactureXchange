import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Alert, Box, Button, CircularProgress, Input, InputAdornment, Snackbar, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import axios from 'axios'
import { AttachMoney } from '@mui/icons-material';
import { format } from 'date-fns'
const DataBox = ({lebel,value,direction="row",color}) =>{
  return(
    <Stack direction={direction} gap={1}>
        <Typography sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700",color:"#C8C8C8"}}>{lebel}</Typography>
        <Typography sx={{fontSize:"15px",fontWeight:"700",display:direction === "row"?"block":"none",color:"#C8C8C8"}}>{":"}</Typography>
        <Typography sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700",color:color}}>{value}</Typography>
      </Stack>
  )
}

function ShowOrder({OrderDetail,Menufecture,Transporter,userType}) {
  const router = useRouter()
  const [cost ,setCost]= useState(0)
  const [costChnage ,setCostChnage]= useState(0)
  const [Update ,setUpdate]= useState(false)
  const [Error ,setError]= useState(false)
  const [ErrorMsg ,setErrorMsg]= useState("")
  const [updatecostOn,setUpdatecostOn]= useState()
  const [createAt,setCreatedAt]= useState()
  const [loading , setLoading] = useState(true)



  useEffect(()=>{
      if(OrderDetail){
        setLoading(false)
        setCost(OrderDetail.cost)
        setUpdatecostOn(OrderDetail.updatedAt)
        setCreatedAt(OrderDetail.updatedAt)
      } 
  },[OrderDetail])

  function isDecimal(value) {
    const decimalRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
    return decimalRegex.test(value);
  }

  const onUpdateCost = async() =>{
    if(isDecimal(costChnage)){
      setCost(costChnage)
      setError(false)

      const OrderID = OrderDetail?._id
      try{
        
        const res = await axios.put(`/api/UpdateOrderByID?id=${OrderID}`,{
          cost : costChnage
        });
        const OrderUpdate = res.data
   
        setUpdatecostOn(OrderUpdate.updatedAt)
        if(res.status === 200){
          setUpdate(true)
        }
        
      }catch(error){
        console.error(error)
      }
      
    }else{
        setErrorMsg("not valid input!")
        setError(true)
      }

  }
  function formatDateWithTime(dateString) {
  
    if(dateString){
      
      const date = new Date(dateString);
      const formattedDate = format(date, 'dd/MM/yyyy');
      const formattedTime =
      format(date, 'dd/MM/yyyy HH:mm') === '12:00'
      ? '12:00 PM'
      : format(date, ' hh:mm a');
      return `${formattedDate} on ${formattedTime}`;
    }

    return ""
  

  }

  if(loading){
    return( <Box sx={{minHeight:"70vh",display:"flex",alignItems:'center',justifyContent:"center",gap:1}}>
    <Typography sx={{textTransform:"uppercase",fontWeight:700,fontSize:"20px"}}>Fetch Order detail</Typography>
     <CircularProgress
     size={"17px"}
     thickness={7}
     sx={{color:"#000"}}
     />
 </Box>)
  }
  return (
    <Box sx={{background:"",minHeight:"80vh",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      
      <Stack gap={2} sx={{padding:{md:"20px",sm:"10px",xs:"10px"},marginTop:"10px",boxShadow:"0px 0px 100px 10px rgba(0,0,0,0.1)",borderRadius:"5px"}}>
      <DataBox lebel={"Id"} value={OrderDetail?.OrderID} />
      <DataBox lebel={"To"} value={OrderDetail?.To} />
      <DataBox lebel={"From"} value={OrderDetail?.From} />
      <DataBox lebel={"Quantity"} value={OrderDetail?.Quantity} />
      <DataBox lebel={"Address"} value={OrderDetail?.Address} direction={"column"} />
      <DataBox lebel={"Menufecture"} value={Menufecture?Menufecture:""} />
      <DataBox lebel={"Transporter"} value={Transporter?Transporter:""} />
      <DataBox lebel={"Created date"} value={formatDateWithTime(createAt)} />
      <DataBox lebel={" cost Update on"} value={formatDateWithTime(updatecostOn)} />
      <DataBox lebel={"Transport Cost"} value={cost+" "+"Rs/-"}  color={"#78E3A1"}/>
    
      </Stack>
      <Snackbar sx={{position:"absolute",width:"fit-content"}}  open={Update} autoHideDuration={3000} onClose={()=>{setUpdate(false)}} >
      <Alert sx={{fontSize:"15px",fontWeight:700,color:"#2A9233"}} onClose={()=>{setUpdate(false)}}>
        Cost Update to {cost}{" "}Rs/-
      </Alert>
      </Snackbar>
      <Box sx={{display:userType === "Menufecture" ?"none":"flex",flexDirection:"column",gap:2,marginTop:"20px",padding:"10px",boxShadow:"0px 10px 10px 0px rgba(0,0,0,0.1)"}}>
      <Alert 
        sx={{display:Error?"stack":"none"}}
        severity="error"
        > 
          {ErrorMsg}
        </Alert>
    
          <Input 
              sx={{ 
                background: "#F3F3F3", 
                padding: "10px 5px 10px 20px",
                borderRadius:"5px" }}
            value={costChnage}
            onChange={(e)=>{setCostChnage(e.target.value)}}
            endAdornment={
              <InputAdornment position="end">
                <AttachMoney />
              </InputAdornment>
            }
          />
          <Button onClick={onUpdateCost} variant="contained" sx={{color:"#fff",boxShadow:"none",fontWeight:"700"}}>Update Cost </Button>
      </Box>
    </Box>
  )
}

export default ShowOrder