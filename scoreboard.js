let scores = { A: 0, B: 0 };
let currentSet = 1;
let setHistory = [];
let setsWon = { A: 0, B: 0 };
const maxSets = 3; // best of 3 (first to 2 wins)

// Load match type from localStorage
const matchType = localStorage.getItem("matchType") || "singles";
document.getElementById("matchTypeLabel").textContent =
  "Match Type: " + matchType.toUpperCase();

// Dynamically create player inputs
function setupPlayers() {
  let playersA = document.getElementById("playersA");
  let playersB = document.getElementById("playersB");

  let count = matchType === "singles" ? 1 : 2;

  for (let i = 0; i < count; i++) {
    let inputA = document.createElement("input");
    inputA.type = "text";
    inputA.placeholder = matchType === "mixed" && i === 0 ? "Player A (M)" :
                         matchType === "mixed" && i === 1 ? "Player A (F)" :
                         `Player A${count > 1 ? i+1 : ""}`;
    inputA.className = "team-name";
    playersA.appendChild(inputA);

    let inputB = document.createElement("input");
    inputB.type = "text";
    inputB.placeholder = matchType === "mixed" && i === 0 ? "Player B (M)" :
                         matchType === "mixed" && i === 1 ? "Player B (F)" :
                         `Player B${count > 1 ? i+1 : ""}`;
    inputB.className = "team-name";
    playersB.appendChild(inputB);
  }
}

setupPlayers();

function updateScore(team, points) {
  if (setsWon.A === 2 || setsWon.B === 2) return;

  scores[team] += points;
  if (scores[team] < 0) scores[team] = 0;
  document.querySelector(`#team${team} .score`).textContent = scores[team];
  checkSetWinner();
}

function checkSetWinner() {
  if (scores.A >= 21 && scores.A - scores.B >= 2) {
    recordSet("A");
  } else if (scores.B >= 21 && scores.B - scores.A >= 2) {
    recordSet("B");
  }
}

function recordSet(winner) {
  // Get player names
  let teamAPlayers = [...document.querySelectorAll("#playersA input")]
    .map(inp => inp.value || inp.placeholder).join(" & ");
  let teamBPlayers = [...document.querySelectorAll("#playersB input")]
    .map(inp => inp.value || inp.placeholder).join(" & ");
  let winnerName = (winner === "A") ? teamAPlayers : teamBPlayers;

  // Record set result
  let setResult = `Set ${currentSet}: ${scores.A} - ${scores.B} (Winner: ${winnerName})`;
  setHistory.push(setResult);

  let li = document.createElement("li");
  li.textContent = setResult;
  document.getElementById("setHistory").appendChild(li);

  // Track sets won
  setsWon[winner]++;

  // Check if match is over
  if (setsWon[winner] === 2) {
    document.getElementById("setStatus").textContent =
      `🏆 Match Over! ${winnerName} wins ${setsWon.A}-${setsWon.B}`;

    // Save final results
    localStorage.setItem("finalResults", JSON.stringify({
      teamA: teamAPlayers,
      teamB: teamBPlayers,
      sets: [...setHistory],
      winner: winnerName,
      score: `${setsWon.A}-${setsWon.B}`
    }));

    // Redirect to results page
    window.location.href = "result.htm";
  } else if (currentSet < maxSets) {
    resetSet();
  } else {
    document.getElementById("setStatus").textContent =
      `🏆 Match Over! Final Score: ${setsWon.A}-${setsWon.B}`;
  }
}

function resetSet() {
  scores = { A: 0, B: 0 };
  document.querySelector("#teamA .score").textContent = 0;
  document.querySelector("#teamB .score").textContent = 0;
  currentSet++;
  document.getElementById("setStatus").textContent = "Set: " + currentSet;
}

function goBack() {
  window.location.href = "main.htm";
}