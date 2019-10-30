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

    let dataset = [[
        " ",
        "year",
        "title",
        "condition",
        "paint color",
        "title status",
        "transmission",
        "link"
    ]];

    let counter = 1;
    
    for(var i=0; i<links.length; i++) {
    // for(let i=0; i<1; i++) {
        let el = document.createElement('html');
        let response = axios.get(CORS_PROXY + links[i]);        
        response.then(response => {
            el.innerHTML = response.data;
            // let this_url = "=HYPERLINK(\"" + el.innerHTML.split('rel="canonical" href="')[1].split('">')[0] + "\")"
            let this_url = el.innerHTML.split('rel="canonical" href="')[1].split('">')[0]
            el = el.getElementsByClassName('attrgroup')
            
            // el[0] contains year, title, price
            console.log(el[0])
            let year = "year: " + el[0].innerText.trim().substring(0,4)
            let title = "title: " + el[0].innerText.trim().substring(4,).trim()

            // el[1] contains other attributes
            let collection = el[1].innerText.trim().split('\n\n\n\n')
            collection = collection.map(item => item.trim())

            // year, title
            let data = [year, title]

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
            for(let i=0; i<6; i++) {
                data[i] = data[i].split(': ')[1].trim()}

            // add array
            data.unshift(counter)
            counter++
            dataset.push(data)
        })
    }
    return(dataset);
}