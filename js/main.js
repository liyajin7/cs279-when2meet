// Database for adding own availability
let leftCells = [];

// Display parameters
var xpos = 51;
var ypos = 20;
var width = 50;
var height = 10;

let id = 1;

// Populate left cell database
for (let i = 0; i < 4; i++) {
  leftCells.push([]);
  for (let j = 0; j < 5; j++) {
    leftCells[i].push({
      id: id,
      available: false,
      x: xpos,
      y: ypos,
      i: i,
      j: j,
    });
    id++;
    xpos += width;
  }
  // reset the x position after a row is complete
  xpos = 51;
  // increment the y position for the next row. Move it down 50 (height variable)
  ypos += height;
}

// Dates data
let dates = [
  { day: "Mon", x: 51, y: 15 },
  { day: "Tues", x: 101, y: 15 },
  { day: "Wed", x: 151, y: 15 },
  { day: "Thurs", x: 201, y: 15 },
  { day: "Fri", x: 251, y: 15 },
];

// Hard-coded database for seeing others' availability (in this case, only Elena's heh)
let rightCells = [
  // 12:00
  [
    {
      id: 1,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 51,
      y: 20,
      i: 0,
      j: 0,
    },
    {
      id: 2,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 101,
      y: 20,
      i: 0,
      j: 1,
    },
    {
      id: 3,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 151,
      y: 20,
      i: 0,
      j: 2,
    },
    {
      id: 4,
      numAvailable: 0,
      pplAvailable: [],
      x: 201,
      y: 20,
      i: 0,
      j: 3,
    },
    {
      id: 5,
      numAvailable: 0,
      pplAvailable: [],
      x: 251,
      y: 20,
      i: 0,
      j: 4,
    },
  ],
  // 12:15
  [
    {
      id: 6,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 51,
      y: 30,
      i: 1,
      j: 0,
    },
    {
      id: 7,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 101,
      y: 30,
      i: 1,
      j: 1,
    },
    {
      id: 8,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 151,
      y: 30,
      i: 1,
      j: 2,
    },
    {
      id: 9,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 201,
      y: 30,
      i: 1,
      j: 3,
    },
    {
      id: 10,
      numAvailable: 0,
      pplAvailable: [],
      x: 251,
      y: 30,
      i: 1,
      j: 4,
    },
  ],
  // 12:30
  [
    {
      id: 11,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 51,
      y: 40,
      i: 2,
      j: 0,
    },
    {
      id: 12,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 101,
      y: 40,
      i: 2,
      j: 1,
    },
    {
      id: 13,
      numAvailable: 0,
      pplAvailable: [],
      x: 151,
      y: 40,
      i: 2,
      j: 2,
    },
    {
      id: 14,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 201,
      y: 40,
      i: 2,
      j: 3,
    },
    {
      id: 15,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 251,
      y: 40,
      i: 2,
      j: 4,
    },
  ],
  // 12:45
  [
    {
      id: 16,
      numAvailable: 0,
      pplAvailable: [],
      x: 51,
      y: 50,
      i: 3,
      j: 0,
    },
    {
      id: 17,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 101,
      y: 50,
      i: 3,
      j: 1,
    },
    {
      id: 18,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 151,
      y: 50,
      i: 3,
      j: 2,
    },
    {
      id: 19,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 201,
      y: 50,
      i: 3,
      j: 3,
    },
    {
      id: 20,
      numAvailable: 1,
      pplAvailable: ["Elena"],
      x: 251,
      y: 50,
      i: 3,
      j: 4,
    },
  ],
];

// Global state of the system: 1 of available, unavailable, and do nothing
let systemState = "do nothing";

// Variable for all rightGrid HTML elements
const right = document.getElementsByClassName("rightGrid");

// Render grids
renderLeftGrid();
renderRightGrid();

