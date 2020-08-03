function reqData() {
  return fetch("http://hp-api.herokuapp.com/api/characters")
    .then((result) => result.json())
    .then((result) => result);
}

function displayData(data) {
  let getAllData = data
    .map(
      (d) => `<div class="col-md-3 my-4">
                <div class="card characterCard">
                    <img src="${d.image}" class="card-img-top card-image" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${d.name}</h5>
                        <ul>
                            <li>Species : ${d.species}</li>
                            <li>House : ${d.house}</li>
                        </ul>
                        <button class="btn btn-info more-detail-btn" data-toggle="modal" data-target="#moreDetailCard" data-id="${d.name}">More Detail</button>
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

  // adding filter search feature
  const keywordInput = document.querySelector(".keyword-input");
  keywordInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      showFilteredData(data);
    } else if (e.keyCode === 8 || e.keyCode === 46) {
      setTimeout(() => {
        if (this.value.length === 0) {
          displayData(data);
        }
      }, 100);
    }
  });

  const inputBtn = document.querySelector(".input-btn");
  inputBtn.addEventListener("click", function () {
    showFilteredData(data);
  });
});

function showFilteredData(data) {
  const keywordInput = document.querySelector(".keyword-input");
  let getFilteredData = data
    .filter(
      (d) =>
        d.name.toLowerCase().includes(keywordInput.value.toLowerCase()) ||
        d.house.toLowerCase().includes(keywordInput.value.toLowerCase())
    )
    .map((result) => result);
  displayData(getFilteredData);
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("more-detail-btn")) {
    const data = await reqData();
    displayMoreDetail(data, e.target.dataset.id.toLowerCase());
  }
});

function displayMoreDetail(data, dataID) {
  let getInfoData = data
    .filter((data) => data.name.toLowerCase().includes(dataID))
    .map(
      (data) => `<div class="col-md-4 modalImage">
    <img src="${data.image}" alt="" class="img-fluid ">
    </div>
    <div class="col-md-8">
    <ul class="list-group">
        <li class="list-group-item"><b>Name</b>: ${data.name}</li>
        <li class="list-group-item"><b>Species </b>: ${data.species}</li>
        <li class="list-group-item"><b>Gender </b>: ${data.gender}</li>
        <li class="list-group-item"><b>House </b>: ${data.house}</li>
        <li class="list-group-item"><b>Date Of Birth </b>: ${data.dateOfBirth}</li>
        <li class="list-group-item"><b>Ancestry </b>: ${data.ancestry}</li>
        <li class="list-group-item"><b>Wand </b>:<br/> Wood </b>: ${data.wand.wood} | Core = ${data.wand.core} | Length = ${data.wand.length}</li>
        <li class="list-group-item"><b>Patronus </b>: ${data.patronus}</li>
        <li class="list-group-item"><b>Hogwarts Student </b>: ${data.hogwartsStudent}</li>
        <li class="list-group-item"><b>Hogwarts Staff </b>: ${data.hogwartsStaff}</li>
        <li class="list-group-item"><b>Actor </b>: ${data.actor}</li>
    </ul>
    </div>
    `
    )
    .join("");
  const bodyModalInfo = document.querySelector(".body-modal-info");
  bodyModalInfo.innerHTML = getInfoData;
}
