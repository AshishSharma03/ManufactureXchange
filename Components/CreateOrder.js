import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import axios from 'axios';
import { useRouter } from 'next/router';

const QuantityValues = [10, 50, 100, 150, 200, 250, 300, 350, 400];

function CreateOrder({ orderId, AutopinCode, AutoState, AutoCity, AutoAddress, AutoTransporter,MenufectureId }) {
  const [To, setTo] = useState("");
  const [From, setFrom] = useState("");
  const [Quantity, setQuantity] = useState(QuantityValues[0]);
  const [pinCode, setpinCode] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("India");
  const [Address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [TransporterUser, setTransporterUser] = useState({});
  const router = useRouter()

  useEffect(() => {
    if (AutopinCode && AutoState && AutoCity && AutoAddress) {
      setCity(AutoCity);
      setAddress(AutoAddress);
      setpinCode(AutopinCode);
      setState(AutoState);
    }
  }, [AutoCity, AutoAddress, AutopinCode, AutoState]);

  const onorderaddHandle = async() => {
    if (
      To &&
      From &&
      Quantity &&
      TransporterUser &&
      pinCode &&
      State &&
      City &&
      Country &&
      Address
    ) {

      const NewOrder =  {
        OrderID : orderId,
        To:  To,
        From:  From,
        Quantity:  Quantity,
        ManufectureID : MenufectureId,
        TransporterUser:  TransporterUser._id,
        pinCode:  pinCode,
        State:  State,
        City:  City,
        Country:  Country,
        Address:  Address,
        cost : 0.0,

      }
      // call here Post req
      console.log(NewOrder)
      setError(false);
      try{
      const res = await axios.post('/api/CreateOrders', NewOrder)
      router.push('/')
        console.log('New order created:', res.data);
        
      }catch(error) {
        console.error('Error creating order:', error);
        setErrorMsg('Error creating order');
        setError(true);
      }

    } else {
      setErrorMsg("fill the form");
      setError(true);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", padding: "0px 20px" }}>
      <Stack sx={{ width: "400px" }} gap={2}>
        <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>New Order</Typography>
        <Alert sx={{ display: error ? "stack" : "none" }} severity="error">
          {errorMsg}
        </Alert>
        <Stack direction="column" gap={1} sx={{ border: "2px solid #43CF8C", padding: "10px", borderRadius: "5px" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: "700", color: "#616161" }}>Order id is auto generated :</Typography>
          <Stack direction="row">
            <Typography sx={{ gap: 1, fontWeight: "700" }}>id : {orderId}</Typography>
          </Stack>
        </Stack>
        <Input
          disableUnderline
          type="text"
          sx={{ background: "#F3F3F3", padding: "10px 20px", borderRadius: "5px" }}
          placeholder="To"
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
        <Input
          disableUnderline
          type="text"
          sx={{ background: "#F3F3F3", padding: "10px 20px", borderRadius: "5px" }}
          placeholder="From"
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        />
        <Stack direction="row" gap={2}>
          <Stack gap={1}>
            <Typography sx={{ fontSize: "12px", fontWeight: "700", color: "#616161" }}>Quantity</Typography>
            <Select value={Quantity} onChange={(e) => setQuantity(e.target.value)}>
              {QuantityValues.map((a, i) => (
                <MenuItem key={i} value={a}>
                  {a}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack gap={1} width="100%">
            <Typography sx={{ fontSize: "12px", fontWeight: "700", color: "#616161" }}>Transporter</Typography>
            <Select fullWidth value={TransporterUser} onChange={(e) => setTransporterUser(e.target.value)}>
              {AutoTransporter.map((a, i) => (
                <MenuItem key={i} value={a}>
                  {`${a.FirstName}@Transporter`}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
        <Typography sx={{ fontSize: "12px", fontWeight: "700", color: "#616161" }}>Address</Typography>
        <Stack direction="row" gap={1}>
          <Input value={pinCode} fullWidth placeholder="Pin Code" onChange={(e) => setpinCode(e.target.value)} />
          <Input value={State} fullWidth placeholder="State" onChange={(e) => setState(e.target.value)} />
        </Stack>
        <Stack direction="row" gap={1}>
          <Input value={City} fullWidth placeholder="City" onChange={(e) => setCity(e.target.value)} />
          <Input fullWidth value={Country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
        </Stack>
        <TextField multiline rows={2} value={Address} onChange={(e) => setAddress(e.target.value)} />

        <Button variant="contained" sx={{ boxShadow: "none", color: "#fff", padding: "10px" }} onClick={onorderaddHandle}>
          Add Order
        </Button>
        <Stack direction="row" gap={1}></Stack>
      </Stack>
    </Box>
  );
}

export default CreateOrder;
