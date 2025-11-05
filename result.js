function loadResults() {
  const data = JSON.parse(localStorage.getItem("finalResults"));
  if (!data) return;

  // Populate team summary table
  const tbody = document.querySelector("#resultsTable tbody");

  const rowA = `<tr>
    <td>Team A</td>
    <td>${data.teamA}</td>
    <td>${data.score.split("-")[0]}</td>
  </tr>`;

  const rowB = `<tr>
    <td>Team B</td>
    <td>${data.teamB}</td>
    <td>${data.score.split("-")[1]}</td>
  </tr>`;

  tbody.innerHTML = rowA + rowB;

  // Winner announcement
  document.getElementById("winnerAnnouncement").textContent =
    `🏆 Winner: ${data.winner} (${data.score})`;

  // Set-by-set breakdown as table
  const setTable = document.getElementById("setTableBody");
  if (data.sets && Array.isArray(data.sets)) {
    data.sets.forEach((set, index) => {
      const row = document.createElement("tr");
      const parts = set.match(/Set (\d+): (\d+) - (\d+) \(Winner: (.+)\)/);
      if (parts) {
        row.innerHTML = `
          <td>${parts[1]}</td>
          <td>${parts[2]} - ${parts[3]}</td>
          <td>${parts[4]}</td>
        `;
      } else {
        row.innerHTML = `<td colspan="3">${set}</td>`;
      }
      setTable.appendChild(row);
    });
  }
}

function goHome() {
  window.location.href = "main.htm";
}

loadResults();