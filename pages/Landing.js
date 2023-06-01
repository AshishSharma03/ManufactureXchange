import {
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
import React, { useState } from "react";
import DataGrid from "../MuiCustomComponents/DataGrid";
import CreateOrder from "../Components/CreateOrder";
import Navbar from "../Components/Navbar";



function Landing() {
  const [AddOrder, setAddOrder] = useState(false);
  const [data,setData] = useState([])
  

  return (
    <>
      <Navbar />

      <Box sx={{ padding: "20px", display: AddOrder ? "none" : "block" }}>
        <DataGrid
          data={data}
          addOrderButton={
            <Button
              variant="contained"
              onClick={() => {
                setAddOrder(true);
              }}
            >
              Create Order
            </Button>
          }
        />
      </Box>
      <Box sx={{ display: !AddOrder ? "none" : "block" }}>
        <Button
          onClick={() => {
            setAddOrder(false);
          }}
          sx={{}}
        >
          Back
        </Button>
        <CreateOrder />
      </Box>
    </>
  );
}

export default Landing;
