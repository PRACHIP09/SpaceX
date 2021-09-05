import React,{Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Col , Row} from 'react-bootstrap';
import Loader from './Loader';
import Spacex from './Spacex';
import spacexwallre from './spacexwallre.png';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import "@syncfusion/ej2-calendars/styles/daterangepicker/material-dark.css";
import { is } from 'date-fns/locale';
var launcharr=[],date=[],dateend=[],length=0,index=[],launchsort=[],startval,endval,onChange,startdate=0,enddate=0;
   
const Launches = () => {
     useEffect(() =>{
        Launchlist();
    //eslint-disable-next-line
    window.scrollTo(0,0)
    }, []);   

const [ launch, setLaunches] = useState([]);
const [ loading, setLoading ] = useState(false);

const Launchlist = async() =>{
    launchsort=[];
    launcharr=[];
    for(let i =1 ; i<73 ; i++)
    {
        launcharr.push(await getLaunches(i));
        for(let j=0;j <=length;j++)
        {
            console.log(index[j])  
            if(index[j] === i)  
            {
                launchsort.push(await getLaunches(i));
                console.log('true'+i);
                break;
            }

        }
        console.log(length)
    }
    console.log(launchsort);
    console.log(launcharr);
    setLaunches(launchsort);
    setLoading(true);
}

const getLaunches = async (flight_number) => {
    try{
        const res = await axios.get(`https://api.spacexdata.com/v3/launches/${flight_number}`)
        date=[];
        dateend=[];
        index=[];
        let timel = new Date(res.data.launch_date_local); 
        let timeunix = timel.getTime();
        console.log(timeunix);
        console.log(startdate);
        if((timeunix>=startdate && timeunix<=enddate) || (startdate === 0 && enddate ==0) )
            {
            date.push(res.data.launch_date_local.split("-")[0]);
                dateend.push(res.data);
                index.push(res.data.flight_number);
            }
            
            console.log(index);
            length = dateend.length;
            console.log(length);
        
        return res.data;
    }catch(err){
        alert(err.message);
}
};
const onChange = async(props) =>{
    try{
        startval = props.startDate;
        endval = props.endDate;
        startdate = startval.getTime();
        enddate = endval.getTime();
        console.log(startdate,enddate);
        console.log(startval.getTime(),endval.getTime());
        console.log( moment(startval).format('YYYY-MM-DD'),moment(endval).format('YYYY-MM-DD'));
        if(startdate != 0 && enddate !=0)
        {
        Launchlist();
        }
    }
    catch(err){
        alert(err.message);
    }
}
    return(
    <Fragment>
        <div>
        <img src={spacexwallre} width="300" alt="spacexwall" margin="10"  />
        
        <Typography variant="h4" align="center">"The Dawn of New Era in Commercial Space Exploration" </Typography><br/><br/>
        </div>
        <div style={{backgroundColor:"#555555",textSize:"1.5rem"}}>
        <DateRangePickerComponent change={onChange} style={{textDecorationColor:"#b30000"}} placeholder="MM/DD/YYYY - MM/DD/YYYY"></DateRangePickerComponent>
        </div><br/>
        {(startdate === enddate)?(
         <strong style={{fontSize:"1.5rem"}}>
        {`All SpaceX launches since 2006`}
         </strong>):(
        <strong style={{fontSize:"1.5rem"}}>
        {`All SpaceX Launches from  `}<br/>{moment(startval).format('DD-MMM-YYYY')}{` - `}{moment(endval).format('DD-MMM-YYYY')}
        </strong>
        )}
        <Row>
            {
            loading?(
            launchsort.map((launches)=>(
                <Col sm={12} md={4} lg={4} key={launches.flight_number}>
                
                    <Spacex launches ={launches} />
                </Col>
           
            ))):(<Loader/>)}
        </Row>
    </Fragment>
    
)};
export default Launches;

