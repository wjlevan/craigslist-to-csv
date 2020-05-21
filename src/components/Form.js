import React, { Component } from 'react'

export default class Title extends Component {
    render() {
        // Constants here

        // Populate from actual site later 
        const city = ['Sacramento', 'Elk Grove']
        const category = ['Cars', 'Computers']
        const subcategory = ['Owner', 'Dealer']
        const options = [city, category, subcategory]
        // nested mapping select->option
        const options_container = options.map(option => {
            return <select class="form-select" name={option}>
                {option.map(element => {
                    return <option value="element">{element}</option>
                })}
            </select>
        })

        return (
            <form class="form-form">
                {options_container}
                <div class="field">
                    <input type="text" name="keyword" placeholder="Enter here"/>
                </div>
            <button class="form-button" type="submit">Search</button>
            <button class="form-button" type="submit">Reset</button>
            </form>
        )
    }
}