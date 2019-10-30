import React, { Component } from 'react';
import { makeRequest, parseData, visitLinks } from './functions';
import './TestComponent.css';
import FileSaver from 'file-saver';

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
        // dataset = dataset.map(row => row.join('; '))
        // console.log(dataset[0])
        this.setState({
            dataset: dataset})

        let newstring = dataset.map((row, i) => row + "\n")
        var file = new File(newstring, "test.csv", {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);     
        console.log(dataset)
    }, 5000))
    
}

    render() {
        return(
            <div className="display">
                    {/* < ExportCSV /> */}
                    <table>
                        <tbody>
                            {this.state.dataset.map((row, i) => 
                                <tr key={i}>
                                    {/* {console.log(row)} */}
                                    {row.map((col, j) => <td key={j}>{col}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
        )
    }
}