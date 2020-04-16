var score = 0;
var number_found = 0;
const penalty = 0.25;
//var had_unrec_input = false;
var game_over = false;

var results_cols= {
    0 : document.getElementById("result_column0"),
    1 : document.getElementById("result_column1"),
    2 : document.getElementById("result_column2")
}



$(document).ready(function() {
    $(".alert").hide();
});

function submit_input(){

    if (game_over) return;

    var the_input = document.getElementById("the_input");
    //var message_div = document.getElementById("message_div");
    var ans = the_input.value;
    if (used.has(ans))
    {
        //message_div.innerHTML = `<span class="tbg"> You have already entered that: Order ${names_to_order[ans]}</span>`;
        the_input.value = "";
        the_input.focus;
        return;
    }
    //var para = document.createElement("p");

    if (ans in names_to_order){
        

        used.add(ans);
        var order = names_to_order[ans];
        if (! orders_found.has(order.name)){
            //order_to_done[order] = true
            document.getElementById("new_found").innerHTML = `New Order found: ${order.name}.`;
            $("#new_found").fadeTo(2000, 500).slideUp(500, function(){
                $("#new_found").slideUp(500);
            });
            score = score + 1;
            number_found++;
            updateScore();
            //var order_div = document.createElement("p");
            orders_found.add(order.name);

            var col_num = (number_found - 1) % 3;
            var results_div = results_cols[col_num];
            results_div.innerHTML =  results_div.innerHTML + `
            <div  class="card left-pane">
                <div class="card-body">
                    <div class="text-wrapper">
                        <h4 class="card-title"><img class="circle_pic"  src="pics/${order.pic_file}" alt="alternative" onclick="set_pic_str('${order.name}')"> ${order.name}</h4>
                        <p><i>${order.descr}</i></p>
                        <p id="${order.name}_answers"><span style="color:rgb(72, 252, 35)">${ans} (+1)</span></p>
                    </div>
                </div>
            </div>
            `

            //order_to_div[order.name] = order_div;

            //message_div.innerHTML = `<span class="tbg">New Order found!</span>`;

            set_pic(order);

            if (number_found >= num_orders){
                end_game()
            }
        }
        else{
            score = score - penalty
            updateScore()
            //var order_div = order_to_div[order.name]
            //order_div.innerHTML = order_div.innerHTML + `<span class="tbg">,  <font color="red">${ans} (-0.25)</font></span>`
            answer_div = document.getElementById(order.name+"_answers");
            answer_div.innerHTML = answer_div.innerHTML + `, <span style="color:red">${ans} (-0.25)</span>`;
            
            repeat_alert = document.getElementById("repeat");

            repeat_alert.innerHTML = `Oops, ${ans} is in ${order.name}.`;

            $("#repeat").fadeTo(2000, 500).slideUp(500, function(){
                $("#repeat").slideUp(500);
            });
            //message_div.innerHTML = `<span class="tbg">Oops, ${ans} is in ${order.name}.</span>`;

            set_pic(order);
        }
        the_input.value = "";
    }
    else{
        $("#not_found").fadeTo(2000, 500).slideUp(500, function(){
            $("#not_found").slideUp(500);
        });
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
    if (!game_over){
        game_over = true;

        //var message_div = document.getElementById("message_div");
        //message_div.innerHTML = `<span class="tbg">Game over!</span>`;
        $("#game_over").fadeTo(2000, 500).slideUp(500, function(){
            $("#game_over").slideUp(500);
        });
        //document.getElementById("done_button").disabled = "true";
        //document.getElementById("show_answers_button").style.display="inline";
        show_answers();
    }
}

function set_pic(order){

    //document.body.style.backgroundImage= "url(pics/" + order.pic_file +")";
    document.getElementById("animal_image").src = "pics/" + order.pic_file;

    document.getElementById("image_credit_div").innerHTML = `<p>${order.pic_name}</p> <p> ${order.pic_attr}</p>`;
}

function set_pic_str(order_name){
    set_pic(names_to_order[order_name])
}


function show_answers(){
    var i;
    var orders_printed = number_found;
    for (i=0;i < order_list.length;++i){
        order = order_list[i];
        var member_list_p;
        var first_answer;
        if (order.name in orders_found){
            member_list_p = document.getElementById(order.name + "_answers");
            first_answer = false;
        }
        else{
            var col_num = orders_printed % 3;
            results_cols[col_num].innerHTML += `
            <div  class="card left-pane">
                <div class="card-body">
                    <div class="text-wrapper">
                        <h4 class="card-title"><img class="circle_pic"  src="pics/${order.pic_file}" alt="alternative" onclick="set_pic_str('${order.name}')">
                         <span style="color:yellow">${order.name}</span> </h4>
                        <p><i>${order.descr}</i></p>
                        <p id="${order.name}_answers"></p>
                    </div>
                </div>
            </div>
            `;
            first_answer = true;
            orders_printed++;
        }
        var member_list_p = document.getElementById(order.name + "_answers");
        var k;
        for (k=0; k < order.members.length; ++k){
            if (! used.has(order.members[k])){
                if (first_answer){
                    member_list_p.innerHTML = order.members[k];
                    first_answer = false;
                }
                else{
                    member_list_p.innerHTML += `, ${order.members[k]}`;
                }
            }
        }
    }
}

var used = new Set();

var orders_found = new Set();

var names_to_order = {};

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
        names_to_order[name] = this;
    }
}

