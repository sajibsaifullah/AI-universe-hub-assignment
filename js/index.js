const loadCardData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayCardData(data.data.tools.slice(0, 6)));
};

const displayCardData = (cards) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card h-100">
                <img src="${card.image}" class="card-img-top p-3 rounded-5 h-75" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>${card.features[0]}</li>
                    <li>${card.features[1]}</li>
                    <li>${card.features[2]}</li>
                </ol>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title">${card.name}</h5>
                    <p>
                        <i class="fa-solid fa-calendar-days me-1"></i>
                        ${card.published_in}
                    </p>
                </div>
                <i onclick="fetchModalData('${card.id}')" class="fa-solid fa-arrow-right-long text-danger" data-bs-toggle="modal" data-bs-target="#cardModal"></i>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
};

const fetchModalData = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showModalData(data));
};
const showModalData = data => {
    const description = document.getElementById('description');
    description.innerText = data.data.description;

    document.getElementById('basic-price').innerText = data.data.pricing ? data.data.pricing[0].price : "Free of cost";
    document.getElementById('basic-plan').innerText = data.data.pricing ? data.data.pricing[0].plan : "Basic";

    document.getElementById('pro-price').innerText = data.data.pricing ? data.data.pricing[1].price : "Free of cost";
    document.getElementById('pro-plan').innerText = data.data.pricing ? data.data.pricing[1].plan : "Pro";

    document.getElementById('enterprise-price').innerText = data.data.pricing ? data.data.pricing[2].price : "Free of cost";
    document.getElementById('enterprise-plan').innerText = data.data.pricing ? data.data.pricing[2].plan : "Enterprise";

    const featureContainer = document.getElementById('feature-container');
    const featureUl = document.createElement('ul');
    featureContainer.innerHTML = `
            <li><small>${data.data.features[1].feature_name}</small></li>
            <li><small>${data.data.features[2].feature_name}</small></li>
            <li><small>${data.data.features[3].feature_name}</small></li>
    `;
    featureContainer.appendChild(featureUl);

    const integrationContainer = document.getElementById('integration-container');
    const integrationUl = document.createElement('ul');
    integrationContainer.innerHTML = `
            <li><small>${data.data.integrations ? data.data.integrations[0] : "No data found"}</small></li>
            <li><small>${data.data.integrations ? data.data.integrations[1] : "No data found"}</small></li>
            <li><small>${data.data.integrations ? data.data.integrations[2] : "No data found"}</small></li>
    `;
    integrationContainer.appendChild(integrationUl);

    const modalImage = document.getElementById('modal-image');
    modalImage.innerHTML = `
        <img src="${data.data.image_link[0]}" class="card-img-top w-100 rounded-4" alt="...">
        <p class="bg-danger w-auto px-2 rounded text-white position-absolute top-0 end-0 mt-3 me-3">${data.data.accuracy.score * 100}% <span>accuracy</span></p>
    `;
    
    document.getElementById('title').innerText = data.data.input_output_examples ? data.data.input_output_examples[0].input : "Can you give any example?";
    document.getElementById('text').innerText = data.data.input_output_examples ? data.data.input_output_examples[0].output : "No! Not Yet! Take a break!!!";
    
    console.log(data.data.accuracy);
};


document.getElementById('btn-see-more').addEventListener('click', function () {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');

    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayCardData(data.data.tools));

    const seMore = document.getElementById('btn-see-more');
    seMore.classList.add('d-none');
    spinner.classList.add('d-none');
});

loadCardData();