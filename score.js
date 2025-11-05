function selectMatch(type) {
  // Save match type so scoreboard can read it
  localStorage.setItem("matchType", type);

  // Redirect to scoreboard page
  window.location.href = "score.htm";
}