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
import React, { useEffect, useState } from "react";
import DataGrid from "../MuiCustomComponents/DataGrid";
import CreateOrder from "../Components/CreateOrder";
import Navbar from "../Components/Navbar";
import Cookies from "js-cookie";
import { customAlphabet, nanoid } from "nanoid";
import axios from "axios";
import { useRouter } from "next/router";
import LoadingScreen from "../Components/LoadingScreen";


const USERTYPE = {
  MENUFECTURE :"Menufecture",
  TRANSPORTER : "Transporter"
}
function Landing() {
  const [AddOrder, setAddOrder] = useState(false);
  const [data,setData] = useState([])
  const [MenufectureData,setMenufectureData] = useState([])
  const [TransporterData, setTransporterData] = useState([]);
  const [userData , setUserData] = useState()
  const [orderid, setOrderId] = useState()
  const [pinCode, setpinCode] = useState()
  const [State, setState] = useState()
  // const [Country, setCountry] = useState()
  const [ScreenLoad,setScreenLoad] = useState(true)
  const [City, setCity] = useState()
  const [Address, setAddress] = useState()
  const [cargoUsers, setCargoUsers] = useState([]);
  const [Transporter, setTransporter] = useState([]);

  const router = useRouter();

  useEffect(()=>{

    setTimeout(()=>{
      setScreenLoad(false)
    },500)

  },[])


  useEffect(() => {
    const userLoggedIn = Cookies.get('UserAuth') === 'true';
    if (!userLoggedIn) {
      router.push('/');
    } 
  }, []);

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      const userDataValue = JSON.parse(userDataCookie);
      setUserData(userDataValue);
    }
  }, []);

  useEffect(() => {
    async function fetchCargoUsers() {
      try {
        const response = await axios.get('/api/GetAllUser');
        const { data } = response;
        setCargoUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCargoUsers();
  }, []);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/GetAllOrders');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
    }, []);

    useEffect(()=>{
      // console.log(userData._id)
      
      // data.filter(item => console.log(item.ManufectureID === userData._id));
      // data.filter(item => console.log(item.TransporterUser === userData._id));
      const MUfilteredData = data.filter(item => item.ManufectureID === userData._id);
      const TUfilteredData = data.filter(item => item.TransporterUser === userData._id);
      setMenufectureData(MUfilteredData)
      setTransporterData(TUfilteredData)


    },[data])
    
  const onCreateOrder = () =>{
   
    
    const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nanoid = customAlphabet(alphabet, 8 ); 
    const generatedOrderID = nanoid()
    const FilterTransporters = cargoUsers.filter((user) => user.userType === USERTYPE.TRANSPORTER);
    setOrderId("#"+generatedOrderID)
    setAddOrder(true)
    setTransporter(FilterTransporters)
  
    
    if(userData){

      setpinCode(userData.pinCode)
      setState(userData.state)
      setCity(userData.city)
      setAddress(userData.Address)
    }

  }

  if(ScreenLoad){

    return <LoadingScreen/>

  }


  return (
    <>
      <Navbar userName={userData ? userData.FirstName : ""} lastName={userData ? userData.LastName : ""} />

    <Box sx={{display:userData?.userType === USERTYPE.MENUFECTURE?"Block":"none" }}>
      <Box sx={{ padding: "20px", display: AddOrder ? "none" : "block" }}>
        <DataGrid
          data={MenufectureData}
          addOrderButton={
            <Button
              variant="contained"
              onClick={onCreateOrder}
            >
              Create Order
            </Button>
          }
        />
      </Box>
      <Box sx={{ display: !AddOrder ? "none" : "block" }}>
        <Button
          onClick={()=>{setAddOrder(false)}}
          sx={{}}
          >
          Back
        </Button>
        <CreateOrder  MenufectureId= {userData?._id} orderId = {orderid} AutopinCode={pinCode} AutoTransporter={Transporter} AutoAddress={Address} AutoCity={City} AutoState={State}/>
      </Box>
      </Box>
      <Box sx={{display:userData?.userType === USERTYPE.TRANSPORTER?"block":"none" , padding: "20px"}}>
      <DataGrid
          data={TransporterData}
          
        />

      </Box>
    </>
  );
}

export default Landing;
