var CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

export function makeRequest() {
    let axios = require('axios');
    let url = CORS_PROXY + "https://sfbay.craigslist.org/search/cta?auto_make_model=ls400"
    return axios.get(url);
}

export function parseData(response) {
    let el = document.createElement('html');
    el.innerHTML = response.data;
    el = el.getElementsByClassName('result-title hdrlnk');
    let links = [];
    for(let i=0; i<el.length; i++) {
        links.push(el[i].attributes[0].nodeValue);}    
    return(links);
}

export function visitLinks(links) {
    let axios = require('axios');

    let dataset = [];
    for(var i=0; i<links.length; i++) {
    // for(let i=0; i<1; i++) {
        let el = document.createElement('html');
        let response = axios.get(CORS_PROXY + links[i]);        
        response.then(response => {
            el.innerHTML = response.data;
            el = el.getElementsByClassName('attrgroup')

            // el[0] contains year, title, price
            // console.log(el[0].innerText.trim())
            let year = "Year: " + el[0].innerText.trim().substring(0,4)
            let title = "Title: " + el[0].innerText.trim().substring(4,).trim()
            // console.log(year, title)

            // el[1] contains other attributes
            let collection = el[1].innerText.trim().split('\n\n\n\n')
            collection = collection.map(item => item.trim())

            let data = [year, title, ...collection];
            dataset.push(data)
        })
    } 
    // console.log(dataset)
    return(dataset);
}