order_list = [
    new Order("Afrosoricida",
    "African golden moles, tenrecs, and otter shrews.",
    'Lowland streaked tenrec',
    'lowland_streaked_tenrec.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Lowland_Streaked_Tenrec,_Mantadia,_Madagascar.jpg" title="via Wikimedia Commons">Frank Vassen</a> / <a href="https://creativecommons.org/licenses/by/2.0">CC BY</a>',
    ['tenrec', 'otter shrew', 'golden mole']),

    new Order("Artiodactyla",
    "A large order of hoofed mammals, the even-toed ungulates.",
    "Okapi",
    'okapi.jpg',
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
    'killerwhales_jumping.jpg',
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
    'colugo.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Colugo_(Galeopterus_variegatus,_adult_female),_Central_Catchment_Area,_Singapore_-_20060618.jpg" title="via Wikimedia Commons">Lip Kee Yap.</a> / <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA</a>',
    ['colugo', 'flying lemur']),

    new Order('Didelphimorphia',
    'Opossums (not possums).',
    'North American Opossum',
    'opossum.jpg',
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
    'tree_hyrax.jpg',
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
    "elephant_shrew.jpg",
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
    'mar_mole.jpg',
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
    'Odd-toed ungulates are hoofed animals—ungulate—which bear most of their weight on one (an odd number) of the five toes.',
    "Burchell's Zebras",
    'zebra.jfif',
    '<a href="https://commons.wikimedia.org/wiki/File:Fighting_Burchell%27s_Zebras_in_Addo_National_Elephant_Park.JPG" title="via Wikimedia Commons">Kore</a> / <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA</a>',
    ['horse', 'zebra', 'donkey', 'rhinoceros', 'rhino', 'tapir']),

    new Order('Pholidota',
    'Pangolins: the only mammals with scales.',
    'Giant pangolin',
    'pangolin.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Manis_gigantea_01_by_Line1.JPG" title="via Wikimedia Commons">Liné1</a> / <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA</a>',
    ['pangolin']),

    new Order('Pilosa',
    'Latin for "hairy. Includes anteaters and sloths.',
    'Giant anteater',
    'anteater.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Myrmecophaga_tridactyla_-Detroit_Zoo,_Michigan,_USA-8a.jpg" title="via Wikimedia Commons">Ellen from Ann Arbor, MI, USA</a> / <a href="https://creativecommons.org/licenses/by/2.0">CC BY</a>',
    ['anteater', 'sloth']),

    new Order('Primates',
    'Monkeys, apes, humans, and more.',
    'pic_name',
    'tamarin.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Golden_lion_tamarin_family.jpg" title="via Wikimedia Commons">Steve from washington, dc, usa</a> / <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA</a>',
    ['monkey', 'mangabey', 'mandrill', 'baboon', 'colobus', 'langur', 'gorilla', 'human', 'chimpanzee', 'orangatan', 'gibbon', 'marmoset', 'tamarin', 'tarsier', 'lemur', 'bushbaby', 'galago', 'loris', 'potto', 'ape']),

    new Order('Proboscidea',
    'Elephants!',
    'F_MU1, the Elephant',
    'land_of_giants.jpg',
    '<a href="http://blog.burrard-lucas.com/2019/03/elephant-queen/">Will Burrard-Lucas</a>',
    ['elephant']),

    new Order('Rodentia',
    'Rodents.',
    'Capybara',
    'rodent.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Hydrochaeris_hydrochaeris.jpg" title="via Wikimedia Commons"Egg assumed.</a> / <a href="https://creativecommons.org/licenses/by-sa/2.5">CC BY-SA</a>',
    ['capybara','squirrel', 'mouse', 'scaly-tail', 'beaver', 'gopher', 'rat', 'gundi', 'pectinator', 'guinea pig', 'cavy', 'paca', 'agouti', 'acouchi', 'chinchilla', 'pacarana', 'porcupine', 'hutia', 'tuco-tuco', 'guiara', 'coypu', 'degu', 'coruro', 'mole-rat', 'jerboa', 'hamster', 'vole', 'akodont', 'lemming', 'colilargo', 'muskrat', 'hocicudo', 'tapecua', 'ammodile', 'gerbil', 'antsangy', 'dormouse', 'zokor', 'spalax', 'flying squirrel', 'prairie dog', 'marmot']),

    new Order('Scandentia',
    'In the past, various authors proposed to place treeshrews in the ordinal rank Insectivora, or considered them close relatives of primates. Since 1972, the treeshrew families are grouped in this order.',
    'Pygmy treeshrew',
    'treeshrew.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Tupaia_minor.jpg" title="via Wikimedia Commons">Paul J. Morris</a> / <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA</a>',
    ['treeshrew']),

    new Order('Sirenia',
    'Commonly referred to as sea-cows or sirenians, are an order of fully aquatic, herbivorous mammals.',
    'Manatee',
    'manatee.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Mother_manatee_and_calf.jpg" title="via Wikimedia Commons">Sam Farkas (NOAA Photo Library)</a> / Public domain',
    ['dugong', 'manatee']),

    new Order('Tubulidentata',
    'Although there are many fossil species, the only species surviving today is the aardvark.',
    'Aardvark',
    'aardvark.jpg',
    '<a href="https://commons.wikimedia.org/wiki/File:Aardvarks.jpg" title="via Wikimedia Commons">Scotto Bear from North Beach, MD, USA</a> / <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA</a>',
    ['aardvark'])
]

const num_orders =order_list.length; //update this!
