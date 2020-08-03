function reqData() {
  return fetch("http://hp-api.herokuapp.com/api/characters")
    .then((result) => result.json())
    .then((result) => result);
}

function displayData(data) {
  let getAllData = data
    .map(
      (d) => `<div class="col-md-3 my-4">
                <div class="card">
                    <img src="${d.image}" class="card-img-top card-image" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${d.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
               </div>`
    )
    .join("");
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = getAllData;
}

window.addEventListener("load", async function () {
  const data = await reqData();
  displayData(data);
});
