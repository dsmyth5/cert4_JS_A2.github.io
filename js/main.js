
const btn_get = document.getElementById("btn_get");
const form_text = document.getElementById("input_text");
const form_catagort = document.getElementById("catagory");
const form_color = document.getElementById("text_color");
const form_size = document.getElementById("text_size");
const image_contaier = document.getElementById("meme_image");

const btn_prev = document.getElementById("btn_back");
const error_div = document.getElementById("error_div");
const btn_next = document.getElementById("btn_forward");

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const img5 = document.getElementById("img5");

img1.addEventListener('click', function () {image_clicked(img1);} )
img2.addEventListener('click', function () {image_clicked(img2);} )
img3.addEventListener('click', function () {image_clicked(img3);} )
img4.addEventListener('click', function () {image_clicked(img4);} )
img5.addEventListener('click', function () {image_clicked(img5);} )


const web_url = "https://cataas.com/cat/"; //Cute?json=true&"

function image_clicked(object_id) {
    let img_id = object_id.attributes['image_id'].value;
    if (img_id)
    {
        let img_str = '<img src="'+web_url + img_id +'/says/'+
                        encodeURIComponent(form_text.value) +
                        form_color.value + form_size.value +'">';
        image_contaier.innerHTML = img_str;
        image_contaier.style.display = "block"
    }
}


const api_url = "https://cataas.com/api/cats?tags=";
let index = 0;
btn_prev.addEventListener('click', function () {
    index = (index > 1)? index-1 : 0;
    get_cats_clicked();
} )
btn_next.addEventListener('click', function () {
    index +=1;  //max?
    get_cats_clicked();
} )
btn_get.addEventListener('click', function () {
    index = 0;
    get_cats_clicked()
} )

async function get_cats_clicked() {
    let str = api_url  + form_catagort.value +"&limit=5&skip="+ index*5;
    const ret_fetch = await fetch(str);
    if (ret_fetch.ok == true)
    {
        const ret_json = await ret_fetch.json();
        console.log(ret_json);
        error_div.innerText = "Cats: "+ret_json.length;

        for (let i = 0; i < 5; i++)
        {
            let id = null;
            switch (i) {
                case 0: id = img1; break;
                case 1: id = img2; break;
                case 2: id = img3; break;
                case 3: id = img4; break;
                case 4: id = img5; break;
            }

            if ( (ret_json.length -1) >= i)
            {
                let url_str = String("url(" +web_url + ret_json[i]._id+ ")");
                id.style.backgroundImage = url_str;
                id.attributes['image_id'].value = ret_json[i]._id;
            }
            else
            {
                id.style.backgroundImage = 'none';
                id.attributes['image_id'].value = "";
            }
        }
    }
    else
    {
        error_div.innerText = "Error. return 0";
        image_contaier.innerHTML = '<p>Error getting picture</p>'
    }
}