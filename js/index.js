const loadCardData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayCardData(data.data.tools.slice(0, 6)));
}

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
                <i class="fa-solid fa-arrow-right-long text-danger"></i>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
        // console.log(card);
    });
}

document.getElementById('btn-see-more').addEventListener('click', function () {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayCardData(data.data.tools));

    const seMore = document.getElementById('btn-see-more');
    seMore.classList.add('d-none');
})

// const displayAllCard = () => {
//     fetch('https://openapi.programming-hero.com/api/ai/tools')
//         .then(res => res.json())
//         .then(data => displayCardData(data.data.tools));
// }

loadCardData();