let nsec = document.getElementById("ns");
let nmin = document.getElementById("nm");
let nhrs = document.getElementById("nh");
function func()
{
    var t = new Date();
    nsec.style.visibility= "visible";
    nmin.style.visibility= "visible";
    nhrs.style.visibility= "visible";
    sdeg= t.getSeconds()*6-90;//-90 has been done to convert the horizontal div into vertical div in the starting position(12:00:00 A.M.)
    console.log(nsec);
    nsec.style.transform = `translate(4vw) rotate(${sdeg}deg)`;
    mdeg = t.getMinutes() * 6 -90 +t.getSeconds()*0.1;
    nmin.style.transform =`translate(4vw) rotate(${mdeg}deg)`;
    hrs = t.getHours()*30 -90 +t.getMinutes()*0.5;
    nhrs.style.transform = `translate(3vw) rotate(${hrs}deg)`;
}
setInterval(func,1000);
