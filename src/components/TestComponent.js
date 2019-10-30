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
        this.setState({
            dataset: dataset})

        let newstring = dataset.map((row, i) => row + "\n")
        var file = new File(newstring, "test.csv", {type: "data:text/csv:html;charset=utf-8"});
        FileSaver.saveAs(file);     
        console.log(dataset)
    }, 5000))
    
}

    render() {
        return(
            <div className="display">
                    <table>
                        <tbody>
                            {this.state.dataset.map((row, i) => 
                                <tr key={i}>
                                    {/* {console.log(row)} */}
                                    {row.map((col, j) => 
                                        j === row.length - 1 ? 
                                            <td key={j}><a href={col} target="_blank" rel="noopener noreferrer">{col}</a></td> :
                                            <td key={j}>{col}</td> 
                                     )}

                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
        )
    }
}