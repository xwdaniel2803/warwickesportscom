//first add an event listener for page load
document.addEventListener( "DOMContentLoaded", get_json_data, false ); // get_json_data is the function name that will fire on page load

//this function is in the event listener and will execute on page load
function get_json_data(){
    // Config firebase database connection

    // Get a reference to the firebase service
    // const database = firebase.database();

    // Link to SQL to Firebase commands: https://firebase.googleblog.com/2013/10/queries-part-1-common-sql-queries.html

    /* make request to firebase
    // For each {CompetingID, TeamID, TournamentID}
        - ResultID from Results
        - TeamName + GameID from Teams
        - GameName from Games
        - TournamentName and TournamentDate from Tournaments
    */

    // Initialise string that points to data to be collected
    const competingRef = firebase.database().ref('competing').once('value')
    .then((snapshot) => {
        // Do stuff with the snapshot
    })
    // ERROR HANDLING
    .catch(err => {
        // output error
        console.log(err);
    });

    // Tournament Name | Team Name | Game | Result | Date
    
    // receive JSON back
    const json_data = [
        { "COUNTRY":"UK", "LoC":"London", "BALANCE":"78,573", "DATE":"1/06/2018" },
        { "COUNTRY":"US", "LoC":"New York", "BALANCE":"43,568", "DATE":"18/05/2018" },
        { "COUNTRY":"PL", "LoC":"Kraków", "BALANCE":"12,362", "DATE":"22/06/2018" },
        { "COUNTRY":"AU", "LoC":"Townsville", "BALANCE":"7,569", "DATE":"1/07/2018" },
    ]; // REPLACE THIS LINE. TESTING PURPOSE ONLY
    json_data = JSON.parse(JSON.stringify(json_data));
    // REAL DATA WE WANT
    /* TOURNAMENT TABLE
    -> TournamentName
    -> TournamentDate
    -> Result
    */
    json_data.forEach((row) => {
        add_row(row);
    });
}

//this function appends a single json object into the tbody tag with id: table-data
function add_row(object){
    const table = document.getElementById('table-data');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <th>${object.COUNTRY}</th>
        <td>${object.LoC} </td>
        <td>${object.BALANCE}</td>
        <td>${object.DATE}</td>
    ` 

    /* 
    PUT THIS INSTEAD OF ABOVE
    tr.innerHTML = `
        <th>${object.TournamentName}</th>
        <td>${object.TeamName} </td>
        <td>${object.Game}</td>
        <td>${object.Result}</td>
        <td>${object.Date}</td>
    */

    table.appendChild(tr);
}

// SEARCH BAR
const searchFocus = document.getElementById('search-focus');
const keys = [
  { keyCode: 'AltLeft', isTriggered: false },
  { keyCode: 'ControlLeft', isTriggered: false },
];

window.addEventListener('keydown', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = true;
    }
  });

  const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

  if (shortcutTriggered) {
    searchFocus.focus();
  }
});

window.addEventListener('keyup', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = false;
    }
  });
});

$(document).ready( function () {
  $('#esports-table').DataTable({
    "searching": false,
    "bPaginate": false,
    "bFilter": true,
    "bInfo": false, 
  });
  
});