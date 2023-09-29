document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('search-form');
    const resultContainer = document.getElementById('result-container');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const sourceCity = document.getElementById('source').value.trim();
      const destinationCity = document.getElementById('destination').value.trim();
  
      if (sourceCity === destinationCity) {
        alert('Source and destination cities cannot be the same.');
        return;
      }
  
      // Load the JSON data directly from the file
      fetch('cities.json')
        .then((response) => response.json())
        .then((data) => {
          const matchingCity = data.data.find((city) => city.name === destinationCity);
  
          if (!matchingCity) {
            resultContainer.innerHTML = '<p>Error: Source city not found in the data.</p>';
          } else {
            const resultCity = matchingCity.name;
            resultContainer.innerHTML = `<p>Destination City: ${resultCity}</p>`;
          }
        })
        .catch((error) => {
          console.error('Error loading JSON data:', error);
          resultContainer.innerHTML = '<p>Error: Unable to load data</p>';
        });
    });
  });
  