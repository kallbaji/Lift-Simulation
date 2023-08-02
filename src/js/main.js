
 NUMBER_OF_LIFT=0;
 NUMBER_OF_FLOOR=0;
 QueueRequest=[];
 requestCount=0;
 processnumber=0;
function OnCLickButton()
{

    document.getElementById("Canvas").innerHTML="";

var floor=document.getElementById("floor").value ;
NUMBER_OF_FLOOR=floor;
var lift =document.getElementById("lift").value;
NUMBER_OF_LIFT=lift;
var top =50;
var x_pos=20;
var y_pos=20;
var size= 50;
for( i=0;i<floor;i++)
{

    var x = document.createElement("meta");
    x.id="DIV" +i;
    document.getElementById("Canvas").appendChild(x);
    var element1= document.getElementById("DIV" +i);
    element1.style.width = "1000px";
    element1.style.position="absolute";
    element1.style.height = "120px";
    element1.style.top=top;
    top=top+120;
    // if(i%2==0)
    // element1.style.background = "red";
    // else
    // element1.style.background = "yellow";
    element1.setAttribute("class","Floor");
 
    const buttonPressed = e => {
        MoveLift(e.target.id);  // Get ID of Clicked Element
      }
    var btnUP= document.createElement("button");
    var btnDown= document.createElement("button");

    btnUP.style.position="absolute"
btnDown.style.position="absolute"
if(i==0)
   {
   document.getElementById("DIV"+i).appendChild(btnUP);
   }
   else if(i==(floor-1))
   {
    document.getElementById("DIV"+i).appendChild(btnDown);
}
else
{
    document.getElementById("DIV"+i).appendChild(btnDown);
    document.getElementById("DIV"+i).appendChild(btnUP);
}
btnUP.style.left =  (document.getElementById("DIV0").offsetLeft);
btnDown.style.left =(document.getElementById("DIV0").offsetLeft);

   y_pos=y_pos+120;
    btnUP.id="btnUP:"+i;
    btnUP.style.borderRadius="50%";
   
    
    //btnUP.style.margin = "5px";
   btnUP.style.top = 10;
   btnUP.style.height = size;
   btnUP.style.textAlign="center";
  btnUP.style.width=size;
  
  btnUP.addEventListener('click',buttonPressed);
   btnUP.style.color="white"
   btnUP.innerHTML="up"
   
    btnDown.id="btnDown:"+i;
    btnDown.style.borderRadius="50%";
    
  
    btnDown.style.textAlign="center";
   btnDown.style.top = 60

   btnDown.style.color="white";
   btnDown.style.height = size;
   //btnDown.style.margin = "5px";
   btnDown.style.width=size;
   btnDown.innerHTML="down"
   btnDown.addEventListener('click', buttonPressed);
 
   var lbl = document.createElement("label");
   var FloorNUmber=NUMBER_OF_FLOOR-i;
   lbl.innerHTML="Floor " +FloorNUmber ;
   lbl.style.fontWeight="bold";
   lbl.style.position="fixed";
   lbl.style.left=document.getElementById("DIV"+i).offsetLeft+document.getElementById("DIV"+i).offsetWidth;
   lbl.style.top=document.getElementById("DIV"+i).offsetTop+document.getElementById("DIV"+i).offsetHeight/2;
   document.getElementById("Canvas").appendChild(lbl);
   
   


}
var x_pos=document.getElementById("DIV0").offsetLeft+90;
var y_pos=50;
var size= 1000/lift-90;
for(i=0;i<lift;i++)
{
    var x =document.createElement("meta");
    x.id="rect"+i;
    document.getElementById("Canvas").appendChild(x);
   var element2= document.getElementById("rect"+i);
   element2.style.position="fixed"
   element2.style.left = x_pos;
   element2.style.top = y_pos;
  x_pos=x_pos+90;
   element2.style.width = 50;
   element2.style.height = "80";
   element2.style.background = "blue";
   element2.setAttribute("data-state","IDLE");
   element2.setAttribute("data-Floor","0");
   element2.setAttribute("class","Lift");


}
}

async function MoveLift(des)
{

  
  var a =new String(des);
  var temp= a.substring(a.indexOf(':')+1);
  if(document.querySelector('[data-floor="'+temp+'"]'))
  return;
   var selectedlift = SelectLift(des);
   if(selectedlift!=null)
   {
    selectedlift.setAttribute("data-floor",temp);
   selectedlift.setAttribute("data-state","MOVING");
    
  var  temp1=parseInt(selectedlift.style.top);
  var  temp3=parseInt(document.getElementById("DIV"+temp).offsetTop)+2;

  if(document.getElementsByName("rect").entries(x=>x.getAttribute("data-state")=="IDLE"))
   
  if(temp1<=temp3)
  {
   for(var i=temp1;i<=temp3+20;i++)
    {


        
        await new Promise(r => setTimeout(r, 10));    
        selectedlift.style.top=i;    
    }
  }
  else
  {
    for(var i=temp1;i>=temp3+20+2;i--)
    {


        
        await new Promise(r => setTimeout(r, 10));    
        selectedlift.style.top=i;    
    }

  }
  await new Promise(r => setTimeout(r, 2000));    
  selectedlift.setAttribute("data-state","IDLE");

  for(processnumber;processnumber<requestCount;processnumber++)
  {
   
    MoveLift(QueueRequest[processnumber]);


  }
  
}
}

function  SelectLift(parfloor)
{

for(i=0;i<NUMBER_OF_LIFT;i++)
{
if(document.getElementById("rect"+i).getAttribute("data-state")=="IDLE")
{

  return document.getElementById("rect"+i);
  

}

}

QueueRequest[requestCount]=parfloor;
requestCount++;
}