
//     {
//         'name': 'Spring Pasta',
//         'url': 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
//         'description': 'This is very good',
//         'time': 60,
//         'servings': 4,
//     },
//     {
//         'name': 'Grilled Chicken Salad',
//         'url': 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
//         'description': 'A healthy and delicious choice',
//         'time': 30,
//         'servings': 2,
//     },
//     {
//         'name': 'Beef Tacos',
//         'url': 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600',
//         'description': 'Spicy and flavorful tacos',
//         'time': 45,
//         'servings': 6,
//     },
//     {
//         'name': 'Vegetable Stir Fry',
//         'url': 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=600',
//         'description': 'A quick and easy stir fry',
//         'time': 20,
//         'servings': 3,
//     },
//     {
//         'name': 'Chocolate Cake',
//         'url': 'https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=600',
//         'description': 'Rich and moist chocolate cake',
//         'time': 90,
//         'servings': 8,
//     },
//     {
//         'name': 'Caprese Salad',
//         'url': 'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=600',
//         'description': 'Fresh and light Italian salad',
//         'time': 15,
//         'servings': 2,
//     },
// ];

const items=[];

let selectedTile = -1;
const itemsListContainer = document.querySelector('#itemsListContainer');
const itemDescContainer = document.querySelector('#itemsDescContainer');
const searchBtn = document.querySelector('.searchBtn'); 

searchBtn.addEventListener('click', async () => {
    const searchValue = searchBtn.value || 'Pizza'; // Default to 'Pizza' if input is empty
    items=[];
    await getFoods(searchValue);
});


// fetch food data
const getFoods=async(searchValue)=>{
    const response=await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`);
    try{

        if(response.status>=200 && response.status<300){
            const data=await response.json();
            const list=data.data.recipes;
            list.forEach((e)=>{
                items.push(e);
            });
            console.log(items);
        }
    }catch(error){
        alert(error);
    }

    // Create and append items to the container
items.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('itemsListTile');
    
    // console.log(item.title);
    itemDiv.innerHTML = `
    <img src="${item.image_url}" alt="" class="circularImageContainer">
    <div class="textContentContainer">
    <p class="title">${item.title}</p>
    
    </div>
    `;
    
    itemDiv.addEventListener('click',()=>{
        // selectedTile=index;
        itemDescContainer.innerHTML=`<img src=${item.image_url}
                alt="" class="imageDescContainer">
            <i>
                <p class="descTitleContainer">
                    ${item.title}
                </p>
            </i>

            <div class="itemDetails">
                <div class="timeContainer">
                    <i class="fa-regular fa-clock"></i>
                    <b>30</b> Minutes
                </div>
                <div class="timeContainer">
                    <i class="fa-solid fa-person"></i>
                    <b>4</b> Servings
                </div>
                <div class="timeContainer">
                    <i class="fa-solid fa-plus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa fa-bookmark-o" aria-hidden="true"></i>

                </div>
            </div>`;
    })

    itemsListContainer.appendChild(itemDiv);
});
}

getFoods('Pizza');
