var score = 0;
var number_found = 0;
const penalty = 0.25;
var had_unrec_input = false;
var game_over = false;
const num_orders = 3;

function submit_input(){
    if (game_over) return;

    var the_input = document.getElementById("the_input");
    var ans = the_input.value;
    the_input.value = "";

    

    if (used.has(ans))
    {
        alert("already tried that")
        return
    }

    used.add(ans)

    var para = document.createElement("p");

    if (ans in names_to_order){
        var order = names_to_order[ans]
        if (!(order in order_to_div)){
            //order_to_done[order] = true
            score = score + 1;
            number_found = number_found+1;
            updateScore();
            var order_div = document.createElement("p");
            order_div.innerHTML = `<b>${number_found}. ${order}:</b> <font color="green"> ${ans} (+1)</font>`;
            var results_div = document.getElementById("results_div");
            results_div.prepend(order_div);
            order_to_div[order] = order_div;

            if (number_found >= num_orders){
                end_game()
            }
        }
        else{
            score = score - penalty
            updateScore()
            var order_div = order_to_div[order]
            order_div.innerHTML = order_div.innerHTML + `,  <font color="red">${ans} (-0.25)</font>`
            
            //alert("already used that!")
        }
    }
    else{
        var node;
        if (had_unrec_input){
            node = document.createTextNode(", " +ans);
        }
        else{
            node = document.createTextNode(ans);
            had_unrec_input = true;
        }
        var unrec_p = document.getElementById("unrec_p")
        unrec_p.appendChild(node);
        //var the_div = document.getElementById("unrec_div")
        //the_div.appendChild(para)
    }

    the_input.focus()
}

function input_keyup(e){
    if (e.key === "Enter") submit_input();
}

function updateScore(){
    var score_p = document.getElementById("score_p")
    score_p.textContent = "Score: " + score.toString()
}

function end_game(){
    game_over = true
    alert("Game over!")
}

var used = new Set()
var order_to_div = {}

/*var names_to_order = {
    "one" : "number",
    "two" : "number",
    "three": "number",
    "red": "color",
    "yellow": "color",
    "a": "letter",
    "b": "letter",
    "c": "letter"
}*/

//alert("script loaded!!")