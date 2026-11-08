const boxInput = document.getElementById('input-box'); 
const table = document.getElementById('table').tBodies[0];

async function fetchTubeArrival () {
    const response = await fetch('https://london-tube-api.vercel.app/api/arrivals');

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Error fetching tube arrival data');
    }
}

function displayTubeArrival(boxValue) {
    fetchTubeArrival ()
    .then((arrivalData) => {
        formatArrivalData (arrivalData);
    })
    .catch ((error) => {
        console.log('Error', error);
    })

    function formatArrivalData(arrivalData) {
        const dataList = {
        1 : arrivalData.find(item => item.location === "Bakerloo"),
        2 : arrivalData.find(item => item.location === "Central"), 
        3 : arrivalData.find(item => item.location === "Circle"), 
        4 : arrivalData.find(item => item.location === "District"), 
        5 : arrivalData.find(item => item.location === "Jubilee"), 
        6 : arrivalData.find(item => item.location === "Northern"), 
        7 : arrivalData.find(item => item.location === "Victoria"),
        8 : arrivalData.find(item => item.location === "Waterloo & City"),
        };

        const allTbodyElements = document.querySelectorAll('.tbody');

        for (let key in dataList) {
            if (boxValue == key) {
                allTbodyElements.forEach(tbody => { 
                    tbody.innerHTML = ''; 
                });
            
                table.innerHTML = '';
                
                for (const detail of dataList[key].details) {
    
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                    <tr>
                    <td>${detail.line_no}</td>
                    <td>${detail.next_arrival_minutes <= 0 ? "Arriving" : detail.next_arrival_minutes}</td>
                    <td>${detail.operator}</td>
                    </tr>
                    `;
                    table.appendChild(tr);
                }
            } 
        }
    }
}

function showArrivals() {
    const boxValue = boxInput.value;

    if (boxValue) {
        displayTubeArrival(boxValue);
        boxInput.value = '';
    } else {
        alert('Please enter a ID in the field');
    }
}