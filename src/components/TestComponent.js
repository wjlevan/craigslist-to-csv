import React, { Component } from 'react';
import { makeRequest, parseData, visitLinks } from './functions';
import './TestComponent.css';
import FileSaver from 'file-saver';

export class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.download = this.download.bind(this)
        this.state = {
            dataset: [],
            value: ""
        }
    }

handleChange(event) {
    event.preventDefault();
    this.setState({
        value: event.target.value
    })
}


download() {
    let temp = this.state.dataset
    console.log(temp)
    for(let i=1; i<temp.length; i++) {
        temp[i][temp[i].length - 1] = "=HYPERLINK(\"" + temp[i][temp[i].length - 1] + "\")"
    }
    let newstring = this.state.dataset.map((row, i) => row + "\n")    
    let file = new File(newstring, "test.csv", {type: "data:text/csv:html;charset=utf-8"});
    FileSaver.saveAs(file);     
}

handleSubmit(event) {
    event.preventDefault();

    makeRequest(this.state.value)
    .then(response => parseData(response))
    .then(links => visitLinks(links))
    .then(dataset => setTimeout(() => {
        this.setState({
            dataset: dataset})
    }, 5000))    
}

    render() {
        return(
            <div className="display">
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' value={this.state.value} onChange={this.handleChange}>
                        </input>
                    </form> <br/>
                    <input type="submit" value="Download" onClick={this.download}></input>

                    <table>
                        <tbody>
                            {this.state.dataset.map((row, i) => 
                                <tr key={i}>
                                    {row.map((col, j) => 
                                        ((j === row.length - 1) && (i > 0)) ? 
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