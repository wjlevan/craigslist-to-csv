import React from 'react'
import loading from './assets/loading.gif'

function Download(props) {
        return (
            <div className="">
                {props.loading===0 && <div>
                    <input type="button" value="Download"/>
                </div>}
                {props.loading===1 && <div>
                    <img src={loading} alt="loading"/>    
                </div>}
            </div>
        )
}

export default Download