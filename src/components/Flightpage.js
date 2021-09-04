import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Loader from './Loader';
import ReactPlayer from 'react-player';
import spacexwallre from './spacexwallre.png';
import { Typography } from '@material-ui/core';

var date,datemonth,extra,dateyear;
const  Flightpage = ({match}) => {

    const id = match.params.flight_number;
    console.log(id); 

    const [ launchdata, setLaunchesdata] = useState();
    const [ loading, setLoading ] = useState(true);

    const getLaunchesdata = async(id) => {
        const datal = await getLaunchdata(id);
        console.log(datal);
        setLaunchesdata(datal);
        dateyear = datal.launch_date_local.split("-")[0];
        datemonth = datal.launch_date_local.split("-")[1];
        extra = datal.launch_date_local.split("-")[2];
        date = extra.split("T")[0];
        console.log(dateyear , datemonth, date);
        setLoading(false);
    };

    const getLaunchdata = async(id) =>{
        const res = await axios.get(`https://api.spacexdata.com/v3/launches/${id}`)
        return res.data;
    };

    useEffect(() =>{
        getLaunchesdata(id);
        //eslint-disable-next-line
        window.scrollTo(0,0)
    }, []);


    return (
         <>
         {loading ?(
             <Loader />):(
                <Row>
                     <Col xs={12} sm={12} xl={12} lg={12} md={12} >
                     <img src={spacexwallre} width="200"alt="spacexwall"/>
                     <Typography variant="h5" align="right"><div style={{color: "#74ddeb"}}>{`Was launched on `}{date}{`-`}{datemonth}{`-`}{dateyear}</div></Typography><br/><br/>
                     <Card className='my-3 p-3 rounded text-center' 
                        style={{border: 'none', minWidth:'550px'}}>
                        <Link to = {`/launches/${launchdata.flight_number}`}>
                            <Card.Img style={{width:'17rem'}} variant='top' src={launchdata.links.mission_patch} />
                        </Link>
                        <Card.Body className = {`${launchdata.mission_name} rounded`}>
                        <Card.Title style={{color:"white" , textAlign: "center"}}>
                        <Typography variant="h4" align="center">{`${launchdata.mission_name} - ${launchdata.launch_year}`}</Typography><br/><br/>
                        <Card  
                        style={{border: 'none',textAlign: "left"}}>
                        {`Rocket ${launchdata.rocket.rocket_name} which was used was of ${launchdata.rocket.rocket_type} type`}<br/><br/>
                        {`Launched at ${launchdata.launch_site.site_name_long}`}<br/><br/>
                        {`Launch Success - ${launchdata.launch_success} - ${launchdata.details}`}<br/><br />
                        {`Manufactured by ${launchdata.rocket.second_stage.payloads[0].manufacturer} at ${launchdata.rocket.second_stage.payloads[0].nationality} and was bought by ${launchdata.rocket.second_stage.payloads[0].customers}`}<br/><br/>
                        {`The ${launchdata.rocket.second_stage.payloads[0].payload_id} was ${launchdata.rocket.second_stage.payloads[0].payload_type} type and weighed ${launchdata.rocket.second_stage.payloads[0].payload_mass_kg}kg / ${launchdata.rocket.second_stage.payloads[0].payload_mass_lbs}lbs`}<br/><br/>
                        {`${launchdata.rocket.rocket_name} was launched in ${launchdata.rocket.second_stage.payloads[0].orbit_params.regime} orbit (${launchdata.rocket.second_stage.payloads[0].orbit})`}<br/><br/>
                        <Typography variant="h6">A brief description about <a href={launchdata.links.article_link}><span style={{color: "#ebdb54"}}>{`${launchdata.mission_name}`}</span></a></Typography>
                        </Card>
                        </Card.Title>
                        </Card.Body>
                        </Card>
                        <ReactPlayer className='my-3 p-3 rounded text-center'
                        width = '550px' height='350px'
                        style={{justifyContent: "center"}}
                        controls
                        url={launchdata.links.video_link}
                        onReady={() => console.log('onReady , callback')} />
                     </Col>
                 </Row>
         )}
         </>
    
        
    )};

export default Flightpage;
