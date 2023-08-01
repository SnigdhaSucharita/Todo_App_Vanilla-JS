fetch("http://localhost:3000/todos", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    });