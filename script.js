let disp = document.getElementById("Time");
let apm= document.getElementById("meri");
let curr_date = document.getElementById("date");
let digclk = document.getElementById("digop");
let anaclk = document.getElementById("anaop");
let ana_clk_shp = document.getElementById("clk_shp_ana");
let nsec = document.getElementById("ns");
let nmin = document.getElementById("nm");
let nhrs = document.getElementById("nh");
let ana_func = setInterval(func,100);
digclk.checked = true;//Initially digital is selected
digcheck();
digclk.addEventListener("click",digcheck);
function digcheck()
{
    if(digclk.checked == true){
    clearInterval(ana_func);
    ana_clk_shp.style.visibility = "hidden";
    nsec.style.visibility="hidden";
    nmin.style.visibility="hidden";
    nhrs.style.visibility="hidden";
    setInterval(current_time,100);
    
    }
}
anaclk.addEventListener("click",anacheck);
function anacheck()
{
    if(anaclk.checked == true){
    ana_clk_shp.style.visibility = "visible";
    ana_func = setInterval(func,100);
    }
}
        function current_time()
        {
            if(window.innerWidth>850){
                document.getElementById("clk_shp_ana").style.left =`40vw`;//This can be improved by adding event listener
                document.getElementById("clk_shp_dig").style.left =`40vw`;//This can be improved by adding event listener
            }
            else{
                let left_sp = (window.innerWidth-170)/2;
                document.getElementById("clk_shp_ana").style.left =`${left_sp}px`;//This can be improved by adding event listener
                document.getElementById("clk_shp_dig").style.left =`${left_sp}px`;//This can be improved by adding event listener
            }
            let meri;//a.m. or p.m.
            let t =" ";
            let curr_time = new Date();
            if((curr_time.getHours())==0)//12A.M.
            {
                t= 12;
                meri = "A.M.";
                let note = document.getElementById("note");
                    note.style.color= "rgb(205,205,102)";
                    let back = document.getElementById("clk_shp");
                    back.style.backgroundImage = "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
                    document.body.style.backgroundColor= "rgb(75,75,75)";
                    curr_date.style.color ="rgb(250,250,239)";
            }
            else if(curr_time.getHours()>12)//1P.M to 11P.M
            {
                t= t + curr_time.getHours()-12;
                meri = "P.M.";
                if(curr_time.getHours()>=21)
                {
                    let note = document.getElementById("note");
                    note.style.color= "rgb(205,205,102)";
                    let back = document.getElementById("clk_shp_dig");
                    back.style.backgroundImage = "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
                    document.body.style.backgroundColor= "rgb(75,75,75)";
                    curr_date.style.color ="rgb(250,250,239)";
                }
                if(curr_time.getHours()<22)
                    t = "0"+t;
            }
            else if (curr_time.getHours()==12)//12P.M.
            {
                 t = t + curr_time.getHours();
                meri = "P.M.";
            }
            else//1A.M. to 11A.m.
            {
                t=curr_time.getHours();
                meri = "A.M.";
                if(curr_time.getHours()<=10)
                    t = '0' +t;
            }
            if(curr_time.getMinutes()<10)
                t =t + ":0"+curr_time.getMinutes();
            else
                t = t + ":"+curr_time.getMinutes();
            if(curr_time.getSeconds()<10)
                t =t + ":0"+curr_time.getSeconds();
            else
                t = t + ":"+curr_time.getSeconds() +" ";      
            apm.innerText = meri;
            disp.innerText = t;
            complete_date(curr_time);
            back_color(curr_time);
        }
    //Now for analog clock
    function func()
    {
        var curr_time = new Date();
        nsec.style.visibility= "visible";
        nmin.style.visibility= "visible";
        nhrs.style.visibility= "visible";
        sdeg= curr_time.getSeconds()*6-90;//-90 has been done to convert the horizontal div into vertical div in the starting position(12:00:00 A.M.)
        mdeg = curr_time.getMinutes() * 6 -90 +curr_time.getSeconds()*0.1;
        hrs = curr_time.getHours()*30 -90 +curr_time.getMinutes()*0.5;
        if(window.innerWidth>850){
            nsec.style.transform = `translate(4vw) rotate(${sdeg}deg)`;
            nmin.style.transform =`translate(4vw) rotate(${mdeg}deg)`;
            nhrs.style.transform = `translate(3vw) rotate(${hrs}deg)`;
            document.getElementById("clk_shp_ana").style.left =`40vw`;//This can be improved by adding event listener
            document.getElementById("clk_shp_dig").style.left =`40vw`;//This can be improved by adding event listener
        }
        else{
            nsec.style.transform = `translate(34px) rotate(${sdeg}deg)`;
            nmin.style.transform =`translate(34px) rotate(${mdeg}deg)`;  
            nhrs.style.transform = `translate(25.5px) rotate(${hrs}deg)`;
            let left_sp = (window.innerWidth-170)/2;
            document.getElementById("clk_shp_ana").style.left =`${left_sp}px`;//This can be improved by adding event listener
            document.getElementById("clk_shp_dig").style.left =`${left_sp}px`;//This can be improved by adding event listener
        }
        complete_date(curr_time);
        back_color(curr_time);
    }
    function complete_date(curr_time){
        if(curr_time.getDate()<10)
                curr_date.innerText = "0"+curr_time.getDate()+"/";
            else
                curr_date.innerText = curr_time.getDate()+"/";
            if(curr_time.getMonth()<10)
                curr_date.innerText += "0"+(curr_time.getMonth()+1)+"/";
                else
                curr_date.innerText += (curr_time.getMonth()+1)+"/";
            curr_date.innerText += curr_time.getFullYear();
    }
    function back_color(curr_time)
    {
        if(curr_time.getHours()<5||curr_time.getHours()>=21)
        {
            let note = document.getElementById("note");
            note.style.color= "rgb(205,205,102)";
            let back = document.getElementsByClassName("clk_shp");
            back[0].style.backgroundImage = "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
            back[1].style.backgroundImage = "linear-gradient(to right,rgb(164, 187, 215),rgb(41, 102, 234)";
            document.body.style.backgroundColor= "rgb(60,60,60)";
            curr_date.style.color ="rgb(250,250,239)";
            document.getElementById("choice").style.color= "rgb(250,250,239)";
         }
        else
        {
            let note = document.getElementById("note");
            note.style.color= "black";
            let back = document.getElementsByClassName("clk_shp");
            back[0].style.backgroundImage = "linear-gradient(to right,rgb(255, 111, 0),rgb(221, 255, 0));";
            back[0].style.backgroundImage = "linear-gradient(to right,rgb(255, 111, 0),rgb(221, 255, 0));";
            document.body.style.backgroundColor= "rgb(250,250,255)";
            curr_date.style.color ="black";
        }
    }
