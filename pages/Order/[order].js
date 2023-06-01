import { useRouter } from 'next/router'
import React from 'react'
import ShowOrder from '../../Components/ShowOrder'
import { Box, Breadcrumbs, Button, Grid, Input, Stack, Typography } from '@mui/material'
import Link from '../../muiSrc/LInk'
import Navbar from '../../Components/Navbar'


function Order() {
    const router = useRouter()
    return (
    <Box>
      
      <Navbar/>
      <Box sx={{padding:"0px 20px"}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          back to home
        </Link>
        
        <Typography color="text.primary">Order</Typography>
      </Breadcrumbs>
      <ShowOrder/>   
       
     
      </Box>
    </Box>
  )
}

export default Order