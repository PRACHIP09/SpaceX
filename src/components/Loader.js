import React from 'react';
import {Spinner , Row , Col,div} from 'react-bootstrap'
const Loader = () => {
    return (
        <div className ='d-flex justify-content-center mt-5' 
        style={{height : '100vh' }}>
            <Row>
                <Col>
                <Spinner className='spinner-border spinner-border-lg'
                role='status'
                style={{height: '5vh', width: '5vh'}}>
                </Spinner>
                </Col>
            </Row>
            <Row>
                <Col>
                <div className='mx-3'>
                    <strong>
                    Fetching Launches......
                    </strong>
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default Loader