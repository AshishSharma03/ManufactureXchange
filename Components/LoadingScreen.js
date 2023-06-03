import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

function LoadingScreen() {
  return (
    <Box sx={{minHeight:"100vh",display:"flex",alignItems:'center',justifyContent:"center"}}>
       <Typography sx={{textTransform:"uppercase",fontWeight:700,fontSize:"25px"}}>Carg</Typography>
        <CircularProgress
        size={"19px"}
        thickness={7}
        sx={{color:"#000"}}
        />
    </Box>
  )
}

export default LoadingScreen