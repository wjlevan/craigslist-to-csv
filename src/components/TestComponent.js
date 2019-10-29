import React, { Component } from 'react';
import { makeRequest, parseData, visitLinks } from './functions';

export class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: [],
            year: [],
            title: [],
            price: []
        }
    }

componentDidMount() {
    makeRequest()
    .then(response => parseData(response))
    .then(links => visitLinks(links))
    .then(dataset => {
        setTimeout(() => {
            // console.log(dataset[0][0])
            this.setState({
                year: dataset[0][0]  })
        }, 1000)})

    }


    render() {
        return(
            <div>
                {this.state.year}

            </div>
        )
    }
}