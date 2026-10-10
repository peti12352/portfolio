(function () {
  const el = document.getElementById("gh-graph");
  if (!el) return;
  const user = el.dataset.user || "peti12352";

  fetch("https://github-contributions-api.jogruber.de/v4/" + user + "?y=last")
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      const rows = data.contributions || [];
      if (!rows.length) return;

      const weeks = [];
      let week = [];
      rows.forEach(function (day, i) {
        week.push(day);
        if (week.length === 7 || i === rows.length - 1) {
          weeks.push(week);
          week = [];
        }
      });

      const grid = document.createElement("div");
      grid.className = "gh-grid";
      grid.setAttribute("role", "img");
      grid.setAttribute(
        "aria-label",
        "GitHub contribution calendar for " + user
      );

      weeks.forEach(function (w) {
        w.forEach(function (day) {
          const cell = document.createElement("span");
          cell.className = "gh-day l" + (day.level || 0);
          cell.title = (day.date || "") + ": " + (day.count || 0) + " contributions";
          grid.appendChild(cell);
        });
      });

      el.appendChild(grid);
    })
    .catch(function () {
      el.innerHTML =
        '<a href="https://github.com/' +
        user +
        '">github.com/' +
        user +
        "</a>";
    });
})();
