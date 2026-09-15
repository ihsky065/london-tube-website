const firstTbody = document.getElementById('first-tbody');

async function fetchTubeArrival () {
    const response = await fetch('https://london-tube-api.vercel.app/api/arrivals');

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Error fetching tube arrival data');
    }
}

function displayTubeArrival () {
    fetchTubeArrival ()
    .then((arrivalData) => {
        firstTbody.innerHTML = formatArrivalData (arrivalData);
    })
    .catch ((error) => {
        console.log('Error', error);
    })
}