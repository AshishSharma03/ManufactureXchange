import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Alert, Box, Button, Input, InputAdornment, Snackbar, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import axios from 'axios'
import { AttachMoney } from '@mui/icons-material';
const DataBox = ({lebel,value,direction="row"}) =>{
  return(
    <Stack direction={direction} gap={1}>
        <Typography sx={{fontSize:"15px",fontWeight:"700",color:"#C8C8C8"}}>{lebel}</Typography>
        <Typography sx={{fontSize:"15px",fontWeight:"700",display:direction === "row"?"block":"none",color:"#C8C8C8"}}>{":"}</Typography>
        <Typography sx={{fontSize:"15px",textTransform:"uppercase",fontWeight:"700"}}>{value}</Typography>
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
  // console.log(OrderDetail)



  useEffect(()=>{
      if(OrderDetail){
        setCost(OrderDetail.cost)
        setUpdatecostOn(OrderDetail.updatedAt)
      }
  },[OrderDetail])

  function isDecimal(value) {
    const decimalRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
    return decimalRegex.test(value);
  }

  const onUpdateCost = async() =>{
    if(isDecimal(costChnage)){
      setError(false)
      setCost(costChnage)
      const OrderID = OrderDetail?._id
      console.log(OrderID)
      try{
        
        const res = await axios.put(`/api/UpdateOrderByID?id=${OrderID}`,{
          cost
        });
        const OrderUpdate = res.data
        setUpdatecostOn(OrderUpdate.updatedAt)
        if(res.status === 200){
          setUpdate(true)
        }
        
      }catch(error){
        console.log(error)
      }
      
    }else{
        setErrorMsg("not valid input!")
        setError(true)
      }

  }
console.log(OrderDetail)
  return (
    <Box sx={{background:"",minHeight:"80vh",padding:"10px",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <Stack gap={2} sx={{padding:"10px"}}>
      <DataBox lebel={"Id"} value={OrderDetail?.OrderID} />
      <DataBox lebel={"To"} value={OrderDetail?.To} />
      <DataBox lebel={"From"} value={OrderDetail?.From} />
      <DataBox lebel={"Quantity"} value={OrderDetail?.Quantity} />
      <DataBox lebel={"Address"} value={OrderDetail?.Address} direction={"column"} />
      <DataBox lebel={"Menufecture"} value={Menufecture?Menufecture:""} />
      <DataBox lebel={"Transporter"} value={Transporter?Transporter:""} />
      <DataBox lebel={"Created date"} value={OrderDetail?.createdAt} />
      <DataBox lebel={" cost Update on"} value={updatecostOn} />
      <DataBox lebel={"Transport Cost"} value={cost+" "+"Rs/-"} />
      {/* <DataBox lebel={"Recived"} value={"1w12"} /> */}
      </Stack>
      <Snackbar sx={{position:"absolute",width:"fit-content"}}  open={Update} autoHideDuration={3000} onClose={()=>{setUpdate(false)}} >
      <Alert sx={{fontSize:"15px",fontWeight:700,color:"#2A9233"}} onClose={()=>{setUpdate(false)}}>
        Cost Update to {cost}{" "}Rs/-
      </Alert>
      </Snackbar>
      <Box sx={{display:userType === "Menufecture" ?"none":"flex",flexDirection:"column",gap:1}}>
      <Alert 
        sx={{display:Error?"stack":"none"}}
        severity="error"
        >
          {ErrorMsg}
        </Alert>
  
          <Input 

            value={costChnage}
            onChange={(e)=>{setCostChnage(e.target.value)}}
            endAdornment={
              <InputAdornment position="end">
                <AttachMoney />
              </InputAdornment>
            }
          />
          <Button onClick={onUpdateCost}>Update Cost </Button>
      </Box>
    </Box>
  )
}

export default ShowOrder