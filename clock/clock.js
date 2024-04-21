// Create constants for page elements
const clock = document.getElementById('clock');
const clockDiv = document.getElementById('clock-div');
const textOutput = document.getElementById('text-div');

// Define the center coordinates of the clock
const centerX = 150; // X coordinate of the center
const centerY = 150; // Y coordinate of the center

// Define the radius of the clock
const radius = 100; // Radius of the clock

// Define the length to extend the lines beyond the edge of the clock face
const extensionLength = 5; // Adjust as needed

// List for 5 second intervals and numbers
const fiveSecondIntervals = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const clockNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// Loop to create the 60 notches around the clock
for (let i = 0; i < 60; i++) {
    // Calculate the angle for each line
    const angle = (i * 6) % 360; // Each minute corresponds to 6 degrees

    // Convert angle to radians for trigonometric functions
    const radians = angle * Math.PI / 180;

    // Calculate the endpoint coordinates based on angle and radius
    const endX = centerX + radius * Math.cos(radians);
    const endY = centerY + radius * Math.sin(radians);

    // Calculate the starting point coordinates (near the end of the clock face)
    const startX = centerX + (radius - extensionLength) * Math.cos(radians);
    const startY = centerY + (radius - extensionLength) * Math.sin(radians);

    // Create and set attributes for the line and number
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    // Adjust the index to ensure it wraps around the clockNumbers array
    const index = (Math.floor(i / 5) + 3) % 12; // Shift the index to start from 12 o'clock

    if (fiveSecondIntervals.includes(i)) {
        // Adjust starting point to create a longer line
        const startX = centerX + (radius - extensionLength - 3) * Math.cos(radians);
        const startY = centerY + (radius - extensionLength - 3) * Math.sin(radians);
        line.setAttribute("x1", startX); // Start near the end
        line.setAttribute("y1", startY); // Start near the end

        // Set attributes for number
        const textX = centerX + (radius - extensionLength - 15) * Math.cos(radians);
        const textY = centerY + (radius - extensionLength - 15) * Math.sin(radians);
        text.setAttribute("x", textX);
        text.setAttribute("y", textY);
        text.setAttribute("fill", "black");
        text.setAttribute("font-size", "18");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-family", "sans-serif");
        text.textContent = clockNumbers[index];
    } else {
        line.setAttribute("x1", startX); // Start near the end
        line.setAttribute("y1", startY); // Start near the end
    }
    line.setAttribute("x2", endX); // End at the endpoint
    line.setAttribute("y2", endY); // End at the endpoint
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "2");

    // Append the line to the SVG container
    clock.appendChild(line);
    clock.appendChild(text);
}

// Create minute hand
const minuteHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
minuteHand.setAttribute("x1", "150");
minuteHand.setAttribute("y1", "60");
minuteHand.setAttribute("x2", "150");
minuteHand.setAttribute("y2", "150");
minuteHand.setAttribute("stroke", "black");
minuteHand.setAttribute("stroke-width", "6");
minuteHand.setAttribute("stroke-linecap", "round");
clock.appendChild(minuteHand);

// Create hour hand
const hourHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
hourHand.setAttribute("x1", "150");
hourHand.setAttribute("y1", "90");
hourHand.setAttribute("x2", "150");
hourHand.setAttribute("y2", "150");
hourHand.setAttribute("stroke", "black");
hourHand.setAttribute("stroke-width", "6");
hourHand.setAttribute("stroke-linecap", "round");
clock.appendChild(hourHand);

// Create second hand
const secondHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
secondHand.setAttribute("x1", "150");
secondHand.setAttribute("y1", "60");
secondHand.setAttribute("x2", "150");
secondHand.setAttribute("y2", "150");
secondHand.setAttribute("stroke", "orange");
secondHand.setAttribute("stroke-width", "2");
secondHand.setAttribute("stroke-linecap", "round");
clock.appendChild(secondHand);

// Animate the clock hands
// Define the axis point
let axisX = 150;
let axisY = 150;

// Function to rotate hands
function rotateHands() {
    // Get current time
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    // Set angles for each hand
    console.log(time.getMilliseconds());
    const secondHandAngle = seconds * 6;
    const minuteHandAngle = minutes * 6;

    const hourHandMinuteAngle = (minutes / 60) * 30; // 30 degrees per hour, divided by 60 minutes
    const hourHandBaseAngle = (hours % 12) * 30;
    const hourHandAngle = hourHandMinuteAngle + hourHandBaseAngle;

    // Apply the rotation transform to the line
    secondHand.setAttribute('transform', `rotate(${secondHandAngle} ${axisX} ${axisY})`);
    minuteHand.setAttribute('transform', `rotate(${minuteHandAngle} ${axisX} ${axisY})`);
    hourHand.setAttribute('transform', `rotate(${hourHandAngle} ${axisX} ${axisY})`);

    // Update text paragraph
    let minuteText = minutes;
    if (minutes < 30) {
        textOutput.innerText = `${minuteText} minutes past ${hours % 12}`;
    } else if (minutes > 30) {
        minuteText = 60 - minutes;
        textOutput.innerText = `${minuteText} minutes to ${hours % 12 + 1}`;
    } else if (minutes == 30) {
        textOutput.innerText = `Half past ${hours % 12}`;
    } else if (minutes == 15) {
        textOutput.innerText = `Quarter past ${hours % 12}`;
    } else if (minutes == 45) {
        textOutput.innerText = `Quarter to ${hours % 12 + 1}`;
    } else if (minutes == 0) {
        textOutput.innerText = `${hours} O'Clock`
    }
    

    // Request next animation frame
    requestAnimationFrame(rotateHands);
}

requestAnimationFrame(rotateHands);



