const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}

const displaySearchResult = (data) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    data.forEach(data => {
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p>${data.brand}</p>
                <button onclick="loadMobileDetail('${data.slug}')" class="btn-grad">Detail</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div)
    })
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
    div.innerHTML = `
                <div class="card-body">
                <img src="${data.image}" class="card-img-top" alt="...">
                <h5 class="card-title pt-2 pb-3">${data.name}</h5>
                    <ul class="card-text">
                    <h6 class="text-start">${data.releaseDate}</h6>
                    <h6 class="text-start">Features: </h6>
                    <li>Storage : ${data.mainFeatures.storage}</li>
                    <li>Display Size : ${data.mainFeatures.displaySize}</li>
                    <li>Chipset : ${data.mainFeatures.chipSet}</li>
                    <li>Memory : ${data.mainFeatures.memory}</li>
                    </ul>
                </div>
    `
    mobileDetails.appendChild(div)
}