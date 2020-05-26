import React, { useState, useEffect } from 'react'

function Form(props) {
        // Constants here
        // Populate from actual site later 
        const city = {
            name: "City",
            choices: ["Sacramento", "Elk Grove"]
        }
        const category = {
            name: "Category",
            choices: ["Cars", "Computers"]
        }
        const subcategory = {
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

        const handleKeywordChange = event => {
            event.preventDefault()
            setKeyword(event.target.value)
        }

        // useEffect(() => {
        //     console.log(keyword)
        // }, [keyword])

        const handleSubmit = event => {
            event.preventDefault()
            const makeRequest = keyword => {
                const BACKEND_API = 'http://127.0.0.1:5000/'
            
                const URL = BACKEND_API + keyword
                // Send keyword to backend
                // console.log(URL)
                fetch(URL, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      }
                  })
                .then(response => response.json())
                .then(data => {
                    props.setData(data)
                })
            }
            makeRequest(keyword)
        }

        useEffect(() => {
        }, [props.data])



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