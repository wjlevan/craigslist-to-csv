import React, { Component } from 'react';
import { makeRequest, parseData, visitLinks } from './functions';
import './MainComponent.css';
import FileSaver from 'file-saver';

export class MainComponent extends Component {
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
            loading: "false"}
    }

handleChange(event) {
    event.preventDefault();
    this.setState({
        value: event.target.value})
}

download() {
    let temp = this.state.dataset
    for(let i=1; i<temp.length; i++) {
        temp[i][temp[i].length - 1] = "=HYPERLINK(\"" + temp[i][temp[i].length - 1] + "\")"} // write link in file as hyperlink
    let newstring = this.state.dataset.map((row, i) => row + "\n")
    let myFileName = "craigslist-search-results.csv"
    let file = new File(newstring, myFileName, {type: "data:text/csv:html;charset=utf-8"});
    FileSaver.saveAs(file);     
}

handleReset() {
    this.setState({
        dataset: [], // reset results
        value: "", // reset input
        showDownload: "false", // hide download button
        loading: "false" // hide loading
    })
}

handleSubmit(event) {
    event.preventDefault();
    this.setState({
        loading: "true", // show loading
        dataset: [], // clear results
        showDownload: "false"}) // hide download button

    makeRequest(this.state.value) // search based on keyword
    .then(response => parseData(response)) // get links
    .then(links => visitLinks(links)) // visit links
    .then(dataset => setTimeout(() => {
        this.setState({
            dataset: dataset, // show results
            showDownload: "true", // show download button
            loading: "false"}) // hide loading
    }, 5500)) // buffer for slow internet
}

    render() {
        return(
            <div className="display">
                    <h1 className="pagetitle">SF Craigslist Cars/Trucks Search Tool</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label id="makemodel">Make/Model: </label>
                        <input type='text' value={this.state.value} onChange={this.handleChange}></input>
                        <input type='submit' value="Search" onClick={this.handleSubmit}></input>
                        <input type="button" value="Reset" onClick={this.handleReset}/>
                    </form> <br/>

                    {this.state.loading == "false" ? <span/> : <h1 className="item">LOADING</h1>}<br />
                    {this.state.showDownload == "false" ? <span/> : <input type="submit" value="Download .csv" onClick={this.download} />}<br/>

                    <table>
                        <tbody>

                            {/* dynamically render results */}
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