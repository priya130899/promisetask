// Function to fetch data from an API using Promises
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  };
  
  // Function to extract and display specific data
  const displaySpecificData = (data, elementId, fields) => {
    // Check if the necessary data is available in the response
    if (data && data.data && data.data.length > 0) {
      const firstRecord = data.data[0];
  
      // Display the specified fields on the webpage
      fields.forEach(field => {
        const value = firstRecord[field] || 'N/A';
        document.getElementById(elementId).innerHTML += `<p>${field}: ${value}</p>`;
      });
    } else {
      console.error('Data format is not as expected.');
    }
  };
  
  // API URLs
  const apiUrls = {
    covidIndia: 'https://data.covid19india.org/v4/min/timeseries.min.json',
    covidUK: 'https://api.coronavirus.data.gov.uk/v1/data',
    covidUS: 'https://api.covidtracking.com/v2/us/daily.json',
  };
  
  // Fetch and display data for COVID-19 India
  fetchData(apiUrls.covidIndia)
    .then(data => displaySpecificData(data, 'covidIndiaData', ['dates', 'delta', 'total']))
    .catch(error => console.error('Error fetching data from COVID-19 India:', error));
  
  // Fetch and display data for COVID-19 UK
  fetchData(apiUrls.covidUK)
    .then(data => displaySpecificData(data, 'covidUKData', ['confirmedRate', 'areaName', 'deathRate']))
    .catch(error => console.error('Error fetching data from COVID-19 UK:', error));
  
  // Fetch and display data for COVID-19 US
  fetchData(apiUrls.covidUS)
    .then(data => displaySpecificData(data, 'covidUSData', ['date', 'states']))
    .catch(error => console.error('Error fetching data from COVID-19 US:', error));
  