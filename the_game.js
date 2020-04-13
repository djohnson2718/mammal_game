var score = 0;
var number_found = 0;
const penalty = 0.25;
//var had_unrec_input = false;
var game_over = false;
const num_orders = 28; //update this!

function submit_input(){
    if (game_over) return;

    var the_input = document.getElementById("the_input");
    var message_div = document.getElementById("message_div");
    var ans = the_input.value;
    

    

    if (used.has(ans))
    {
        message_div.innerHTML = `<span class="tbg"> You have already entered that: Order ${names_to_order[ans]}</span>`;
        the_input.value = "";
        the_input.focus;
        return;
    }
    //var para = document.createElement("p");

    if (ans in names_to_order){
        used.add(ans)
        var order = names_to_order[ans]
        if (!(order in order_to_div)){
            //order_to_done[order] = true
            score = score + 1;
            number_found = number_found+1;
            updateScore();
            var order_div = document.createElement("p");
            order_div.innerHTML = `<span class="tbg"> <b>${number_found}. ${order}:</b> <font color="green"> ${ans} (+1)</font></span>`;
            var results_div = document.getElementById("results_div");
            results_div.prepend(order_div);
            order_to_div[order] = order_div;

            message_div.innerHTML = `<span class="tbg">New Order found!</span>`;

            set_pic(order);

            if (number_found >= num_orders){
                end_game()
            }
        }
        else{
            score = score - penalty
            updateScore()
            var order_div = order_to_div[order]
            order_div.innerHTML = order_div.innerHTML + `<span class="tbg">,  <font color="red">${ans} (-0.25)</font></span>`
            
            message_div.innerHTML = `<span class="tbg">Oops, ${ans} is in ${order}.</span>`;

            set_pic(order);
        }
        the_input.value = "";
    }
    else{
        message_div.innerHTML =  `<span class="tbg">Input not recognized.</span>`;
    }



    the_input.focus()
}

function input_keyup(e){
    if (e.key === "Enter") submit_input();
}

function updateScore(){
    var score_p = document.getElementById("score_p")
    score_p.innerHTML = `<span class="tbg">Score: ${score}</span>`
}

function end_game(){
    game_over = true
    var message_div = document.getElementById("message_div");
    message_div.innerHTML = `<span class="tbg">Game over!</span>`;

    document.getElementById("done_button").disabled = "true";
    document.getElementById("show_answers_button").style.display="inline";
}

function set_pic(order){
    //alert("About to set pic: " +order+ " " + order_to_pic[order]);
    document.body.style.backgroundImage= "url(" + order_to_pic[order] +")";
    //document.body.style.backgroundImage = "url(pics/Lowland_streaked tenrec.jpg)";
    //alert(document.body.style.backgroundImage);
    document.getElementById("image_credit_div").innerHTML = `<span class="tbg"> Image: ${order_to_pic[order]}, ${order_to_pic_attr[order]}</span>`;
}

function done_clicked(){
    end_game(); 
}

