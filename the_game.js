var score = 0;
var number_found = 0;
const penalty = 0.25;
//var had_unrec_input = false;
var game_over = false;


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
        used.add(ans);
        var order = names_to_order[ans];
        if (!(order.name in order_to_div)){
            //order_to_done[order] = true
            score = score + 1;
            number_found = number_found+1;
            updateScore();
            var order_div = document.createElement("p");
            order_div.innerHTML = `<span class="tbg"> <div class="tooltip"><b>${number_found}. ${order.name}: </b><span class="tooltiptext"> ${order.descr}</span></div> <font color="green"> ${ans} (+1)</font></span>`;
            var results_div = document.getElementById("results_div");
            results_div.prepend(order_div);
            order_to_div[order.name] = order_div;

            message_div.innerHTML = `<span class="tbg">New Order found!</span>`;

            set_pic(order);

            if (number_found >= num_orders){
                end_game()
            }
        }
        else{
            score = score - penalty
            updateScore()
            var order_div = order_to_div[order.name]
            order_div.innerHTML = order_div.innerHTML + `<span class="tbg">,  <font color="red">${ans} (-0.25)</font></span>`
            
            message_div.innerHTML = `<span class="tbg">Oops, ${ans} is in ${order.name}.</span>`;

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
    document.body.style.backgroundImage= "url(pics/" + order.pic_file +")";
    //document.body.style.backgroundImage = "url(pics/Lowland_streaked tenrec.jpg)";
    //alert(document.body.style.backgroundImage);
    document.getElementById("image_credit_div").innerHTML = `<span class="tbg"> Image: ${order.pic_name}, ${order.pic_attr}</span>`;
}

function done_clicked(){
    end_game(); 
}

function show_answers(){
    //TODO
}

var used = new Set()
var order_to_div = {}
var names_to_order = {}

class Order {
    constructor(name, descr, pic_name, pic_file, pic_attr, members){
        this.name = name;
        this.descr = descr;
        this.pic_name = pic_name;
        this.pic_file = pic_file;
        this.pic_attr = pic_attr;
        this.members = members;
        var index;
        for (index = 0; index < members.length; ++index){
            names_to_order[members[index]] = this;
        }
    }
}

