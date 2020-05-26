import React from 'react'
import Table from './Table'

function Results(props) {
    return (
            <div className="results-container">
                {props.loading===0 &&
                <Table data={props.data}/>
                }
            </div>
        )
}

export default Results