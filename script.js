document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("search-form");
    const resultContainer = document.getElementById("result-container");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get user input
        const sourceCity = document.getElementById("source").value.trim();
        const destinationCity = document.getElementById("destination").value.trim();

        if (sourceCity === destinationCity) {
            alert("Source and destination cities cannot be the same.");
            return;
        }

        try {
            // Fetch data from the API
            const response = await fetch("https://gowithgbi.com/api/city");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Filter the data based on the source city
            const filteredData = data.filter((city) => city.name === sourceCity);

            if (filteredData.length === 0) {
                alert("Source city not found in the API.");
                return;
            }

            // Display the destination city as the result
            const resultCity = filteredData[0].destination;
            resultContainer.innerHTML = `<p>Destination City: ${resultCity}</p>`;
        } catch (error) {
            console.error("Error fetching data from the API:", error);
        }
    });
});