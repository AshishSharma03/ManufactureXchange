import { AppBar, Avatar, Toolbar } from '@mui/material'
import React from 'react'
// import { DataGrid } from '@mui/x-data-grid';
function Landing() {
  return (
    <>
        <AppBar sx={{boxShadow:"0px 0px 0px 0px rgba(0,0,0,0)",background:"#fff"}}>
          <Toolbar>
          <span style={{flex:1}}/>
            <Avatar/>
          </Toolbar>
        </AppBar>

    
    </>
  )
}

export default Landing