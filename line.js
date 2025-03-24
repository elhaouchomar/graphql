


function formatFileSize(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const unitIndex = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, unitIndex), 2) + ' ' + units[unitIndex];
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  function getDaysSinceEpoch(timestamp) {
    return Math.floor(timestamp / (24 * 60 * 60));
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function drawLine(svg, x1, y1, x2, y2, color, width) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", width);
    svg.appendChild(line);
  }

  function drawCircle(svg, radius, cx, cy, fill, strokeWidth, strokeColor) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", radius);
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("fill", fill);
    circle.setAttribute("stroke-width", strokeWidth);
    circle.setAttribute("stroke", strokeColor);
    svg.appendChild(circle);
    return circle;
  }

  async function generateLineGraph(dataPoints, totalXP, userLevel) {
    
    const svg = document.getElementById("lineGraph");
    svg.innerHTML = '';

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("id", "xpLabel");
    label.setAttribute("x", "20");
    label.setAttribute("y", "50");
    label.setAttribute("fill", "white");
    svg.appendChild(label);

    document.getElementById("level").textContent = "Level " + userLevel;
    document.getElementById("xp").textContent = formatFileSize(totalXP);
    dataPoints.sort((a, b) => a[2] - b[2]);

    const firstDay = dataPoints[0][2];
    const lastDay = dataPoints[dataPoints.length - 1][2];
    const daysRange = getDaysSinceEpoch(lastDay) - getDaysSinceEpoch(firstDay);

    const graphBounds = svg.getBoundingClientRect();
    const origin = [10, graphBounds.height - 10];
    const graphWidth = graphBounds.width - 20;
    const graphHeight = graphBounds.height - 60;

    let cumulativeXP = 0;
    let previousPoint = [...origin];

    for (let i = 0; i < dataPoints.length; i++) {
      const [labelText, xpEarned, timestamp] = dataPoints[i];
      cumulativeXP += xpEarned;

      label.textContent = `${labelText} +${formatFileSize(xpEarned)}`;
      await delay(50);

      const dayOffset = getDaysSinceEpoch(timestamp) - getDaysSinceEpoch(firstDay);
      const yPos = Math.floor((cumulativeXP * graphHeight) / totalXP);
      const xPos = Math.floor((dayOffset * graphWidth) / daysRange);
      
      const node = drawCircle(svg, 3, origin[0] + xPos, origin[1] - yPos, "#ff2972", "1", "#ff2972");
      node.dataset.xp = formatFileSize(xpEarned);
      node.onmouseover = () => {
        node.setAttribute("fill", "#ff2972");
        label.textContent = `${labelText} +${node.dataset.xp}  ${formatDate(timestamp)}`;
      };
      node.onmouseout = () => {
        node.setAttribute("fill", "#ff2972");
      };

      if (i > 0) {
        const lineX1 = (xpEarned >= 5000) ? 1 : 2;
        const lineX2 = (xpEarned >= 5000) ? 2 : 1;
        drawLine(svg, previousPoint[0], previousPoint[1], origin[0] + xPos, previousPoint[1], "#ff2972", 2);
        drawLine(svg, origin[0] + xPos, previousPoint[1], origin[0] + xPos, origin[1] - yPos, "#ff2972", 2);
      }

      previousPoint = [origin[0] + xPos, origin[1] - yPos];
    }
  }

  const sampleData = [
  ["project—make-your-game-history", 49000, 1620604800],
  ["project—make-your-game-score-handling", 49000, 1620691200],
  ["project—groupie-tracker-search-bar", 12300, 1620777600],
  ["project—make-your-game", 147000, 1620864000],
  ["project—forum", 76300, 1620950400],
  ["project—guess-it-1", 5000, 1621900800],
  ["project—net-cat", 12300, 1621814400],
  ["project—linear-stats", 10000, 1621728000],
  ["project—ascii-art-reverse", 6130, 1621641600],
  ["project—groupie-tracker-visualizations", 12300, 1621555200],
  ["project—lem-in", 34400, 1621468800],
  ["piscine—Piscine JS", 70000, 1621382400],
  ["project—groupie-tracker-filters", 12300, 1621296000],
  ["project—guess-it-2", 5000, 1621209600],
  ["project—push-swap", 18400, 1621123200],
  ["project—groupie-tracker-geolocalization", 12300, 1621036800],
  ["project—groupie-tracker", 24500, 1622851200],
  ["project—math-skills", 10000, 1622419200],
  ["project—groupie-tracker", 24500, 1622851200],
  ["project—ascii-art-web-export-file", 9200, 1623110400],
  ["project—ascii-art-web-stylize", 9200, 1623196800],
  ["project—ascii-art-web-dockerize", 9200, 1623283200],
  ["project—ascii-art-web", 9200, 1623369600],
  ["project—ascii-art-justify", 6130, 1623456000],
  ["project—ascii-art-output", 6130, 1623542400],
  ["project—ascii-art-color", 6130, 1623628800],
  ["project—ascii-art-fs", 6130, 1623715200],
  ["project—ascii-art", 6130, 1623801600],
  ["project—go-reloaded", 5000, 1623888000]
];



  const totalXP = sampleData.reduce((total, project) => total + project[1], 0);

  generateLineGraph(sampleData, totalXP, 5);