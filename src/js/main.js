

function OnCLickButton()
{

    document.getElementById("Canvas").innerHTML="";

var floor=document.getElementById("floor").value ;
var lift =document.getElementById("lift").value;
var top =50;
var x_pos=5;
var y_pos=55;
var size= 50;
for( i=0;i<floor;i++)
{

    var x = document.createElement("div");
    x.id="DIV" +i;
    document.getElementById("Canvas").appendChild(x);
    var element1= document.getElementById("DIV" +i);
    element1.style.width = "1000px";
    element1.style.height = "120px";
    element1.style.top=top;
    top=top+120;
    if(i%2==0)
    element1.style.background = "red";
    else
    element1.style.background = "yellow";
    element1.setAttribute("class","Floor");
    const buttonPressed = e => {
        MoveLift(e.target.id);  // Get ID of Clicked Element
      }
    var btnUP= document.createElement("button");
    btnUP.id="btnUP:"+i;
    btnUP.style.borderRadius="50%";
    btnUP.style.position="absolute"
    btnUP.style.left = x_pos;
    //btnUP.style.margin = "5px";
   btnUP.style.top = y_pos;
   btnUP.style.height = size;
   btnUP.style.textAlign="center";
  btnUP.style.width=size;
  
  btnUP.addEventListener('click',buttonPressed);
   btnUP.style.color="white"
   btnUP.innerHTML="up"
   var btnDown= document.createElement("button");
    btnDown.id="btnDown:"+i;
    btnDown.style.borderRadius="50%";
    btnDown.style.position="absolute"
    btnDown.style.textAlign="center";
   btnDown.style.top = y_pos+10+size;
   btnDown.style.left = x_pos;
   btnDown.style.color="white";
   btnDown.style.height = size;
   //btnDown.style.margin = "5px";
   btnDown.style.width=size;
   btnDown.innerHTML="down"
   btnDown.addEventListener('click', buttonPressed);
   btnDown.myparam
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

   y_pos=y_pos+120;

}
var x_pos=65;
var y_pos=50;
var size= 1000/lift-90;
for(i=0;i<lift;i++)
{
    var x =document.createElement("div");
    x.id="rect"+i;
    document.getElementById("DIV0").appendChild(x);
   var element2= document.getElementById("rect"+i);
   element2.style.position="absolute"
   element2.style.left = x_pos;
   element2.style.top = y_pos;
  x_pos=x_pos+size+40;
   element2.style.width = size;
   element2.style.height = "120";
   element2.style.background = "blue";
   element2.setAttribute("class","Lift");


}
}

async function MoveLift(des)
{
   var selectedlift = document.getElementById("rect0");
    var a =new String(des);
   var temp= a.substring(a.indexOf(':')+1);
  var  temp1=parseInt(selectedlift.style.top);
  var  temp3=parseInt(document.getElementById("DIV"+temp).style.top);
  if(temp1<=temp3)
  {
   for(var i=temp1;i<=temp3;i++)
    {


        
        await new Promise(r => setTimeout(r, 10));    
        selectedlift.style.top=i;    
    }
  }
  else
  {
    for(var i=temp1;i>=temp3;i--)
    {


        
        await new Promise(r => setTimeout(r, 10));    
        selectedlift.style.top=i;    
    }

  }

}