
/**
* info: get page main element
* @type: Objects.
*/
const form_text = document.getElementById("input_text");
const form_catagory = document.getElementById("catagory");
const form_color = document.getElementById("text_color");
const form_size = document.getElementById("text_size");
const image_contaier = document.getElementById("meme_image");
const error_box = document.getElementById("error_box");

/**
* info: get image nav buttons
* @type Object.
*/
const btn_prev = document.getElementById("btn_back");
const btn_next = document.getElementById("btn_forward");

// const error_div = document.getElementById("error_div"); //todo

/**
* info: get image objects
* @type: Object
*/
const obj_img1 = document.getElementById("img1");
const obj_img2 = document.getElementById("img2");
const obj_img3 = document.getElementById("img3");
const obj_img4 = document.getElementById("img4");
const obj_img5 = document.getElementById("img5");

//store image elements into an array
const img_obj_array = [obj_img1, obj_img2, obj_img3, obj_img4, obj_img5];

//add event listerns to image clicks
obj_img1.addEventListener('click', function () {image_clicked(obj_img1);} )
obj_img2.addEventListener('click', function () {image_clicked(obj_img2);} )
obj_img3.addEventListener('click', function () {image_clicked(obj_img3);} )
obj_img4.addEventListener('click', function () {image_clicked(obj_img4);} )
obj_img5.addEventListener('click', function () {image_clicked(obj_img5);} )


/**
 * store last search string. retreive when page loads
 * @type string
 */
let last_search_str = window.localStorage.getItem("input_t")
// window.sessionStorage.setItem9)


/**
 *  info: current image sequece/page
 *  type: int
 */
let index = 0;

/**
 * website url
 * @type: string.
 */
const web_url = "https://cataas.com/cat/"; //Cute?json=true&"

/**
 *  website url to API
 *  @type: string.
 */
const api_url = "https://cataas.com/api/cats?tags=";

/**
 * display errors in page
 * @param string message to displau
 * @returns none
 */
function fn_display_error(str)
{
    if (str != "")
    {
        error_box.style.display = 'block'
        error_box.innerText = str;
    }
    else
    {
        error_box.style.display = 'none'
        error_box.innerText;
    }
}



/**
* info: fills in an element  with an image
* @param: object_id Object (image element/id)
* @return: none
*/
function image_clicked(object_id)
{
    let img_id = object_id.attributes['image_id'].value;
    if (img_id)
    {
        let img_str = '<img src="'+web_url + img_id +'/says/'+
                        encodeURIComponent(form_text.value) +
                        form_color.value + form_size.value +'">';
        image_contaier.innerHTML = img_str;
        image_contaier.style.display = "block";
    }
}

//on click button previous
btn_prev.addEventListener('click', function () {
    index = (index > 1)? index-1 : 0;
    fn_check_valid();
    get_cats_clicked();
} )
//on click button next
btn_next.addEventListener('click', function () {
    index +=1;  //max?
    fn_check_valid();
    get_cats_clicked();
} )
//on dropdown catagory changed
form_catagory.addEventListener('change', function () {
    index = 0;
    fn_check_valid();
    get_cats_clicked();
} )
//on form text changed. update pref only
form_text.addEventListener("change", function () {
    fn_check_valid();
} )


/**
 * check for a valid text input
 * @returns none
 */
function fn_check_valid()
{
    let str = String(form_text.value);
    if (str == "")
    {
        console.log("text not saved"); //validate input
        form_text.classList.add('red_bdr');
        fn_display_error("Empty field: meme text")
    }
    else
    {
        window.localStorage.setItem("input_t", str);
        form_text.classList.remove('red_bdr');
        fn_display_error("");
        console.log("text saved"); //validate input
    }
}


/**
 * info: get array of cats from api
 * @return: none
 */
async function get_cats_clicked()
{
    //return;
    let str = api_url  + form_catagory.value +"&limit=5&skip="+ index*5;
    const ret_fetch = await fetch(str);
    if (ret_fetch.ok == true)
    {
        const ret_json = await ret_fetch.json();
        // console.log(ret_json);
        // error_div.innerText = "Cats: "+ret_json.length;

        for (let i = 0; i < 5; i++)
        {
            let img_id = img_obj_array[i];
            if ( (ret_json.length -1) >= i)
            {
                let url_str = String("url(" +web_url + ret_json[i]._id+ ")");
                img_id.style.backgroundImage = url_str;
                img_id.attributes['image_id'].value = ret_json[i]._id;
            }
            else
            {
                img_id.style.backgroundImage = 'none';
                img_id.attributes['image_id'].value = "";
            }
        }
    }
    else
    {
        fn_display_error("Error fetching images");
    }
}


// initil page load. set user text string from prior session
if (last_search_str && last_search_str != "") {
    form_text.value = last_search_str;
}
get_cats_clicked(); // api call on page load

//show debug element
//fn_display_error("Debugger: test error");

