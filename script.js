async function fetchTubeArrival () {
    const response = await fetch('https://london-tube-api.vercel.app/api/arrivals');

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Error fetching tube arrival data');
    }
}

async function displayTubeArrival() {
    fetchTubeArrival ()
    .then((arrivalData) => {
        formatArrivalData (arrivalData);
        // showArrivals ();
    })
    .catch ((error) => {
        console.log('Error', error);
    })
}

displayTubeArrival ();

let formatData = [];

const boxInput = document.getElementById('input-box').value; 
const table = document.getElementById('table').tBodies[0];

// function showArrivals() {
//     return boxInput;
// }

// showArrivals();

function formatArrivalData (arrivalData) {
    const bakerlooItem = arrivalData.find(item => item.location === "Bakerloo"); 
    const allTbodyElements = document.querySelectorAll('.tbody'); 

   
        allTbodyElements.forEach(tbody => { 
            tbody.innerHTML = ''; 
        });
    
        table.innerHTML = '';
        
        for (const detail of bakerlooItem.details) {

            const tr = document.createElement('tr');
            tr.innerHTML = `
            <tr>
            <td>${detail.line_no}</td>
            <td>${detail.next_arrival_minutes}</td>
            <td>${detail.operator}</td>
            </tr>
            `;
            table.appendChild(tr);
        }
}

