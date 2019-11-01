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
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            dataset: [],
            value: "",
            showDownload: "false",
            loading: "false"
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

handleReset() {
    this.setState({
        dataset: [],
        value: "",
        showDownload: "false",
        loading: "false"
    })
}

handleSubmit(event) {
    event.preventDefault();
    this.setState({
        loading: "true",
        dataset: [],
        showDownload: "false"
    })
    makeRequest(this.state.value)
    .then(response => parseData(response))
    .then(links => visitLinks(links))
    .then(dataset => setTimeout(() => {
        this.setState({
            dataset: dataset,
            showDownload: "true",
            loading: "false"
        })
    }, 5000))
}

    render() {
        return(
            <div className="display">
                    <form onSubmit={this.handleSubmit}>
                        <label id="makemodel">Make/Model: </label>
                        <input type='text' value={this.state.value} onChange={this.handleChange}></input>
                        <input type='submit' value="Search" onClick={this.handleSubmit}></input>
                        <input type="button" value="Reset" onClick={this.handleReset}/>
                    </form> <br/>


                    {this.state.loading == "false" ? <span/> : <h1 className="item">LOADING</h1>}

                    <br />

                    {this.state.showDownload == "false" ? <span/> : <input type="submit" value="Download" onClick={this.download} />}


                    <table>
                        <tbody>
                            {this.state.dataset.map((row, i) => 
                                <tr key={i}>
                                    {row.map((col, j) => 
                                        ((j === row.length - 1) && (i > 0)) ? 
                                            <td className="link" key={j}><a href={col} target="_blank" rel="noopener noreferrer">{col}</a></td> :
                                            <td className="item" key={j}>{col}</td> 
                                     )}

                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
        )
    }
}