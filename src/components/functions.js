var CORS_PROXY = "https://cors-anywhere.herokuapp.com/" // proxy to bypass cross-origin limitations

export function makeRequest(makemodel) {
    let axios = require('axios');
    let url = CORS_PROXY + "https://sfbay.craigslist.org/search/cta?auto_make_model=" + makemodel.replace(" ", "+")
    return axios.get(url);
}

export function parseData(response) {
    let el = document.createElement('html');
    el.innerHTML = response.data;
    el = el.getElementsByClassName('result-title hdrlnk'); // get all links from html element
    let links = [];
    for(let i=0; i<el.length; i++) {
        links.push(el[i].attributes[0].nodeValue);} // append to link array   
    return(links);
}

export function visitLinks(links) {
    let axios = require('axios');
    let dataset = [["#",
        "year",
        "title",
        "price",
        "condition",
        "paint color",
        "title status",
        "transmission",
        "link"]]; // initialize table headers

    let counter = 1;
    for(var i=0; i<links.length; i++) {
        let el = document.createElement('html');
        let response = axios.get(CORS_PROXY + links[i]); // visit link number i        
        
        response.then(response => { 
            try {
                el.innerHTML = response.data;
                let this_url = el.innerHTML.split('rel="canonical" href="')[1].split('">')[0]
                let price = "price: " + (el.getElementsByClassName("price")[0].innerText)
                el = el.getElementsByClassName('attrgroup')
                return ([el, price, this_url])} // return attributes, price, url
            catch {return false} // return false for error handler
        })    
        .then(((set => getAttr(set))), onError()) // get single complete row
        .then(dataset => {return(dataset)}) // return table
}

function onError() {
    return
}
function getAttr(set) {
    if(set == false) {return false}
    let el = set[0]
    let price = set[1]
    let this_url = set[2]

    try {
        // el[0] contains year, title
        let year = "year: " + el[0].innerText.trim().substring(0,4)
        let title = "title: " + el[0].innerText.trim().substring(4,).trim()

        // el[1] contains other attributes
        let collection = el[1].innerText.trim().split('\n\n\n\n')
        collection = collection.map(item => item.trim())

        // year, title, price
        let data = [year, title, price]

        // condition
        let condition = false
        for(let i=0; i<collection.length; i++) {
            if(collection[i].substring(0,9) == 'condition') {
                data.push(collection[i])
                condition = true}}
        if(condition == false) {
            data.push('condition: null')}

        // paint color
        let paintcolor = false
        for(let i=0; i<collection.length; i++) {
            if(collection[i].substring(0,11) == 'paint color') {
                data.push(collection[i])
                paintcolor = true}}
        if(paintcolor == false) {
            data.push('paint color: null')}

        // title status
        let titlestatus = false
        for(let i=0; i<collection.length; i++) {
            if(collection[i].substring(0,12) == 'title status') {
                data.push(collection[i])
                titlestatus = true}}
        if(titlestatus == false) {
            data.push('title status: null')}

        // transmission
        let transmission = false
        for(let i=0; i<collection.length; i++) {
            if(collection[i].substring(0,12) == 'transmission') {
                data.push(collection[i])
                transmission = true}}
        if(transmission == false) {
            data.push('transmission: null')}

        // url
        data.push(this_url)

        // remove key
        for(let i=0; i<7; i++) {
            data[i] = data[i].split(': ')[1].trim()}

        // add array
        data.unshift(counter)
        counter++
        dataset.push(data)    
    }
    catch {return}}
    return(dataset);
}
