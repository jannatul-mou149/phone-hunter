const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);


    const errorDiv = document.getElementById("error-message");
    if (searchText == "") {
        errorDiv.innerText = "Please type mobile name to search...";
    }

    else {
        errorDiv.innerText = "";
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))

    }
}
const displaySearchResult = (data) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const mobileDetails = document.getElementById('mobile-details');
    mobileDetails.textContent = '';

    let count = 0;
    let foundResult = 0;
    for (const datum of data) {
        console.log(data);
        count++;
        //here count == 21  beacuse count variable was incremented earlier the condition executed.
        if (count == 21) {
            break;
        }
        else {
            foundResult++;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
            <img src="${datum.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${datum.phone_name}</h5>
                <p>${datum.brand}</p>
                <button onclick="loadMobileDetail('${datum.slug}')" class="btn-grad">Detail</button>
            </div>
        </div>
        `;
            searchResult.appendChild(div);
        }
    }
    if (foundResult == 0) {
        const errorDiv = document.getElementById("error-message");
        errorDiv.innerText = "No result found!";
    }
}


const loadMobileDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobileDetail(data.data));
}

const displayMobileDetail = data => {
    console.log(data);
    const mobileDetails = document.getElementById('mobile-details');
    mobileDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('detail-card');
    div.innerHTML = `
                <div class="card-body">
                <img src="${data.image}" class="card-img-top detail-card-img" alt="...">
                <h5 class="card-title pt-2 pb-3">${data.name}</h5>
                    <ul class="card-text">
                    ${(() => {
            if (data.releaseDate == '') {
                return `<h6 class="text-center text-warning"> No Realise Date Found.</h6>`;

            } else {
                return `<h6 class="text-center text-success">Release Date : ${data.releaseDate}</h6>`;

            }

        })()

        }
                    <h6 class="text-start pt-3">Main Features: </h6>
                    <li class="text-start">Storage : ${data.mainFeatures.storage}</li>
                    <li class="text-start">Display Size : ${data.mainFeatures.displaySize}</li>
                    <li class="text-start">Chipset : ${data.mainFeatures.chipSet}</li>
                    <li class="text-start">Memory : ${data.mainFeatures.memory}</li>
                    </ul>
                    
                    <ul>
                    <h6 class="text-start pt-3">Sensors: </h6>
                    <li class="text-start"> ${data.mainFeatures.sensors}</li>
                    </ul>
                    ${(() => {
            if (data.others !== undefined) {
                return `  <ul>
                            <h6 class="text-start pt-3">Others Features : </h6>
                            <li class="text-start">WLAN : ${data.others.WLAN}</li>
                            <li class="text-start">Bluetooth : ${data.others.Bluetooth}</li>
                            <li class="text-start">GPS : ${data.others.GPS}</li>
                            <li class="text-start">Radio : ${data.others.Radio}</li>
                            <li class="text-start">USB : ${data.others.USB}</li>
                            </ul>`;

            }
            else {
                return ``;

            }

        })()
        }
                </div>
    `
    mobileDetails.appendChild(div)
}