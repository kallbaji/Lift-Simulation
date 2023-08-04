NUMBER_OF_LIFT = parseInt(localStorage.getItem("lift"));
NUMBER_OF_FLOOR = parseInt(localStorage.getItem("floor"));
QueueRequest = [];
requestCount = 0;
processnumber = 0;
id=0;

function CanvasLoad(){


  document.getElementById("Canvas").innerHTML = "";

  var floor = NUMBER_OF_FLOOR;
  var lift =  NUMBER_OF_LIFT ;
  var top = 50;
  var x_pos = 20;
  var y_pos = 20;
  var size = 50;
  for (i = 0; i < floor; i++) {

    var x = document.createElement("meta");
    x.id = "DIV" + i;
    document.getElementById("Canvas").appendChild(x);
    var element1 = document.getElementById("DIV" + i);
    element1.style.width = "1000px";
    element1.style.position = "absolute";
    element1.style.height = "120px";
    element1.style.top = top;
    top = top + 120;
    // if(i%2==0)
    // element1.style.background = "red";
    // else
    // element1.style.background = "yellow";
    element1.setAttribute("class", "Floor");

    const buttonPressed = e => {
      MoveLift(e.target.id);  // Get ID of Clicked Element
    }
    var btnUP = document.createElement("button");
    var btnDown = document.createElement("button");

    btnUP.style.position = "absolute"
    btnDown.style.position = "absolute"
    if (i == 0) {
      document.getElementById("DIV" + i).appendChild(btnUP);
    }
    else if (i == (floor - 1)) {
      document.getElementById("DIV" + i).appendChild(btnDown);
    }
    else {
      document.getElementById("DIV" + i).appendChild(btnDown);
      document.getElementById("DIV" + i).appendChild(btnUP);
    }
    btnUP.style.left = (document.getElementById("DIV0").offsetLeft);
    btnDown.style.left = (document.getElementById("DIV0").offsetLeft);

    y_pos = y_pos + 120;
    btnUP.id = "btnUP:" + i;
    btnUP.style.borderRadius = "50%";


    //btnUP.style.margin = "5px";
    btnUP.style.top = 10;
    btnUP.style.height = size;
    btnUP.style.textAlign = "center";
    btnUP.style.width = size;

    btnUP.addEventListener('click', buttonPressed);
    btnUP.style.color = "white"
    btnUP.innerHTML = "up"

    btnDown.id = "btnDown:" + i;
    btnDown.style.borderRadius = "50%";


    btnDown.style.textAlign = "center";
    btnDown.style.top = 60

    btnDown.style.color = "white";
    btnDown.style.height = size;
    //btnDown.style.margin = "5px";
    btnDown.style.width = size;
    btnDown.innerHTML = "down"
    btnDown.addEventListener('click', buttonPressed);

    var lbl = document.createElement("label");
    var FloorNUmber = NUMBER_OF_FLOOR - i;
    lbl.innerHTML = "Floor " + FloorNUmber;
    lbl.style.fontWeight = "bold";
    lbl.style.position = "fixed";
    lbl.style.width = 50;
    document.getElementById("Canvas").appendChild(lbl);
    lbl.style.left = document.getElementById("DIV" + i).offsetLeft + document.getElementById("DIV" + i).offsetWidth - 50;
    lbl.style.top = document.getElementById("DIV" + i).offsetTop + document.getElementById("DIV" + i).offsetHeight / 2;



  }
  var firstfloor=NUMBER_OF_FLOOR-1;
  var x_pos = document.getElementById("DIV"+firstfloor).offsetLeft + 90;
  var y_pos = document.getElementById("DIV"+firstfloor).offsetTop+20;
  var size = 1000 / lift - 90;
  for (i = 0; i < lift; i++) {
    var x = document.createElement("meta");
    x.id = "rect:" + i;
    var DoorA = document.createElement("div");
    // var DoorB=document.createElement("div");
    DoorA.style.width = 50;
    DoorA.style.borderLeft = 2;
    DoorA.style.height = 76;
    DoorA.style.borderRight = 2;
    DoorA.style.borderColor = "Black"
    DoorA.style.background = "blue";
    DoorA.style.border = "solid";
    DoorA.id = "Door" + i;

    // DoorB.style.background = "blue";

    // DoorB.style.width=25;
    // DoorB.style.borderLeft=2;
    // DoorB.style.borderRight=2;
    // DoorB.style.height=76;


    // DoorB.style.border="solid";
    x.style.border = "solid";
    x.style.borderWidth = 2;
    x.style.borderColor = "Black"

    document.getElementById("Canvas").appendChild(x);
    document.getElementById("rect:" + i).appendChild(DoorA);
    // document.getElementById("rect"+i).appendChild(DoorB);
    var element2 = document.getElementById("rect:" + i);
    element2.style.position = "fixed"
    element2.style.left = x_pos;
    element2.style.top = y_pos;
    x_pos = x_pos + 90;
    element2.style.width = 50;
    element2.style.height = "80";
    //element2.style.background = "blue";
    element2.setAttribute("data-state", "IDLE");
    element2.setAttribute("data-Floor", firstfloor);
    element2.setAttribute("class", "Lift");


  }
}