// Function for rendering left grid
function renderLeftGrid() {

    // Make left side grid
    // Make SVG canvas
    let leftGrid = d3
        .select("#leftGrid")
        .append("svg")
        .attr("width", 310)
        .attr("height", 65);

    // Make rows
    let leftRow = leftGrid
        .selectAll(".gridRow")
        .data(leftCells)
        .enter()
        .append("g")
        .attr("class", "gridRow");
    
    // Make columns
    let leftColumn = leftRow
        .selectAll(".leftCell")
        .data((d) => d)
        .enter()
        .append("rect")
        .attr("class", "leftCell")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("width", 50)
        .attr("height", 10)
        .on("mousedown", function (i, d) {
            // Update global state using state of current cell
            leftCells[d.i][d.j].available = !leftCells[d.i][d.j].available;
            systemState = leftCells[d.i][d.j].available ? "available" : "unavailable";
            
            // Update fill of cell based on current state
            if (systemState === "available") {
                d3.select(this).style("fill", "#339900");
            } else {
                d3.select(this).style("fill", "#FFF");
            }
        })
        .on("mouseover", function (i, d) {
            // Update cell using global state
            if (systemState === "available") {
                d3.select(this).style("fill", "#339900");
                leftCells[d.i][d.j].available = true;
            } else if (systemState === "unavailable") {
                d3.select(this).style("fill", "#FFF");
                leftCells[d.i][d.j].available = false;
            }
        })
        .on("mouseup", function (i, d) {
            // Reset global state to do nothing
            systemState = "do nothing";
            // Compare leftCells with rightCells
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 5; j++) {
                    // if left available, already in right, stay
                    // if left unavailable, not in right, stay
            
                    // if left available not in right UPDATE!!
                    if (leftCells[i][j].available == true && (rightCells[i][j].pplAvailable.indexOf("Me") == -1)) {
                        rightCells[i][j].pplAvailable.push("Me");
                        rightCells[i][j].numAvailable++;
                    }
                    // if left unavailable, already in right UPDATE!!!
                    else if (leftCells[i][j].available == false && (rightCells[i][j].pplAvailable.indexOf("Me") != -1)) {
                        rightCells[i][j].pplAvailable.pop();
                        rightCells[i][j].numAvailable -= 1;
                    }
                }
            }
            
            // Re-fill right cells based on new left cell availability
            d3.selectAll(".rightCell").style("fill", function (d) {
                // Determine if user has entered any availability
                meAvailable = false;
                for (i = 0; i < 4; i++) {
                    for (j = 0; j < 5; j++) {
                        if (leftCells[i][j].available == true) {
                            meAvailable = true;
                        }
                    }
                }
                
                // Color choices based on if user has entered availability
                if (!meAvailable) {
                    switch (d.numAvailable) {
                        case 1: return "#52962A";
                        case 0: return "#FFFFFF"
                    }
                }
                else {
                    switch (d.numAvailable) {
                        case 2: return "#52962A";
                        case 1: return "#A4CA88";
                        case 0: return "#FFFFFF"
                    }
                }
    
            })

    
        })
        .style("fill", function (d) {
            if (d.available === true) {
                return "#339900";
            } else {
                return "#FFF";
            }
        })
        .style("stroke", "#222");

    // Add dates to left SVG
    leftGrid
        .selectAll(".dates")
        .data(dates)
        .enter()
        .append("text")
        .text((d) => d.day)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);

    // Add times to left SVG
    let timeCol = leftGrid.selectAll(".time").data(dates).enter();

    timeCol
        .append("text")
        .text("12:00 PM")
        .attr("x", 1)
        .attr("y", 25)
        .attr("class", "time")
        .style("font-size", "11")
        .style("font-weight", "300");

    timeCol
        .append("text")
        .text("1:00 PM")
        .attr("x", 7)
        .attr("y", 65)
        .attr("class", "time")
        .style("font-size", "11")
        .style("font-weight", "300");
}