order_list = [
    new Order("Afrosoricida",
    "African golden moles, tenrecs, and otter shrews.",
    'Lowland streaked tenrec',
    'Lowland_streaked_tenrec.jpg',
    'By <a rel="nofollow" class="external text" href="https://www.flickr.com/people/42244964@N03">Frank Vassen</a> - <a href="//commons.wikimedia.org/wiki/Flickr" class="mw-redirect" title="Flickr">Flickr</a>: <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/42244964@N03/4315247601">Lowland Streaked Tenrec, Mantadia, Madagascar</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=14465335">Link</a>',
    ['tenrec', 'otter shrew', 'golden mole']),

    new Order("Artiodactyla",
    "A large order of hoofed mammals, the even-toed ungulates.",
    "Okapi",
    'Okapi.jpg',
    'By Daniel Jolivet - <a rel="nofollow" class="external free" href="https://www.flickr.com/photos/sybarite48/7973333500/">https://www.flickr.com/photos/sybarite48/7973333500/</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=65399174">Link</a>',    
    ['chevrotain', 'deer', 'moose', 'caribou', 'borckets', 'huemel', 'pudu', 'muntijac', 'bison', 'cattle', 'cow', 'buffalo', 'saola', 'nilgai', 'chowsingha', 'bushbuck', 'bongo', 'nyala', 'kudu', 'sitatunga', 'eland', 'impala', 'hartebeest', 'wildebeest', 'topi', 'bontebok', 'hirola', 'antelope', 'grysbok', 'steenbok', 'springbok', 'dibatag', 'gerenuk', 'saiga', 'blackbuck', 'gazelle', 'beira', 'dik-dik', 'oribi', 'klipspringer', 'chiru', 'takin', 'sheep', 'tahr', 'goat', 'ibex', 'chamois', 'goral', 'serows', 'muskox', 'duiker', 'addax', 'oryz', 'reedbuck', 'kob', 'lechwe', 'waterbuck', 'rhebok', 'pronghorn', 'giraffe', 'okapi', 'pig', 'warthog', 'bushpig', 'hog', 'peccary', 'camel', 'guanaco', 'vicuna', 'lama', 'alpaca', 'hippopotamus', 'hippo']),

    new Order('Carnivora',
    '16 families of mostly carnivorous and omnivorous mammals found worldwide.',
    'Small Indian Civet',
    'Civet.jpg',
    'By <a href="//en.wikipedia.org/w/index.php?title=User:Rejaul_karim.rk&amp;action=edit&amp;redlink=1" class="new" title="User:Rejaul karim.rk (page does not exist)">Rejaul karim.rk</a> - Own work, <a href="https://creativecommons.org/licenses/by-sa/4.0/" title="Creative Commons Attribution-ShareAlike 4.0">CC BY-SA 4.0</a>, <a href="https://en.wikipedia.org/w/index.php?curid=54285813">Link</a>',
    ['dog', 'wolf', 'dhole', 'fox', 'bear', 'panda', 'raccoon', 'coati', 'kinkajou', 'olingo', 'ringtail', 'skunk', 'badger', 'weasel', 'otter', 'wolverine', 'tayra', 'marten', 'grison', 'polecat', 'mink', 'walrus', 'seal', 'sea lion', 'civet', 'cat', 'leopard', 'lion', 'tiger', 'jaguar', 'snow leopard', 'puma', 'jaguarundi', 'cougar', 'cheetah', 'lynx', 'serval', 'linsang', 'oyan', 'genet', 'binturong', 'hyena', 'aardwolf', 'mongoose', 'cusimanse', 'meerkat', 'fossa', 'falanouc', 'vontsira', 
'boky']),

    new Order('Cetacea',
    'Whales and dolphins.',
    'Orca',
    'Killerwhales_jumping.jpg',
    'By Robert Pittman - NOAA (http://www.afsc.noaa.gov/Quarterly/amj2005/divrptsNMML3.htm]), Public Domain, https://commons.wikimedia.org/w/index.php?curid=1433661',
    ['whale', 'dolphin', 'narwhal', 'beluga', 'porpoise','orca']),

    new Order('Chiroptera',
    'Bats.',
    'Carollia brevicauda',
    'bat.jpg',
    'By <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/diegolizcano/">Diego Lizcano</a> - <a rel="nofollow" class="external free" href="https://www.flickr.com/photos/diegolizcano/239275294/">https://www.flickr.com/photos/diegolizcano/239275294/</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=11942797">Link</a>',
    ['bat', 'flying fox']),

    new Order('Cingulata',
    'Armadillos.',
    'Pink fairy armadillo.',
    'arm.jfif',
    'By Daderot - Own work, CC0, https://commons.wikimedia.org/w/index.php?curid=21664472',
    ['armadillo']),

    new Order('Dasyuromorphia',
    'Most of the Australian carnivorous marsupials.',
    'Tasmanian Devil',
    'tasdevil.jpg',
    'By Wayne McLean (jgritz) Taken with Nikon D100. - Own work, CC BY-SA 2.5, https://commons.wikimedia.org/w/index.php?curid=496088',
    ['marsupial mice', 'pouched mice', 'mulgara', 'kaluta', 'kowari', 'quoll', 'dasyure', 'ningauis', 'dibbler', 'phascogales', 'wambenger', 'marsupial shrew', 'planigale', 'tasmanian devil', 'dunnart', 'numbat']),

    new Order('Dermoptera',
    'Cololgos (flying lemurs).',
    'Colugo',
    'Colugo.jpg',
    'By Lip Kee Yap. - Flickr: Colugo., CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=7627076',
    ['colugo', 'flying lemur']),

    new Order('Didelphimorphia',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['opossum']),

    new Order('Diprotodontia',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['wombat', 'koala', 'cuscus', 'possum', 'glider', 'kangaroo', 'wallaby', 'wallaroo', 'quokka', 'pademelon', 'bettong', 'potoroo', 'rat-kargaroo', 'tree-kangaroo']),

    new Order('Eulipotyphla',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['hedgehog', 'moonrat', 'gymnure', 'shrew', 'mole', 'desman', 'solenodon']),

    new Order('Hyracoidea',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['hyrax']),

    new Order('Lagomorpha',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['rabbit', 'hare', 'pika']),

    new Order("Macroscelidea",
    "Elephant Shrews.",
    "Black and Rufous Elephant Shrew",
    "Black_and_Rufous_Elephant_Shrew.jpg",
    'By <a rel="nofollow" class="external text" href="https://www.flickr.com/people/7384852@N06">Joey Makalintal</a> from Pennsylvania, USA - <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/7384852@N06/2836615665/">A Fascinating One</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=5817138">Link</a>',
    ['elephant shrew']),

    new Order('Microbiotheria',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['monito del monte']),

    new Order('Monotremata',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['platypus', 'echidna']),

    new Order('Notoryctemorphia',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['marsupial mole']),

    new Order('Paucituberculata',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['shrew opossum', 'caenoldestid']),

    new Order('Peramelemorphia',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['bandicoot', 'bilbie']),

    new Order('Perissodactyla',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['horse', 'zebra', 'donkey', 'rhinoceros', 'rhino', 'tapir']),

    new Order('Pholidota',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['pangolin']),

    new Order('Pilosa',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['anteater', 'sloth']),

    new Order('Primates',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['monkey', 'mangabey', 'mandrill', 'baboon', 'colobus', 'langur', 'gorilla', 'human', 'chimpanzee', 'orangatan', 'gibbon', 'marmoset', 'tamarin', 'tarsier', 'lemur', 'bushbaby', 'galago', 'loris', 'potto']),

    new Order('Proboscidea',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['elephant']),

    new Order('Rodentia',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['squirrel', 'mouse', 'scaly-tail', 'beaver', 'gopher', 'rat', 'gundi', 'pectinator', 'guinea pig', 'cavy', 'paca', 'agouti', 'acouchi', 'chinchilla', 'pacarana', 'porcupine', 'hutia', 'tuco-tuco', 'guiara', 'coypu', 'degu', 'coruro', 'mole-rat', 'jerboa', 'hamster', 'vole', 'akodont', 'lemming', 'colilargo', 'muskrat', 'hocicudo', 'tapecua', 'ammodile', 'gerbil', 'antsangy', 'dormouse', 'zokor', 'spalax', 'flying squirrel', 'prairie dog', 'marmot']),

    new Order('Scandentia',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['treeshrew']),

    new Order('Sirenia',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['dugong', 'manatee']),

    new Order('Tubulidentata',
    'desc',
    'pic_name',
    'pic_file',
    'pic_attr',
    ['aardvark'])
]

const num_orders =order_list.length; //update this!
