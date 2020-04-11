var score = 0

function input_button_pushed(){
    var ans = document.getElementById("the_input").value;

    var para = document.createElement("p");

    if (ans in names_to_order){
        var order = names_to_order[ans]
        if (!order_to_done[order]){
            order_to_done[order] = true
            score = score + 1
            var node = document.createTextNode(order + " : " + ans)
            para.appendChild(node)
            var the_div = document.getElementById("results_div")
            the_div.appendChild(para)
        }
        else{
            alert("already used that!")
        }
    }
    else{
        var node = document.createTextNode(ans);
        para.appendChild(node);
        var the_div = document.getElementById("unrec_div")
        the_div.appendChild(para)
    }
}

var order_to_done ={
    "number" :false,
    "color" : false,
    "letter": false
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