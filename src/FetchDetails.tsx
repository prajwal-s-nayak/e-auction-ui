import  { Grid, CardContent , Card, Button , Select , MenuItem , InputLabel ,Typography,Snackbar} from '@material-ui/core';
import React, { useState,useEffect,Suspense } from 'react';
import axios from "axios";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import ErrorBoundary from './ErrorBoundary';
const AuctionDetails = React.lazy(() => import('./AuctionDetails'));


function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

interface AuctionInterface {
    bidAmount: number,
    buyerName: string,
    buyerEmail: string,
    buyerPhoneNo: string
}

type initialAuctionDataType = AuctionInterface[];

const FetchDetails =()=> {

    const[productIds,setProductIds] = useState([]);
    const[error,setError] = useState("");
    const[info,setInfo] = useState("");

    const getProductIds = ()=>{
        axios({
  
            // Endpoint to send files
            url: "http://localhost:8083/seller/product/get/",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },
          }).then((res) => { 
              setProductIds(res.data)
          })
  
          // Catch errors if any
          .catch((err) => { 
            if(err.code == "ERR_NETWORK"){
                console.log(err.code);
                setError("Error in getting available Products. Server not responding");
            }
            else if(err.response){
            setError(err.response.data);
            }else if(err.request){
                setError(err.request);
            }else{
                setError(err.message);
            }
          });
    }; 

    useEffect(()=>{   
        getProductIds();
        },[]);

    const [selectedProductId, setSelectedProductId] = useState(0);
    const [currentProductId, setCurrentProductId] = useState(0);
    const [currentProduct,setCurrentProduct] = useState({
        "id": "",
        "name": "",
        "shortDesc": "",
        "detailedDesc": "",
        "category": "",
        "startingPrice": "",
        "bidEndDate": ""
    });

    const[currentAuction,setCurrentAuction] = useState <initialAuctionDataType>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedProductId(event.target.value as number);
      };

    const handleGetDetails = ()=>{
        if (selectedProductId === 0){
            setError("Please select the product to fetch details.");
        }
        else{
        axios({
  
            // Endpoint to send files
            url: "http://localhost:8083/seller/show-bids/"+selectedProductId,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Methods": "GET",
                // "Access-Control-Allow-Origin": "*",
              },
          }).then((res) => { 
              const {product, auctionData} = res.data;
              if(auctionData.length == 0){
                setInfo("No bid is placed on this product.");
              }
              setCurrentProduct(product);
              setCurrentAuction(auctionData);
          }).then(()=>{
             //refersh child 
            setCurrentProductId(selectedProductId);
          })
  
          // Catch errors if any
          .catch((err) => { 
            if(err.code == "ERR_NETWORK"){
                console.log(err.code);
                setError("Error in getting auction details. Server not responding");
            }
            else if(err.response){
            setError(err.response.data);
            }else if(err.request){
                setError(err.request);
            }else{
                setError(err.message);
            }
          });
        }
    }; 

    return(
        <div>
            {error == "" ? "" :
        (
            <Snackbar open={true} autoHideDuration={6000} onClose={()=>setError("")}>
        <Alert severity="error" onClose={()=>setError("")} >
          {error}
        </Alert>
        </Snackbar>
        )}
         {info == "" ? "" :
        (
            <Snackbar open={true} autoHideDuration={6000} onClose={()=>setInfo("")}>
        <Alert severity="info" onClose={()=>setInfo("")} >
          {info}
        </Alert>
        </Snackbar>
        )}
        
        <Grid container>
            <Grid  item xs={12}>
                <Card>
                    <CardContent>
                    <Grid container>    
                    <Grid  item xs={2}>
                     </Grid>   
                    <Grid  item xs={2}>
                        <br></br>
                    <InputLabel id="demo-simple-select-label">Product:</InputLabel>
                    </Grid>
                    <Grid  item xs={2}>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedProductId}
                        onChange={handleChange}
                    >
                    {productIds.map((e)=>(
                        <MenuItem value={e}>{e}</MenuItem>
                    ))}
                    </Select>
                    </Grid>
                    <Grid  item xs={6}>
                        <Button color="primary" variant="contained" onClick={handleGetDetails} > Get </Button>
                    </Grid>
                    </Grid>
                    <br></br><br></br>
                    <Card>
                    <CardContent>
                    <Grid container>
                    <Grid  item xs={2}>
                    </Grid>
                    <Grid  item xs={2}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">Product Name:</InputLabel>
                    </Typography>
                    </Grid>
                    <Grid  item xs={8}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">{currentProduct.name}</InputLabel>
                    </Typography>
                    </Grid>
                    </Grid>

                    <Grid container>
                    <Grid  item xs={2}>
                    </Grid>
                    <Grid  item xs={2}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">Short Description:</InputLabel>
                    </Typography>
                    </Grid>
                    <Grid  item xs={8}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">{currentProduct.shortDesc}</InputLabel>
                    </Typography>
                    </Grid>
                    </Grid>

                    <Grid container>
                    <Grid  item xs={2}>
                    </Grid>
                    <Grid  item xs={2}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">Detailed Description:</InputLabel>
                    </Typography>
                    </Grid>
                    <Grid  item xs={8}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">{currentProduct.detailedDesc}</InputLabel>
                    </Typography>
                    </Grid>
                    </Grid>

                    <Grid container>
                    <Grid  item xs={2}>
                    </Grid>
                    <Grid  item xs={2}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">Category:</InputLabel>
                    </Typography>
                    </Grid>
                    <Grid  item xs={8}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">{currentProduct.category}</InputLabel>
                    </Typography>
                    </Grid>
                    </Grid>

                    <Grid container>
                    <Grid  item xs={2}>
                    </Grid>
                    <Grid  item xs={2}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">Starting Price:</InputLabel>
                    </Typography>
                    </Grid>
                    <Grid  item xs={8}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">{currentProduct.startingPrice}</InputLabel>
                    </Typography>
                    </Grid>
                    </Grid>

                    <Grid container>
                    <Grid  item xs={2}>
                    </Grid>
                    <Grid  item xs={2}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">Bid End date:</InputLabel>
                    </Typography>
                    </Grid>
                    <Grid  item xs={8}>
                    <Typography align="left">
                    <InputLabel id="demo-simple-select-label" variant = "standard">{currentProduct.bidEndDate}</InputLabel>
                    </Typography>
                    
                    </Grid>
                    </Grid>

                    </CardContent>
                </Card>
                    </CardContent>
                </Card>
            </Grid>
            <Grid  item xs={12}>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading...</div>}>
                        <section>
                            <AuctionDetails key={currentProductId} initialAuctionData = {currentAuction} />
                        </section>
                    </Suspense>
                </ErrorBoundary>
            </Grid>
        </Grid>
        </div>
    );


}

export default FetchDetails;