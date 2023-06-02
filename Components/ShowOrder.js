import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Alert, Box, Button, Input, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import axios from 'axios'

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
  const [Update ,setUpdate]= useState(false)
  // console.log(OrderDetail)

  useEffect(()=>{
      if(OrderDetail){
        setCost(OrderDetail.cost)
      }
  },[OrderDetail])
  const onUpdateCost = async() =>{
    const OrderID = OrderDetail?._id
    console.log(OrderID)
    try{

      const res = await axios.put(`/api/UpdateOrderByID?id=${OrderID}`,{
        cost
      });
      if(res.status === 200){
          setUpdate(true)
      }

    }catch(error){
      console.log(error)
    }


  }

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
      <DataBox lebel={"Transport Cost"} value={cost+" "+"Rs/-"} />
      {/* <DataBox lebel={"Recived"} value={"1w12"} /> */}
      </Stack>
      <Alert sx={{display:Update?"flex":"none",position:"absolute" ,top:"20px"}} onClick={()=>{setUpdate(false)}}>
        Cost Update to {cost}Rs/-
      </Alert>
      <Box sx={{display:userType === "Menufecture" ?"none":"flex"}}>
          
          <Input 
            value={cost}
            onChange={(e)=>{setCost(e.target.value)}}
          />
          <Button onClick={onUpdateCost}>Update Cost </Button>
      </Box>
    </Box>
  )
}

export default ShowOrder