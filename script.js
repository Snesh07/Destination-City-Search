document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById("search-form");
    const resultContainer = document.getElementById("result-container");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get user input
        const source = document.getElementById("source").value.trim();
        const destinationCity = document.getElementById("destination").value.trim();

        
    })
})