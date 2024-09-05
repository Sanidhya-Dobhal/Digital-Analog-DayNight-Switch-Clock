let analogTime = document.getElementById("Time");
let AMOrPM = document.getElementById("meri");
let curr_date = document.getElementById("date");
let digclk = document.getElementById("digop");
let anaclk = document.getElementById("anaop");
let ana_clk_shp = document.getElementById("clk_shp_ana");
let secondsNeedle = document.getElementById("ns");
let minutesNeedle = document.getElementById("nm");
let hoursNeedle = document.getElementById("nh");
let ana_func; //Stores the id of the setInterval function that calls the function func
digclk.checked = true; //Initially digital would be selected
analogNumbersRotation();
setDigital();
windowWidthHandler();
dig_cont = document.getElementById("dig_cont");
ana_cont = document.getElementById("ana_cont");
dig_cont.addEventListener("click", setDigital);
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
  clearInterval(ana_func);
  ana_clk_shp.style.visibility = "hidden";
  secondsNeedle.style.visibility = "hidden";
  minutesNeedle.style.visibility = "hidden";
  hoursNeedle.style.visibility = "hidden";
  setInterval(setDigitalTime, 100);
}
ana_cont.addEventListener("click", setAnalog);
function setAnalog() {
  anaclk.checked = true;
  ana_clk_shp.style.visibility = "visible";
  clearInterval(ana_func); //This is required as without this if the analog option is selected twice the there would be 2 setinterval's runnig and then if we select digital then only the alstest setInterval function will be stopped but the others will keep getting executed .Therefore this command will stop all the previous sstinterval's and inly the one that would be in the ana_func variable would be running .
  ana_func = setInterval(setAnalogTime, 100);
}
window.addEventListener("resize", windowWidthHandler);
function windowWidthHandler() {
  let leftSpace;
  if (window.innerWidth > 850) leftSpace = "40vw";
  else leftSpace = `${(window.innerWidth - 170) / 2}px`;
  document.getElementById("clk_shp_ana").style.left = leftSpace;
  document.getElementById("clk_shp_dig").style.left = leftSpace;
}
function setDigitalTime() {
  let meri; //a.m. or p.m.
  let t = " ";
  let curr_time = new Date();
  if (curr_time.getHours() == 0) {
    //12A.M.
    t = 12;
    meri = "A.M.";
    let note = document.getElementById("information-note-div");
    note.style.color = "rgb(205,205,102)";
    let back = document.getElementById("clk_shp_dig");
    back.style.backgroundImage =
      "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
    document.body.style.backgroundColor = "rgb(75,75,75)";
    curr_date.style.color = "rgb(250,250,239)";
  } else if (curr_time.getHours() > 12) {
    //1P.M to 11P.M
    t = t + curr_time.getHours() - 12;
    meri = "P.M.";
    if (curr_time.getHours() >= 21) {
      let note = document.getElementById("information-note-div");
      note.style.color = "rgb(205,205,102)";
      let back = document.getElementById("clk_shp_dig");
      back.style.backgroundImage =
        "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
      document.body.style.backgroundColor = "rgb(75,75,75)";
      curr_date.style.color = "rgb(250,250,239)";
    }
    if (curr_time.getHours() < 22) t = "0" + t;
  } else if (curr_time.getHours() == 12) {
    //12P.M.
    t = t + curr_time.getHours();
    meri = "P.M.";
  } //1A.M. to 11A.m.
  else {
    t = curr_time.getHours();
    meri = "A.M.";
    if (curr_time.getHours() < 10) t = "0" + t;
  }
  if (curr_time.getMinutes() < 10) t = t + ":0" + curr_time.getMinutes();
  else t = t + ":" + curr_time.getMinutes();
  if (curr_time.getSeconds() < 10) t = t + ":0" + curr_time.getSeconds();
  else t = t + ":" + curr_time.getSeconds() + " ";
  AMOrPM.innerText = meri;
  analogTime.innerText = t;
  setDate(curr_time);
  setBackgroundColor(curr_time);
}
//Now for analog clock
function setAnalogTime() {
  var curr_time = new Date();
  secondsNeedle.style.visibility = "visible";
  minutesNeedle.style.visibility = "visible";
  hoursNeedle.style.visibility = "visible";
  sdeg = curr_time.getSeconds() * 6 - 90; //-90 has been done to convert the horizontal div into vertical div in the starting position(12:00:00 A.M.)
  mdeg = curr_time.getMinutes() * 6 - 90 + curr_time.getSeconds() * 0.1;
  hrs = curr_time.getHours() * 30 - 90 + curr_time.getMinutes() * 0.5;
  if (window.innerWidth > 850) {
    secondsNeedle.style.transform = `translate(4vw) rotate(${sdeg}deg)`;
    minutesNeedle.style.transform = `translate(4vw) rotate(${mdeg}deg)`;
    hoursNeedle.style.transform = `translate(3vw) rotate(${hrs}deg)`;
  } else {
    secondsNeedle.style.transform = `translate(34px) rotate(${sdeg}deg)`;
    minutesNeedle.style.transform = `translate(34px) rotate(${mdeg}deg)`;
    hoursNeedle.style.transform = `translate(25.5px) rotate(${hrs}deg)`;
  }
  setDate(curr_time);
  setBackgroundColor(curr_time);
}
function setDate(curr_time) {
  if (curr_time.getDate() < 10)
    curr_date.innerText = "0" + curr_time.getDate() + "/";
  else curr_date.innerText = curr_time.getDate() + "/";
  if (curr_time.getMonth() < 9)
    curr_date.innerText += "0" + (curr_time.getMonth() + 1) + "/";
  else curr_date.innerText += curr_time.getMonth() + 1 + "/";
  curr_date.innerText += curr_time.getFullYear();
}
function setBackgroundColor(curr_time) {
  let note = document.getElementById("information-note-div");
  if (curr_time.getHours() < 5 || curr_time.getHours() >= 21) {
    note.style.color = "rgb(205,205,102)";
    let back = document.getElementsByClassName("clk_shp");
    back[0].style.backgroundImage =
      "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
    back[1].style.backgroundImage =
      "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
    document.body.style.backgroundColor = "rgb(60,60,60)";
    curr_date.style.color = "rgb(250,250,239)";
    document.getElementById("choice").style.color = document.getElementById(
      "color-selection-div"
    ).style.color = "rgb(250,250,239)";
  } else {
    note.style.color = "black";
    let back = document.getElementsByClassName("clk_shp");
    back[0].style.backgroundImage =
      "linear-gradient(to right,rgb(255, 111, 0),rgb(221, 255, 0))";
    back[1].style.backgroundImage =
      "linear-gradient(to right,rgb(255, 111, 0),rgb(221, 255, 0))";
    document.body.style.backgroundColor = "rgb(250,250,255)";
    curr_date.style.color = "black";
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
function clockColor(event) {
  timeColorChange(event.target.value);
}
function resetColor() {
  timeColorChange("#000000");
  document.querySelector('input[type = "color"]').value = "#000000";
}
