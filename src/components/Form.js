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
        const options_container = options.map((option, index) => {
            return (
                <span key={index}>
                    <label className="form-select-label">{option.name}:</label>
                    <select className="form-select" name={option}>
                        {/* inside map option of each choice */}
                        {option.choices.map(choice => {
                            return <option key={choice} value={choice}>{choice}</option>
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
            if(props.data !== '')
                props.setData('')
            props.setLoading(1)
            const makeRequest = keyword => {
                const BACKEND_API = 'http://127.0.0.1:5000/'
            
                const URL = BACKEND_API + keyword
                // Send keyword to backend
                // console.log(URL)
                const jsonArray = []
                fetch(URL, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      }
                  })
                .then(response => response.json())
                .then(data => data.forEach((item, index) => jsonArray.push(JSON.parse(item))))
                .then(jsonArr => props.setData(jsonArray))
                .then(() => props.setLoading(0))

            }
            makeRequest(keyword)
        }

        const handleReset = event => {
            props.setLoading(-1)
        }

        useEffect(() => {
        }, [props.data, props.loading])


        return (
            <form className="form-form" onSubmit={handleSubmit}>
                {options_container}
                <div className="field">
                    <label className="form-search-label">Search:</label>
                    <input type="text" name="keyword" placeholder="Enter keyword" onChange={handleKeywordChange}/>
                    <button className="form-button" type="submit">Search</button>
                    {/* need type */}
                    <input type="reset" className="form-button" value="Reset" onClick={handleReset}/> 
                </div>
            </form>
        )
}

export default Form