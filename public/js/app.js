console.log('Loaded from the public folder - JS');


document.querySelector('#search').addEventListener('click', () => {
    const location = document.querySelector('#location').value;
    const errorElement = document.querySelector('#error');
    document.querySelector('#forecast').innerHTML = 'Loading...';
    if (!location) {
        errorElement.innerHTML = 'Please enter a location to search.';
        setTimeout(() => {
            errorElement.innerHTML = '';
        }, 2000);
    } else {
        errorElement.innerHTML = '';
        getWeatherDetails(location);
    }
});

const getWeatherDetails = (location) => {
    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json().then(data => {
                if (data.error) {
                    const errorElement = document.querySelector('#error');
                    errorElement.innerHTML = data.error;
                    document.querySelector('#forecast').innerHTML = '';
                }
                const weather = data.weather;
                document.querySelector('#forecast').innerHTML = weather.formattedReport;
            });
        });
}
