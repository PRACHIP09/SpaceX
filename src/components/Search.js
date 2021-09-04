import React from 'react'
import PropTypes from 'prop-types'

const Search = () => {
        onChange = (props) => {
        startval = props.startDate;
        endval = props.endDate;
        startdate = startval.getTime();
        enddate = endval.getTime();
        console.log(startdate,enddate);
        console.log(startval.getTime(),endval.getTime());
        console.log( moment(startval).format('YYYY-MM-DD'),moment(endval).format('YYYY-MM-DD'));
        };
    return (
        <div>
            
        </div>
    )
}

export default Search
