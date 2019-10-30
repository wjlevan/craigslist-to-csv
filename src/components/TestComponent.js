import React, { Component } from 'react';
import { makeRequest, parseData, visitLinks } from './functions';
import { ExportCSV } from './ExcelComponent';

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
    .then(dataset => setTimeout(() => {
        dataset = dataset.map(row => row.join('; '))
        // console.log(dataset[0])
        this.setState({
            dataset: dataset})
    }, 5000))

}

    render() {
        return(
            <div>
                    < ExportCSV />
                {this.state.dataset.map((el, index) => <div key={index}>{el}<br/><br/></div> )}

            </div>
        )
    }
}