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

import React, { Component } from 'react'
import Title from './Title.js'
import Form from './Form.js'
import Download from './Download.js'
import Results from './Results.js'

export default class Container extends Component {
    render() {
        return (
            <div class="container-container">
                <Title/>
                <Form/>
                <Download/>
                <Results/>
            </div>
        )
    }
}