// Function for rendering the right grid
function renderRightGrid() {
    
    // Make right side grid
    // Make SVG canvas
    let rightGrid = d3
        .select("#rightGrid")
        .append("svg")
        .attr("width", 310)
        .attr("height", 65);

    // Make rows
    let rightRow = rightGrid
        .selectAll(".gridRow")
        .data(rightCells)
        .enter()
        .append("g")
        .attr("class", "gridRow");

    // Make columns
    let rightColumn = rightRow
        .selectAll(".rightCell")
        .data((d) => d)
        .enter()
        .append("rect")
        .attr("class", "rightCell")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("width", 50)
        .attr("height", 10)
        
        // When hovering over a cell on right table, display peoples' specific availabilities on the left
        .on("mouseover", function (i, d) {
            const leftG = document.getElementById("leftGrid");
            const leftO = document.getElementById("leftOverlay");
            const lOverlayAvail = document.getElementById("leftOverlay-avail");
            const lOverlayUnavail = document.getElementById("leftOverlay-unavail");
            
            // Remove existig left display, overlay name-specific availability cols
            leftG.style.display = 'none';
            leftO.style.display = 'block';
            lOverlayUnavail.style.display = 'block';
            lOverlayAvail.style.display = 'block';
        
            availcol = document.getElementById("leftOverlay-avail");
            unavailcol = document.getElementById("leftOverlay-unavail");
        
            // Add available people to "Available" column in overlay
            for (i = 0; i < d.pplAvailable.length; i++) {
                availcol.textContent += "\r\n" + d.pplAvailable[i];
            }

            // Add available people to "Non-available" column in overlay (could definitely make more efficient in future iterations!)
            if (!(d.pplAvailable.includes("Elena"))) {
                unavailcol.textContent += "\r\nElena";
            }
            if (!(d.pplAvailable.includes("Me"))) {
                unavailcol.textContent += "\r\nMe";
            }

        })
        
        // When no longer hovering over right cells, reset to previous visual defaults
        .on("mouseout", function (d, i) {
            console.log(d, i);
            const leftG = document.getElementById("leftGrid");
            const leftO = document.getElementById("leftOverlay");
            const lOverlayAvail = document.getElementById("leftOverlay-avail");
            const lOverlayUnavail = document.getElementById("leftOverlay-unavail");

            leftG.style.display = 'block';
            leftO.style.display = 'none';
            lOverlayUnavail.style.display = 'none';
            lOverlayAvail.style.display = 'none';

            availcol = document.getElementById("leftOverlay-avail");
            unavailcol = document.getElementById("leftOverlay-unavail");

            availcol.textContent = "Available:";
            unavailcol.textContent = "Unavailable:";
        })

        // Color right cells' availabilities appropriately
        .style("fill", function (d) {
            // Check whether's "Me" has inputted any availability
            meAvailable = false;
            for (i = 0; i < 4; i++) {
                for (j = 0; j < 5; j++) {
                    if (leftCells[i][j].available == true) {
                        meAvailable = true;
                    }
                }
            }
            
            // If "Me" has no availability, only use 2 colors in right cells, else 3
            if (!meAvailable) {
                switch (d.numAvailable) {
                    case 1: return "#52962A";
                    case 0: return "#FFFFFF"
                }
            }
            else {
                switch (d.numAvailable) {
                    case 2: return "#52962A";
                    case 1: return "#A4CA88";
                    case 0: return "#FFFFFF"
                }
            }
        })
        .style("stroke", "#222");
  
    // Add dates to right SVG
    rightGrid
        .selectAll(".dates")
        .data(dates)
        .enter()
        .append("text")
        .text((d) => d.day)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);

    // Add times to right SVG
    let rightTimeCol = rightGrid.selectAll(".time").data(dates).enter();

    rightTimeCol
        .append("text")
        .text("12:00 PM")
        .attr("x", 1)
        .attr("y", 25)
        .attr("class", "time")
        .style("font-size", "11")
        .style("font-weight", "300");

    rightTimeCol
        .append("text")
        .text("1:00 PM")
        .attr("x", 7)
        .attr("y", 65)
        .attr("class", "time")
        .style("font-size", "11")
        .style("font-weight", "300");
}