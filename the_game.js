function input_button_pushed(){
    var ans = document.getElementById("the_input").value;

    var para = document.createElement("p");

    if (ans in names_to_order){

    }
    else{
        var node = document.createTextNode(ans);
        para.appendChild(node);
        var the_div = document.getElementById("unrec_div")
        the_div.appendChild(para)
    }
}

var names_to_order = {
    "one" : "number",
    "two" : "number",
    "three": "number",
    "red": "color",
    "yellow": "color",
    "a": "letter",
    "b": "letter",
    "c": "letter"
}

alert("script loaded!!")