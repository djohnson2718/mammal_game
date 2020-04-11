

function input_button_pushed(){
    var m = document.getElementById("the_input").value;
    var para = document.createElement("p");
    var node = document.createTextNode(m);
    para.appendChild(node);

    var the_div = document.getElementById("the_div")

    the_div.appendChild(para)

}

alert("script loaded!!")