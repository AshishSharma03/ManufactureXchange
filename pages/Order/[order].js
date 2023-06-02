import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ShowOrder from '../../Components/ShowOrder'
import { Box, Breadcrumbs, Button, Grid, Input, Stack, Typography } from '@mui/material'
import Navbar from '../../Components/Navbar'
import Link from '../../muiSrc/Link'
import Cookies from 'js-cookie'


function Order() {
    const router = useRouter()
    const [thisOrder, setThisOrder] = useState()
    const [userData , setUserData] = useState()
    useEffect(() => {
      const userDataCookie = Cookies.get("userData");
      if (userDataCookie) {
        const userDataValue = JSON.parse(userDataCookie);
        setUserData(userDataValue);
      }
    }, []);
  

    return (
    <Box>
      
      <Navbar userName={userData ? userData.FirstName : ""} lastName={userData ? userData.LastName : ""} />
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