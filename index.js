let mainContainer = document.querySelector("#container");
let selectCountry = document.querySelector("#select-country");
let cd;

function getData(URL){
    fetch(URL)
    .then(function(res){
        return res.json();
    })
    .then(function(finalres){
        cd = finalres.data;
        showData(cd);
    })
    .catch(function(error){
        console.log("Error fetching data:",error);
    })
    }
getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries");


//========================Function Show Data========================//
function showData(data){
    mainContainer.innerHTML = "";
    data.forEach(detail => {
        let child = document.createElement("div");
        child.className="child";

        let countryName = document.createElement("h2");
        countryName.textContent=detail.country;
        countryName.className="countryName";

        let rank = document.createElement("p");
        rank.className="countryRank";
        rank.textContent=detail.Rank;

        let population = document.createElement("p");
        population.className="countryPopulation";
        population.textContent=detail.population;

        child.append(countryName, rank, population);
        mainContainer.append(child);
    });
}


//=======================Function Sort Data=========================//
function sortData(){
    let arr;
    let value = selectCountry.value;

    if(value == "asc"){
        arr = cd.sort((a,b) => {
            return a.population - b.population;
        })
    }
    else if(value == "dec"){
        arr =cd.sort((a,b) => {
            return b.population - a.population;
        })
    }
    showData(arr)
}
selectCountry.addEventListener("change",sortData)