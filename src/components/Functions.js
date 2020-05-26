export const makeRequest = function(keyword) {
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
    .then(data => console.log(data))
}