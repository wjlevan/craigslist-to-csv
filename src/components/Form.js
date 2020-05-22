import React, { Component, useState } from 'react'
import { handleSubmit } from './Functions.js'

export default class Title extends Component {
    render() {
        // Constants here
        // Populate from actual site later 
        var city = {
            name: "City",
            choices: ["Sacramento", "Elk Grove"]
        }
        var category = {
            name: "Category",
            choices: ["Cars", "Computers"]
        }
        var subcategory = {
            name: "Subcategory",
            choices: ["Owner", "Dealer"]
        }
        const options = [city, category, subcategory]
        // outside map select of each option
        const options_container = options.map(option => {
            return (
                <span>
                    <label class="form-select-label">{option.name}:</label>
                    <select class="form-select" name={option}>
                        {/* inside map option of each choice */}
                        {option.choices.map(choice => {
                            return <option value={choice}>{choice}</option>
                        })}
                    </select>
                </span>
            )
        })

        const [keyword, setKeyword] = useState(0)

        var handleKeywordChange = function(event) {
            this.setState({keyword: event.target.value})
        }

        return (
            <form class="form-form" onSubmit={handleSubmit(this.state.keyword)}>
                {options_container}
                <div class="field">
                    <input type="text" name="keyword" placeholder="Enter here" onChange={() => setKeyword(this.value)}/>
                    <button class="form-button" type="submit">Search</button>
                    <button class="form-button" type="submit">Reset</button>
                </div>
            </form>
        )
    }
}

