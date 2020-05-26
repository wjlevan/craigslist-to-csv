import React, { useState, useEffect } from 'react'

function Table(props) {
    useEffect(() => {
        const data = props.data.map((result, index) => {
            return (
                <tr key={index}>
                    <th>{result.name}</th>
                    <th>{result.price}</th>
                    <th>{result.condition}</th>
                </tr>
            )
        })
        setData(data)
    }, [props.data])

    var headers = ['Name','Price','Condition']
    headers = <tr>{headers.map((field, index) => <td key={index}>{field}</td>)}</tr>

    const [data, setData] = useState(<tr/>)

    return (
            <div className="table-container">
                <table className="table-table">
                    <thead className="table-thead">
                        {headers}
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
        )
}

export default Table