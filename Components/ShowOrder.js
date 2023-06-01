import React from 'react'
import Navbar from './Navbar'
import { Box, Stack, Typography } from '@mui/material'

const DataBox = ({lebel,value,direction="row"}) =>{
  return(
    <Stack direction={direction} gap={1}>
        <Typography sx={{fontSize:"15px",fontWeight:"700",color:"#C8C8C8"}}>{lebel}</Typography>
        <Typography sx={{fontSize:"15px",fontWeight:"700",display:direction === "row"?"block":"none",color:"#C8C8C8"}}>{":"}</Typography>
        <Typography sx={{fontSize:"15px",textTransform:"uppercase",fontWeight:"700"}}>{value}</Typography>
      </Stack>
  )
}

function ShowOrder() {
  return (
    <Box sx={{background:"",minHeight:"80vh",padding:"10px"}}>
      <Stack gap={2} sx={{padding:"10px"}}>
      <DataBox lebel={"Id"} value={"#1w12"} />
      <DataBox lebel={"To"} value={"1w12"} />
      <DataBox lebel={"From"} value={"1w12"} />
      <DataBox lebel={"Quantity"} value={"1w12"} />
      <DataBox lebel={"Address"} value={"1w12"} direction={"column"} />
      <DataBox lebel={"Transporter"} value={"1w12"} />
      <DataBox lebel={"Created date"} value={"1w12"} />
      <DataBox lebel={"Accept by Transporter"} value={"1w12"} />
      <DataBox lebel={"Recived"} value={"1w12"} />
      <DataBox lebel={"Transport Cost"} value={"1w12"} />
      </Stack>
    </Box>
  )
}

export default ShowOrder