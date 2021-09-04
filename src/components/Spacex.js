import React from 'react'
import { Card,Col,Row,pre} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import moment from 'moment';
var date,dateformat;
const Spacex =({launches}) => {
    date = launches.launch_date_local;
    dateformat = moment(date).format('DD-MMM-YYYY');
    return (
        <>
        <Card className='my-3 p-3 rounded h-90'
        style={{width: '15rem', height: '22rem' ,borderColor: "#e85546" }}>
        <Card.Title>
            {launches.flight_number}
        </Card.Title>
            <Link to = {`/launches/${launches.flight_number}`}>
               <Card.Img style={{objectFit:"contain"}} variant='top' src={launches.links.mission_patch} />
            </Link>
            <Card.Body className = {`${launches.mission_name} rounded`}>
                <Card.Title style={{color:"white" , textAlign: "center"}}>
                    <strong>
                    {`${launches.mission_name}`}<br/>
                    {dateformat}
                    </strong>
                </Card.Title>
            </Card.Body>
            
        </Card>
        </>
    )
}

export default Spacex
