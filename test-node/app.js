
const getMovies = async (url)=>{
  const res = await fetch(url)
  try {
    const data = await res.json();
    console.log(data);

    let table = document.createElement('table');
    let headerRow = document.createElement("tr");
    let nameHeaderCell = document.createElement("th");
    nameHeaderCell.textContent = "Movie Title";
    let scoreHeaderCell = document.createElement("th");
    scoreHeaderCell.textContent = "Score";
    headerRow.appendChild(nameHeaderCell);
    headerRow.appendChild(scoreHeaderCell);
    table.border = "1";
    table.appendChild(headerRow);
  
    for(let i=0; i<data.length; i++){
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        nameCell.textContent = data[i].movie;
        let scoreCell = document.createElement("td");
        scoreCell.textContent = data[i].score;
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        table.appendChild(row);
    }
    let tableMovies = document.getElementById('divTableMovies');
    if(tableMovies.hasChildNodes()){
      tableMovies.removeChild(tableMovies.firstElementChild);
    }
    tableMovies.appendChild(table);
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json'
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data)
    });
    return response.json();
  }

  function addMovie(){
      let movieName = document.getElementById('txtMovie').value;
      let rate  = document.getElementById('txtRate').value;
      postData('/addMovie', {movie: movieName, score: rate}).then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      }).then(result=> {
        getMovies('/getMovies');
      });
  }

  getMovies('/getMovies');