async function MoveLift(des) {


  

  var a = new String(des);
  var temp = a.substring(a.indexOf(':') + 1);
  if (document.querySelector('[data-floor="' + temp + '"]'))
  {
    var presentLift=document.querySelector('[data-floor="' + temp + '"]')
    
   
    var asd = presentLift.id;
    var asd1 = new String(asd);
    var asd2 = asd1.substring(asd1.indexOf(':') + 1);
    var asd3 = document.getElementById("Door" + asd2);
    if(presentLift.getAttribute("data-state")=="MOVING")
    {
     
      asd3.style.animationPlayState = "paused";

      
      asd3.removeEventListener("animationend", animationEndHandler);
      
    
  let pos =parseInt( asd3.offsetWidth);
  asd3.style.width=pos+"px";
  asd3.removeAttribute("class", "Anime");
  clearInterval(id);
  id = setInterval(frameOpen,50);
  function frameOpen() {
    if (pos < 0) {
      clearInterval(id);
      id=setInterval(frameclose,50);
    } else {
      pos--; 
      asd3.style.width = pos+"px"; 
    
    }
  }
  
  function frameclose() {
    if (pos >= 50) {
      clearInterval(id);
      asd3.style.animationPlayState = "running"
      presentLift.setAttribute("data-state","IDLE") ;

    } else {
      pos++; 
      asd3.style.width = pos+"px"; 
    
    }
  }

    }
    else
    {
    presentLift.setAttribute("data-state", "MOVING");
    asd3.setAttribute("class", "Anime");
    asd3.addEventListener("animationend", animationEndHandler);
    }
    return;
  }
    var selectedlift = SelectLift(des);
  if (selectedlift != null) {
    selectedlift.setAttribute("data-floor", temp);
    selectedlift.setAttribute("data-state", "MOVING");

    var temp1 = parseInt(selectedlift.style.top);
    var temp3 = parseInt(document.getElementById("DIV" + temp).offsetTop) + 2;

    //if(document.getElementsByName("rect").entries(x=>x.getAttribute("data-state")=="IDLE"))

    if (temp1 <= temp3) {
      for (var i = temp1; i <= temp3 + 20; i++) {



        await new Promise(r => setTimeout(r, 10));
        selectedlift.style.top = i;
      }
    }
    else {
      for (var i = temp1; i >= temp3 + 20 + 2; i--) {



        await new Promise(r => setTimeout(r, 10));
        selectedlift.style.top = i;
      }

    }



    var temp4 = selectedlift.id;
    var temp5 = new String(temp4);
    var temp6 = temp5.substring(temp5.indexOf(':') + 1);
    var temp7 = document.getElementById("Door" + temp6);
    temp7.setAttribute("class", "Anime");
    temp7.addEventListener("animationend", animationEndHandler);

   




  }
}

function animationEndHandler() {



  this.removeAttribute("class", "Anime");
  var temp8 = this.id;
  var temp9 = new String(temp8);
  var temp10 = temp9.substring(temp9.indexOf('r') + 1);
  var temp11 = document.getElementById("rect:" + temp10);
  temp11.setAttribute("data-state", "IDLE");
  this.removeEventListener("animationend", animationEndHandler);
  if (processnumber < requestCount)
    MoveLift(QueueRequest[processnumber++]);


}

function SelectLift(parfloor) {

  for (i = 0; i < NUMBER_OF_LIFT; i++) {
    if (document.getElementById("rect:" + i).getAttribute("data-state") == "IDLE") {

      return document.getElementById("rect:" + i);


    }

  }
  if (!QueueRequest.includes(parfloor, processnumber)) {
    QueueRequest[requestCount] = parfloor;
    requestCount++;

  }
  return null;
}