function show_answers(){
    //TODO
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

order_to_pic={
    "Afrosoricida":
    ['Lowland_streaked_tenrec.jpg',
     'Lowland streaked tenrec',
     'By <a rel="nofollow" class="external text" href="https://www.flickr.com/people/42244964@N03">Frank Vassen</a> - <a href="//commons.wikimedia.org/wiki/Flickr" class="mw-redirect" title="Flickr">Flickr</a>: <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/42244964@N03/4315247601">Lowland Streaked Tenrec, Mantadia, Madagascar</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=14465335">Link</a>'
    ],

    "Macroscelidea":"pics/Black_and_Rufous_Elephant_Shrew.jpg",
    "Artiodactyla":'pics/Okapi.jpg'

}
order_to_pic_attr={
    "Macroscelidea":'By Joey Makalintal from Pennsylvania, USA - A Fascinating One, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=5817138',
    "Artiodactyla":'By Daniel Jolivet - <a rel="nofollow" class="external free" href="https://www.flickr.com/photos/sybarite48/7973333500/">https://www.flickr.com/photos/sybarite48/7973333500/</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=65399174">Link</a>'
}

names_to_order={ 
    "tenrec": "Afrosoricida",
    "otter shrew":"Afrosoricida",
    "golden mole":"Afrosoricida",
    
    "chevrotain":"Artiodactyla",
    "deer":"Artiodactyla",
    "moose":"Artiodactyla",
    "caribou":"Artiodactyla",
    "borckets":"Artiodactyla",
    "huemel":"Artiodactyla",
    "pudu":"Artiodactyla",
    "muntijac":"Artiodactyla",
    "bison":"Artiodactyla",
    "cattle":"Artiodactyla",
    "cow":"Artiodactyla",
    "buffalo":"Artiodactyla",
    "saola":"Artiodactyla",
    "nilgai":"Artiodactyla",
    "chowsingha":"Artiodactyla",
    "bushbuck":"Artiodactyla",
    "bongo":"Artiodactyla",
    "nyala":"Artiodactyla",
    "kudu":"Artiodactyla",
    "sitatunga":"Artiodactyla",
    "eland":"Artiodactyla",
    "impala":"Artiodactyla",
    "hartebeest":"Artiodactyla",
    "wildebeest":"Artiodactyla",
    "topi":"Artiodactyla",
    "bontebok":"Artiodactyla",
    "hirola":"Artiodactyla",
    "antelope":"Artiodactyla",
    "grysbok":"Artiodactyla",
    "steenbok":"Artiodactyla",
    "springbok":"Artiodactyla",
    "dibatag":"Artiodactyla",
    "gerenuk":"Artiodactyla",
    "saiga":"Artiodactyla",
    "blackbuck":"Artiodactyla",
    "gazelle":"Artiodactyla",
    "beira":"Artiodactyla",
    "dik-dik":"Artiodactyla",
    "oribi":"Artiodactyla",
    "klipspringer":"Artiodactyla",
    "chiru":"Artiodactyla",
    "takin":"Artiodactyla",
    "sheep":"Artiodactyla",
    "tahr":"Artiodactyla",
    "goat":"Artiodactyla",
    "ibex":"Artiodactyla",
    "chamois":"Artiodactyla",
    "goral":"Artiodactyla",
    "serows":"Artiodactyla",
    "muskox":"Artiodactyla",
    "duiker":"Artiodactyla",
    "antelope":"Artiodactyla",
    "addax":"Artiodactyla",
    "oryz":"Artiodactyla",
    "reedbuck":"Artiodactyla",
    "kob":"Artiodactyla",
    "lechwe":"Artiodactyla",
    "waterbuck":"Artiodactyla",
    "rhebok":"Artiodactyla",
    "pronghorn":"Artiodactyla",
    "giraffe":"Artiodactyla",
    "okapi":"Artiodactyla",
    "pig":"Artiodactyla",
    "warthog":"Artiodactyla",
    "bushpig":"Artiodactyla",
    "hog":"Artiodactyla",
    "peccary":"Artiodactyla",
    "camel":"Artiodactyla",
    "guanaco":"Artiodactyla",
    "vicuna":"Artiodactyla",
    "lama":"Artiodactyla",
    "alpaca":"Artiodactyla",
    "hippopotamus":"Artiodactyla",
    "hippo":"Artiodactyla",
    
    "dog":"Carnivora",
    "wolf":"Carnivora",
    "dhole":"Carnivora",
    "fox":"Carnivora",
    "bear":"Carnivora",
    "panda":"Carnivora",
    "raccoon":"Carnivora",
    "coati":"Carnivora",
    "kinkajou":"Carnivora",
    "olingo":"Carnivora",
    "ringtail":"Carnivora",
    "skunk":"Carnivora",
    "badger":"Carnivora",
    "weasel":"Carnivora",
    "otter":"Carnivora",
    "wolverine":"Carnivora",
    "tayra":"Carnivora",
    "marten":"Carnivora",
    "grison":"Carnivora",
    "polecat":"Carnivora",
    'mink':"Carnivora",
    'walrus':"Carnivora",
    'seal':"Carnivora",
    'sea lion':"Carnivora",
    'civet':"Carnivora",
    'cat':"Carnivora",
    'leopard':"Carnivora",
    'lion':"Carnivora",
    'tiger':"Carnivora",
    'jaguar':"Carnivora",
    'snow leopard':"Carnivora",
    'puma':"Carnivora",
    "jaguarundi":"Carnivora",
    'cougar':"Carnivora",
    'cheetah':"Carnivora",
    "lynx":"Carnivora",
    'serval':"Carnivora",
    'linsang':"Carnivora",
    'civet':"Carnivora",
    'oyan':"Carnivora",
    'genet':"Carnivora",
    'binturong':"Carnivora",
    'hyena':"Carnivora",
    'aardwolf':"Carnivora",
    'mongoose':"Carnivora",
    'cusimanse':"Carnivora",
    'meerkat':"Carnivora",
    'fossa':"Carnivora",
    'falanouc':"Carnivora",
    'vontsira':"Carnivora",
    'boky':"Carnivora",
    
    'whale':"Cetacea",
    'dolphin':"Cetacea",
    'narwhal':"Cetacea",
    'beluga':"Cetacea",
    'porpoise':"Cetacea",
    
    'bat':'Chiroptera',
    'flying fox':'Chiroptera',
    
    'armadilo':'Cingulata',
    
    'marsupial mice':'Dasyuromorphia',
    'pouched mice':'Dasyuromorphia',
    'mulgara':'Dasyuromorphia',
    'kaluta':'Dasyuromorphia',
    'kowari':'Dasyuromorphia',
    'quoll':'Dasyuromorphia',
    'dasyure':'Dasyuromorphia',
    'ningauis':'Dasyuromorphia',
    'dibbler':'Dasyuromorphia',
    'phascogales':'Dasyuromorphia',
    'wambenger':'Dasyuromorphia',
    'marsupial shrew':'Dasyuromorphia',
    'planigale':'Dasyuromorphia',
    'tasmanian devil':'Dasyuromorphia',
    'dunnart':'Dasyuromorphia',
    'numbat':'Dasyuromorphia',
    
    'colugo':'Dermoptera',
    'flying lemur':'Dermoptera',
    
    'opossum':'Didelphimorphia',
    
    'wombat':'Diprotodontia',
    'koala':'Diprotodontia',
    'cuscus':'Diprotodontia',
    'possum':'Diprotodontia',
    'glider':'Diprotodontia',
    'kangaroo':'Diprotodontia',
    'wallaby':'Diprotodontia',
    'wallaroo':'Diprotodontia',
    'quokka':'Diprotodontia',
    'pademelon':'Diprotodontia',
    'bettong':'Diprotodontia',
    'potoroo':'Diprotodontia',
    'rat-kargaroo':'Diprotodontia',
    'tree-kangaroo':'Diprotodontia',
    
    'hedgehog':'Eulipotyphla',
    'moonrat':'Eulipotyphla',
    'gymnure':'Eulipotyphla',
    'shrew':'Eulipotyphla',
    'mole':'Eulipotyphla',
    'desman':'Eulipotyphla',
    'solenodon':'Eulipotyphla',
    
    'hyrax':'Hyracoidea',
    
    'rabbit':'Lagomorpha',
    'hare':'Lagomorpha',
    'pika':'Lagomorpha',
    
    'elephant shrew':'Macroscelidea',
    
    'monito del monte':'Microbiotheria',
    
    'platypus':'Monotremata',
    'echidna':'Monotremata',
    
    'marsupial mole':'Notoryctemorphia',
    
    'shrew opossum':'Paucituberculata',
    'caenoldestid':'Paucituberculata',
    
    'bandicoot':'Peramelemorphia',
    'bilbie':'Peramelemorphia',
    
    'horse':'Perissodactyla',
    'zebra':'Perissodactyla',
    'donkey':'Perissodactyla',
    'rhinoceros':'Perissodactyla',
    'rhino':'Perissodactyla',
    'tapir':'Perissodactyla',
    
    'pangolin':'Pholidota',
    
    'anteater':"Pilosa",
    'sloth':"Pilosa",
    
    'monkey':'Primates',
    'mangabey':'Primates',
    'mandrill':'Primates',
    'baboon':'Primates',
    'colobus':'Primates',
    'langur':'Primates',
    'gorilla':'Primates',
    'human':'Primates',
    'chimpanzee':'Primates',
    'orangatan':'Primates',
    'gibbon':'Primates',
    'marmoset':'Primates',
    'tamarin':'Primates',
    'tarsier':'Primates',
    "lemur":'Primates',
    'bushbaby':'Primates',
    'galago':'Primates',
    'loris':'Primates',
    'potto':'Primates',
    'ape':'Primates',
    
    'elephant':'Proboscidea',
    
    'squirrel':'Rodentia',
    'mouse':'Rodentia',
    'scaly-tail':'Rodentia',
    'beaver':'Rodentia',
    'gopher':'Rodentia',
    'rat':'Rodentia',
    'gundi':'Rodentia',
    'pectinator':'Rodentia',
    'guinea pig':'Rodentia',
    'cavy':'Rodentia',
    'paca':'Rodentia',
    'agouti':'Rodentia',
    'acouchi':'Rodentia',
    'chinchilla':'Rodentia',
    'pacarana':'Rodentia',
    'porcupine':'Rodentia',
    'hutia':'Rodentia',
    'tuco-tuco':'Rodentia',
    'guiara':'Rodentia',
    'coypu':'Rodentia',
    'degu':'Rodentia',
    'coruro':'Rodentia',
    'mole-rat':'Rodentia',
    'jerboa':'Rodentia',
    'hamster':'Rodentia',
    'vole':'Rodentia',
    'akodont':'Rodentia',
    'lemming':'Rodentia',
    'colilargo':'Rodentia',
    'muskrat':'Rodentia',
    'hocicudo':'Rodentia',
    'tapecua':'Rodentia',
    'ammodile':'Rodentia',
    'gerbil':'Rodentia',
    'antsangy':'Rodentia',
    'dormouse':'Rodentia',
    'zokor':'Rodentia',
    'spalax':'Rodentia',
    'flying squirrel':'Rodentia',
    'prairie dog':'Rodentia',
    'marmot':'Rodentia',
    
    'treeshrew':'Scandentia',
    
    'dugong':'Sirenia',
    'manatee':'Sirenia',
    
    'aardvark':'Tubulidentata'
    }