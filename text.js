var texts = [];
var txtOrder = 0;

function addText (txt, incolor) {

	if(txtOrder == 0) {
		let newDiv = document.createElement("div");
		let newContent = document.createTextNode(txt);
		newDiv.setAttribute("class", "text");
		newDiv.setAttribute("id", "text" + txtOrder);
		newDiv.setAttribute("position", "fixed");
		newDiv.setAttribute("width", "auto");
		newDiv.style.color = incolor;//"rgb("+incolor.r+","+incolor.g+","+incolor.b+")";
		newDiv.appendChild(newContent);
		newDiv.style.fontSize = 20 +"px";
		newDiv.style.top = (height-40) + "px";
		newDiv.style.left = ((width/2) - ((txt.length/2) * 10)) + "px";//((width/2) - 50)
		let currentDiv = document.getElementById("div1");
		document.body.insertBefore(newDiv, currentDiv);
		texts[txtOrder] = newDiv;
		txtOrder++;
	}else {
		var outID = "text" + 0;
		document.getElementById(outID).innerHTML = txt;
		document.getElementById(outID).style.left = ((width/2) - ((txt.length/2) * 10)) + "px";
	}
}

function updateTextPosition() {

	for(let i = 0; i < texts.length; i++) {
		let test = document.getElementById("text" + i);

		if(test != null) {
			test.style.top = (height-25) + "px";
			test.style.left = 25 + "px";

		}
	}
}