 // Bar Chart Function
 function createBarChart(elementId, data) {
    const chart = document.getElementById(elementId);
    chart.innerHTML = "";

    const maxValue = Math.max(...Object.values(data)) * 1.5;
    const barWidth = 50;
    const spacing = 20;
    const chartWidth = Object.keys(data).length * (barWidth + spacing);
    const chartHeight = 300;

    chart.setAttribute("width", chartWidth);
    chart.setAttribute("height", chartHeight + 50);
    chart.setAttribute("viewBox", `0 0 ${chartWidth} ${chartHeight + 50}`);

    // Define gradient
    const defs = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "defs"
    );
    const linearGradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    linearGradient.setAttribute("id", "barGradient");
    linearGradient.setAttribute("x1", "0%");
    linearGradient.setAttribute("y1", "0%");
    linearGradient.setAttribute("x2", "0%");
    linearGradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#04fc43");

    const stop2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#018749");

    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);
    chart.appendChild(defs);

    let xPosition = 20;

    for (const [label, value] of Object.entries(data)) {
      const scaledHeight = value * 2.5;
      const yPosition = chartHeight - scaledHeight;

      // Bar with gradient
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("x", xPosition);
      rect.setAttribute("y", chartHeight);
      rect.setAttribute("width", barWidth);
      rect.setAttribute("height", "0");
      rect.setAttribute("fill", "url(#barGradient)");
      rect.setAttribute("rx", "8");
      rect.setAttribute("stroke", "#0f0");
      rect.setAttribute("stroke-width", "2");
      rect.style.filter = "drop-shadow(0px 0px 8px rgba(0,255,0,0.6))";

      chart.appendChild(rect);

      // Animate bar growth
      setTimeout(() => {
        rect.setAttribute("y", yPosition);
        rect.setAttribute("height", scaledHeight);
      }, 100);

      // Show value on top of bar
      const textValue = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textValue.setAttribute("x", xPosition + barWidth / 2);
      textValue.setAttribute("y", yPosition - 10);
      textValue.setAttribute("text-anchor", "middle");
      textValue.setAttribute("fill", "#fff");
      textValue.setAttribute("font-size", "16");
      textValue.setAttribute("font-weight", "bold");
      textValue.setAttribute("opacity", "0");
      textValue.textContent = value+"%";

      chart.appendChild(textValue);

      // Hover effect
      rect.addEventListener("mouseover", () => {
        rect.setAttribute("fill", "#0f0");
        textValue.setAttribute("opacity", "1");
      });
      rect.addEventListener("mouseout", () => {
        rect.setAttribute("fill", "url(#barGradient)");
        textValue.setAttribute("opacity", "0");
      });

      // Category label below
      const textLabel = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textLabel.setAttribute("x", xPosition + barWidth / 2);
      textLabel.setAttribute("y", chartHeight + 25);
      textLabel.setAttribute("text-anchor", "middle");
      textLabel.setAttribute("fill", "#ddd");
      textLabel.setAttribute("font-size", "14");
      textLabel.textContent = label;

      chart.appendChild(textLabel);

      xPosition += barWidth + spacing;
    }
  }

  const skillData = {
    JS: 90,
    Go: 75,
    Python: 60,
    SQL: 85,
    HTML: 95,
    CSS: 80,
    Unix: 85,
    Docker:15

  };

  createBarChart("chart", skillData)