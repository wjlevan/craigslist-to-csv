// Container

// Title

// 3 dropdowns

// Search Input
// Search Button
// Reset

// In progress
// Button Download 



// Table
// Table Header
// Table Results
// Pagination

import React, { useState } from 'react'
import Title from './Title.js'
import Form from './Form.js'
import Download from './Download.js'
import Results from './Results.js'

function Container() {
        const [data, setData] = useState('')
        const [loading, setLoading] = useState(-1)


        return (
            <div className="container-container">
                <Title/>
                <Form data={data} setData={setData} setLoading={setLoading}/>
                <Download loading={loading}/>
                <Results loading={loading} data={data} />
            </div>
        )
}

export default Container