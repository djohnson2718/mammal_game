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
    document.getElementById("image_credit_div").innerHTML = `<span class="tbg"> Image Credit: ${order.pic_name}, ${order.pic_attr}</span>`;
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
    '<a href="https://commons.wikimedia.org/wiki/File:Lowland_Streaked_Tenrec,_Mantadia,_Madagascar.jpg" title="via Wikimedia Commons">Frank Vassen</a> / <a href="https://creativecommons.org/licenses/by/2.0">CC BY</a>',
    ['tenrec', 'otter shrew', 'golden mole']),

    new Order("Artiodactyla",
    "A large order of hoofed mammals, the even-toed ungulates.",
    "Okapi",
    'Okapi.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Saint-Aignan_(Loir-et-Cher)._Okapi.jpg" title="via Wikimedia Commons">Daniel Jolivet</a> / <a href="https://creativecommons.org/licenses/by/2.0">CC BY</a>',
    ['chevrotain', 'deer', 'moose', 'caribou', 'borckets', 'huemel', 'pudu', 'muntijac', 'bison', 'cattle', 'cow', 'buffalo', 'saola', 'nilgai', 'chowsingha', 'bushbuck', 'bongo', 'nyala', 'kudu', 'sitatunga', 'eland', 'impala', 'hartebeest', 'wildebeest', 'topi', 'bontebok', 'hirola', 'antelope', 'grysbok', 'steenbok', 'springbok', 'dibatag', 'gerenuk', 'saiga', 'blackbuck', 'gazelle', 'beira', 'dik-dik', 'oribi', 'klipspringer', 'chiru', 'takin', 'sheep', 'tahr', 'goat', 'ibex', 'chamois', 'goral', 'serows', 'muskox', 'duiker', 'addax', 'oryz', 'reedbuck', 'kob', 'lechwe', 'waterbuck', 'rhebok', 'pronghorn', 'giraffe', 'okapi', 'pig', 'warthog', 'bushpig', 'hog', 'peccary', 'camel', 'guanaco', 'vicuna', 'lama', 'alpaca', 'hippopotamus', 'hippo']),

    new Order('Carnivora',
    '16 families of mostly carnivorous and omnivorous mammals found worldwide.',
    'Canadian lynx',
    'lynx.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Canadian_lynx_by_Keith_Williams.jpg" title="via Wikimedia Commons">kdee64 (Keith Williams)</a> / <a href="https://creativecommons.org/licenses/by/2.0">CC BY</a>',
    ['dog', 'wolf', 'dhole', 'fox', 'bear', 'panda', 'raccoon', 'coati', 'kinkajou', 'olingo', 'ringtail', 'skunk', 'badger', 'weasel', 'otter', 'wolverine', 'tayra', 'marten', 'grison', 'polecat', 'mink', 'walrus', 'seal', 'sea lion', 'civet', 'cat', 'leopard', 'lion', 'tiger', 'jaguar', 'snow leopard', 'puma', 'jaguarundi', 'cougar', 'cheetah', 'lynx', 'serval', 'linsang', 'oyan', 'genet', 'binturong', 'hyena', 'aardwolf', 'mongoose', 'cusimanse', 'meerkat', 'fossa', 'falanouc', 'vontsira', 
'boky']),

    new Order('Cetacea',
    'Whales and dolphins.',
    'Orca',
    'Killerwhales_jumping.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Killerwhales_jumping.jpg" title="via Wikimedia Commons">Robert Pittman</a> / Public domain',
    ['whale', 'dolphin', 'narwhal', 'beluga', 'porpoise','orca']),

    new Order('Chiroptera',
    'Bats.',
    'Carollia brevicauda',
    'bat.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Carollia_brevicauda.jpg" title="via Wikimedia Commons">Diego Lizcano</a> / <a href="https://creativecommons.org/licenses/by/2.0">CC BY</a>',
    ['bat', 'flying fox']),

    new Order('Cingulata',
    'Armadillos.',
    'Pink fairy armadillo.',
    'arm.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Chlamyphorus_truncatus_-_Naturmuseum_Senckenberg_-_DSC02081.JPG" title="via Wikimedia Commons">Daderot</a> / CC0',
    ['armadillo']),

    new Order('Dasyuromorphia',
    'Most of the Australian carnivorous marsupials.',
    'Tasmanian Devil',
    'tasdevil.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Tasdevil_large.jpg" title="via Wikimedia Commons">Wayne McLean ( jgritz) Taken with Nikon D100.</a> / <a href="https://creativecommons.org/licenses/by-sa/2.5">CC BY-SA</a>',
    ['marsupial mice', 'pouched mice', 'mulgara', 'kaluta', 'kowari', 'quoll', 'dasyure', 'ningauis', 'dibbler', 'phascogales', 'wambenger', 'marsupial shrew', 'planigale', 'tasmanian devil', 'dunnart', 'numbat']),

    new Order('Dermoptera',
    'Cololgos (flying lemurs).',
    'Colugo',
    'Colugo.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Colugo_(Galeopterus_variegatus,_adult_female),_Central_Catchment_Area,_Singapore_-_20060618.jpg" title="via Wikimedia Commons">Lip Kee Yap.</a> / <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA</a>',
    ['colugo', 'flying lemur']),

    new Order('Didelphimorphia',
    'Opossums (not possums).',
    'North American Opossum',
    'Opossum.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Opossum_2.jpg" title="via Wikimedia Commons">Cody Pope</a> / <a href="https://creativecommons.org/licenses/by-sa/2.5">CC BY-SA</a>',
    ['opossum']),

    new Order('Diprotodontia',
    'Marsupial mammals including the kangaroos, wallabies, possums, koala, wombats, and many others.',
    'Eastern grey kangaroo',
    'kangaroo.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Eastern_grey_kangaroo_dec07_02.jpg" title="via Wikimedia Commons">fir0002  flagstaffotos [at] gmail.com		Canon 20D + Canon 400mm f/5.6 L</a> / <a href="http://www.gnu.org/licenses/old-licenses/fdl-1.2.html">GFDL 1.2</a>',
    ['wombat', 'koala', 'cuscus', 'possum', 'glider', 'kangaroo', 'wallaby', 'wallaroo', 'quokka', 'pademelon', 'bettong', 'potoroo', 'rat-kargaroo', 'tree-kangaroo']),

    new Order('Eulipotyphla',
    '"Truly fat and blind": hedgehogs, true shrews, moles, and more',
    'Hedgehog',
    'hedgehog.jfif',
    '<a href="https://commons.wikimedia.org/wiki/File:Igel.JPG" title="via Wikimedia Commons">Gibe</a> / <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA</a>',
    ['hedgehog', 'moonrat', 'gymnure', 'shrew', 'mole', 'desman', 'solenodon']),

    new Order('Hyracoidea',
    'Hyraxes',
    "Beecroft's Tree Hyrax",
    'TreeHyrax.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Beecroft%27sTreeHyrax.JPG" title="via Wikimedia Commons">Valerius Tygart</a> / <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA</a>',
    ['hyrax']),

    new Order('Lagomorpha',
    'Rabbits, hares, and pika.',
    'American Pika',
    'pika.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:American_pika_(ochotona_princeps)_with_a_mouthful_of_flowers.jpg" title="via Wikimedia Commons">Frederic Dulude-de Broin</a> / <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA</a>',
    ['rabbit', 'hare', 'pika']),

    new Order("Macroscelidea",
    "Elephant Shrews.",
    "Black and Rufous Elephant Shrew",
    "Black_and_Rufous_Elephant_Shrew.jpg",
    '<a href="https://commons.wikimedia.org/wiki/File:Rhynchocyon_petersi_from_side.jpg" title="via Wikimedia Commons">Joey Makalintal from Pennsylvania, USA</a> / <a href="https://creativecommons.org/licenses/by/2.0">CC BY</a>',
    ['elephant shrew']),

    new Order('Microbiotheria',
    'Only one extant species: the monita del monte.',
    'Monito del monte',
    'monte.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Monito_del_Monte_ps6.jpg" title="via Wikimedia Commons">Jose Luis Bartheld from Valdivia, Chile</a> / <a href="https://creativecommons.org/licenses/by/2.0">CC BY</a>',
    ['monito del monte']),

    new Order('Monotremata',
    'Egg laying mammals.',
    'Short-beaked echidna',
    'echidna.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Short-beaked_echidna_in_ANBG.jpg" title="via Wikimedia Commons">Gunjan Pandey</a> / <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA</a>',
    ['platypus', 'echidna']),

    new Order('Notoryctemorphia',
    'Marsupial moles (Austrailia).',
    'Southern marsupial mole',
    'MarMole.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:A_hand-book_to_the_marsupialia_and_monotremata_(Plate_XXXI)_(cropped).jpg" title="via Wikimedia Commons">Lydekker, Richard</a> / Public domain',
    ['marsupial mole']),

    new Order('Paucituberculata',
    'An order of South American marsupials. Although currently represented only by the seven living species of shrew opossums, this order was formerly much more diverse.',
    'Common shrew opossum',
    'cso.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:HyracodonFuliginosusWolf.jpg" title="via Wikimedia Commons">Joseph Wolf ?</a> / Public domain',
    ['shrew opossum', 'caenoldestid']),

    new Order('Peramelemorphia',
    'Includes the bandicoots and bilbies; it equates approximately to the mainstream of marsupial omnivores.',
    'Eastern Barred Bandicoot',
    'bandicoot.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Perameles_gunni.jpg" title="via Wikimedia Commons">JJ Harrison (https://www.jjharrison.com.au/)</a> / <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA</a>',
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
