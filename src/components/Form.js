import React, { useState, useEffect } from 'react'
import { makeRequest } from './Functions.js'

function Form() {
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
                    <label className="form-select-label">{option.name}:</label>
                    <select className="form-select" name={option}>
                        {/* inside map option of each choice */}
                        {option.choices.map(choice => {
                            return <option value={choice}>{choice}</option>
                        })}
                    </select>
                </span>
            )
        })

        const [keyword, setKeyword] = useState('')

        const handleKeywordChange = function(event) {
            event.preventDefault()
            setKeyword(event.target.value)
        }

        // useEffect(() => {
        //     console.log(keyword)
        // }, [keyword])

        const handleSubmit = function(event) {
            event.preventDefault()
            makeRequest(keyword)
        }


        return (
            <form className="form-form" onSubmit={handleSubmit}>
                {options_container}
                <div className="field">
                    <input type="text" name="keyword" placeholder="Enter here" onChange={handleKeywordChange}/>
                    <button className="form-button" type="submit">Search</button>
                    {/* need type */}
                    <button className="form-button" type="">Reset</button> 
                </div>
            </form>
        )
}

export default Form