var score = 0;
var number_found = 0;
const penalty = 0.25;
var had_unrec_input = false;
var game_over = false;
const num_orders = 28; //update this!

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