let analogTime = document.getElementById("time");
let AMOrPM = document.getElementById("meri");
let dateElement = document.getElementById("date");
let digclk = document.getElementById("digop");
let anaclk = document.getElementById("anaop");
let analogClock = document.getElementById("analog-clock");
let secondsNeedle = document.getElementById("ns");
let minutesNeedle = document.getElementById("nm");
let hoursNeedle = document.getElementById("nh");
let analogSetIntervalId; //Stores the id of the setInterval function that calls the function func
analogNumbersRotation();
setDigital();
digitalRadioContainer = document.querySelector(
  ".radio-buttons-container:nth-child(1)"
);
analogRadioContainer = document.querySelector(
  ".radio-buttons-container:nth-child(2)"
);
digitalRadioContainer.addEventListener("click", setDigital);
analogRadioContainer.addEventListener("click", setAnalog);
function analogNumbersRotation() {
  //This function is used to rotate all the numbers in analog clock which was earlier done in CSS one by one
  for (i = 1; i <= 12; i++) {
    document.querySelector(
      `.number:nth-child(${i})`
    ).style.transform = `rotate(${i * 30}deg)`;
    document.querySelector(
      `.number:nth-child(${i}) p`
    ).style.transform = `rotate(-${i * 30}deg)`;
  }
}
function setDigital() {
  digclk.checked = true;
  clearInterval(analogSetIntervalId);
  analogClock.style.display = "none";
  setInterval(setDigitalTime, 100);
}
function setAnalog() {
  anaclk.checked = true;
  clearInterval(analogSetIntervalId); //This is required as without this if the analog option is selected twice, there would be 2 setinterval's running and then if we select digital, only the latest setInterval function will be stopped but the others will keep running.Therefore this command will stop all the previous setinterval's and only the one that would be in the analogSetIntervalId variable would be running.
  analogSetIntervalId = setInterval(setAnalogTime, 100);
}
function setDigitalTime() {
  let meri; //a.m. or p.m.
  let t = " ";
  let currentDateTime = new Date();
  if (currentDateTime.getHours() == 0) {
    t = 12;
    meri = "A.M.";
  } else if (currentDateTime.getHours() > 12) {
    t = t + currentDateTime.getHours() - 12;
    meri = "P.M.";
    if (currentDateTime.getHours() < 22) t = "0" + t;
  } else if (currentDateTime.getHours() == 12) {
    t = t + currentDateTime.getHours();
    meri = "P.M.";
  } else {
    t = currentDateTime.getHours();
    meri = "A.M.";
    if (currentDateTime.getHours() < 10) t = "0" + t;
  }
  if (currentDateTime.getMinutes() < 10)
    t = t + ":0" + currentDateTime.getMinutes();
  else t = t + ":" + currentDateTime.getMinutes();
  if (currentDateTime.getSeconds() < 10)
    t = t + ":0" + currentDateTime.getSeconds();
  else t = t + ":" + currentDateTime.getSeconds() + " ";
  AMOrPM.innerText = meri;
  analogTime.innerText = t;
  setDate(currentDateTime);
  setBackgroundColor(currentDateTime);
}
//Now for analog clock
function setAnalogTime() {
  var currentDateTime = new Date();
  analogClock.style.display = "flex";
  sdeg = currentDateTime.getSeconds() * 6 - 90; //-90 has been done to convert the horizontal div into vertical div in the starting position(12:00:00 A.M.)
  mdeg =
    currentDateTime.getMinutes() * 6 - 90 + currentDateTime.getSeconds() * 0.1;
  hrs =
    currentDateTime.getHours() * 30 - 90 + currentDateTime.getMinutes() * 0.5;
  if (window.innerWidth > 850) {
    secondsNeedle.style.transform = `translate(4vw) rotate(${sdeg}deg)`;
    minutesNeedle.style.transform = `translate(4vw) rotate(${mdeg}deg)`;
    hoursNeedle.style.transform = `translate(3vw) rotate(${hrs}deg)`;
  } else {
    secondsNeedle.style.transform = `translate(34px) rotate(${sdeg}deg)`;
    minutesNeedle.style.transform = `translate(34px) rotate(${mdeg}deg)`;
    hoursNeedle.style.transform = `translate(25.5px) rotate(${hrs}deg)`;
  }
  setDate(currentDateTime);
  setBackgroundColor(currentDateTime);
}
function setDate(currentDateTime) {
  if (currentDateTime.getDate() < 10)
    dateElement.innerText = "0" + currentDateTime.getDate() + "/";
  else dateElement.innerText = currentDateTime.getDate() + "/";
  if (currentDateTime.getMonth() < 9)
    dateElement.innerText += "0" + (currentDateTime.getMonth() + 1) + "/";
  else dateElement.innerText += currentDateTime.getMonth() + 1 + "/";
  dateElement.innerText += currentDateTime.getFullYear();
}
function setBackgroundColor(currentDateTime) {
  let note = document.getElementById("information-note-div");
  let clocks = document.getElementsByClassName("clocks");
  if (currentDateTime.getHours() < 5 || currentDateTime.getHours() >= 21) {
    note.style.color = "rgb(205,205,102)";
    clocks[0].style.backgroundImage =
      "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
    clocks[1].style.backgroundImage =
      "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
    document.body.style.backgroundColor = "rgb(60,60,60)";
    dateElement.style.color = "rgb(250,250,239)";
    document.getElementById("choice").style.color = document.getElementById(
      "color-selection-div"
    ).style.color = "rgb(250,250,239)";
  } else {
    note.style.color = "black";
    clocks[0].style.backgroundImage =
      "linear-gradient(to right,rgb(255, 111, 0),rgb(221, 255, 0))";
    clocks[1].style.backgroundImage =
      "linear-gradient(to right,rgb(255, 111, 0),rgb(221, 255, 0))";
    document.body.style.backgroundColor = "rgb(250,250,255)";
    dateElement.style.color = "black";
    document.getElementById("choice").style.color = document.getElementById(
      "color-selection-div"
    ).style.color = "black";
  }
}
function timeColorChange(value) {
  analogTime.style.color = value;
  AMOrPM.style.color = value;
  for (let i = 0; i < document.getElementsByClassName("number").length; i++) {
    document.getElementsByClassName("number")[i].style.color = value;
  }
  document.querySelector('input[type = "color"]').style.borderColor = value;
}
function changeClockColor(event) {
  timeColorChange(event.target.value);
}
function resetColor() {
  timeColorChange("#000000");
  document.querySelector('input[type = "color"]').value = "#000000";
}
digclk.checked = true;
