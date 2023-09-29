document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('search-form');
    const resultContainer = document.getElementById('result-container');
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const sourceCity = document.getElementById('source').value.trim();
      const destinationCity = document.getElementById('destination').value.trim();
  
      if (sourceCity === destinationCity) {
        alert('Source and destination cities cannot be the same.');
        return;
      }
  
      try {
        const response = await fetch(`http://127.0.0.1:3000/search?source=${sourceCity}&destination=${destinationCity}`);
        const data = await response.json();
  
        if (response.ok) {
          resultContainer.innerHTML = `<p>Destination City: ${data.destinationCity}</p>`;
        } else {
          resultContainer.innerHTML = `<p>Error: ${data.error}</p>`;
        }
      } catch (error) {
        console.error('Error fetching data from the server:', error);
        resultContainer.innerHTML = '<p>Error: Internal server error</p>';
      }
    });
  });
  