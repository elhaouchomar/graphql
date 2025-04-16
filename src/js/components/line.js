function formatFileSize(bytes) {
  return `${(bytes / 1000).toFixed(0)} KB`;
}

function getDaysSinceEpoch(timestamp) {
  return Math.floor(timestamp / (24 * 60 * 60));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("r", radius);
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("fill", fill);
  circle.setAttribute("stroke-width", strokeWidth);
  circle.setAttribute("stroke", strokeColor);
  svg.appendChild(circle);
  return circle;
}

function formatDateToDDMMYYYY(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function makeSvgResponsive(svg) {
  const width = svg.clientWidth || 800;
  const height = svg.clientHeight || 400;
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
}

function createLabel(svg) {
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("id", "xpLabel");
  label.setAttribute("x", "20");
  label.setAttribute("y", "50");
  label.setAttribute("fill", "white");
  label.setAttribute("font-size", "14");
  label.setAttribute("font-family", "Arial, sans-serif");
  svg.appendChild(label);
  return label;
}

function updateLevelAndXP(userLevel, totalXP) {
  document.getElementById("level").textContent = "Level " + userLevel;
  document.getElementById("xp").textContent = formatFileSize(totalXP);
}

export async function generateLineGraph(dataPoints, totalXP, userLevel) {
  const svg = document.getElementById("lineGraph");
  svg.innerHTML = "";
  makeSvgResponsive(svg);

  const label = createLabel(svg);
  updateLevelAndXP(userLevel, totalXP);

  dataPoints.sort((a, b) => a[2] - b[2]);

  const firstDay = dataPoints[0][2];
  const lastDay = dataPoints[dataPoints.length - 1][2];
  const daysRange = getDaysSinceEpoch(lastDay) - getDaysSinceEpoch(firstDay);

  const graphBounds = svg.getBoundingClientRect();
  const origin = [10, graphBounds.height - 10];
  const graphWidth = graphBounds.width - 20;
  const graphHeight = graphBounds.height - 150;

  let cumulativeXP = 0;
  let previousPoint = [...origin];

  for (let i = 0; i < dataPoints.length; i++) {
    const [labelText, xpEarned, timestamp] = dataPoints[i];
    cumulativeXP += xpEarned;

    label.textContent = `${labelText} +${formatFileSize(xpEarned)}`;
    await delay(50);

    const dayOffset =
      getDaysSinceEpoch(timestamp) - getDaysSinceEpoch(firstDay);
    const yPos = Math.floor((cumulativeXP * graphHeight) / totalXP);
    const xPos = Math.floor((dayOffset * graphWidth) / daysRange);

    const circleColor = "#ff2972";
    const circleRadius = 4;
    const circleStrokeWidth = "1";

    const node = drawCircle(
      svg,
      circleRadius,
      origin[0] + xPos,
      origin[1] - yPos,
      circleColor,
      circleStrokeWidth,
      circleColor
    );
    node.dataset.xp = formatFileSize(xpEarned);

    node.onmouseover = () => {
      const hoverColor = "#ff6f91";
      node.setAttribute("fill", hoverColor);
      node.setAttribute("stroke", circleColor);
      node.setAttribute("stroke-width", 4);
      label.textContent = `${labelText} +${
        node.dataset.xp
      }  ${formatDateToDDMMYYYY(timestamp)}`;
    };

    node.onmouseout = () => {
      node.setAttribute("fill", circleColor);
      node.setAttribute("stroke-width", 1);
    };

    if (i > 0) {
      const lineColor = "#ff2972";
      const lineWidth = 1.5;
      drawLine(
        svg,
        previousPoint[0],
        previousPoint[1],
        origin[0] + xPos,
        previousPoint[1],
        lineColor,
        lineWidth
      );
      drawLine(
        svg,
        origin[0] + xPos,
        previousPoint[1],
        origin[0] + xPos,
        origin[1] - yPos,
        lineColor,
        lineWidth
      );
    }

    previousPoint = [origin[0] + xPos, origin[1] - yPos];
  }
}
