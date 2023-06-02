import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ShowOrder from '../../Components/ShowOrder'
import { Box, Breadcrumbs, Button, Grid, Input, Stack, Typography } from '@mui/material'
import Navbar from '../../Components/Navbar'
import Link from '../../muiSrc/Link'
import Cookies from 'js-cookie'
import axios from 'axios'
const USERTYPE = {
  MENUFECTURE :"Menufecture",
  TRANSPORTER : "Transporter"
}

function Order() {
    const router = useRouter()
    const [thisOrder, setThisOrder] = useState()
    const [userData , setUserData] = useState()
    const [OrderDetail  , setOrderDetail] = useState()
    const [MenufectureP  , setMenufectureP] = useState()
    const [TransporterP  , setTransporterP] = useState()
 
    useEffect(() => {
      const userDataCookie = Cookies.get("userData");
      if (userDataCookie) {
        const userDataValue = JSON.parse(userDataCookie);
        setUserData(userDataValue);
      }
    }, []);

    useEffect(()=>{
      const OrderId =  router.query.order
      const fetchOrder = async () =>{
        try{

          const res = await axios.get(`/api/GetOrderById?id=${OrderId}`)
          // console.log(res.data)
          setOrderDetail(res.data)
        }catch(error){
          console.error(error)
        }
      }

      if(OrderId){
        fetchOrder()
      }

    },[])
  

    useEffect(()=>{
      const MnID = OrderDetail?.ManufectureID
      const fetcMnDetail =async ( ) =>{
        try{

          const res = await axios.get(`/api/GetUserById?id=${MnID}`)
          setMenufectureP(res.data)
        }catch(error){
          console.error(error)
        }
      
      } 
      if(MnID){
        fetcMnDetail()
      }

    },[OrderDetail])

    useEffect(()=>{
      const TnID = OrderDetail?.TransporterUser
      const fetcMnDetail =async ( ) =>{
        try{

          const res = await axios.get(`/api/GetUserById?id=${TnID}`)
          setTransporterP(res.data)
        }catch(error){
          console.error(error)
        }
      
      } 
      if(TnID){
        fetcMnDetail()
      }

    },[OrderDetail])
  

    
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
      <ShowOrder
            OrderDetail={OrderDetail}
            Menufecture={`${MenufectureP?.FirstName}@${USERTYPE.MENUFECTURE}`}
            Transporter={`${TransporterP?.FirstName}@${USERTYPE.TRANSPORTER}`}
            userType={userData?.userType }
      />   
       
     
      </Box>
    </Box>
  )
}

export default Order