const BASE_URL = `https://webdev.alphacamp.io`
const INDEX_URL = BASE_URL + '/api/movies/'
 const POSTER_URL = BASE_URL + '/posters/'

const movies = JSON.parse(localStorage.getItem("favoriteMovies"))
   //movies.dtat container
   console.log(movies)
// rander movies function
const dataPanel = document.querySelector('#data-panel')
//console.log(dataPanel)
function renderMovieList(data){
    let rowHtml = ``
     data.forEach((item)=>{
         rowHtml += `
          <div class="col-sm-3 col-6 ">         <!--先將四個格設好-->
               <!-- 每個裏再加一個div, mb-2 和下一層分開 -->
           <div class="mb-2">
               <!--  放入boostrap 的card元件，把width刪掉，因為row 已經設好了 -->
           <div class="card" style="width: 18rem;">
             <img src="${POSTER_URL + item.image}" class="card-img-top" alt="Movie Poster">
             <div class="card-body">
               <h5 class="card-title">${item.title}</h5>
             </div>
             <!-- footer and add tow buttons  -->
             <div class="card-footer ">
                <button type="button" class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">more</button>
                 <button type="button" class="btn btn-danger btn-remove-favorite" data-id="${item.id}">-</button>
             </div>
             <!-- card end -->

            </div>
          </div>
          </div>
         `
     })    
      dataPanel.innerHTML = rowHtml
}
// axios
//   .get(INDEX_URL)
//   .then(response =>{
//     //console.log(response)
//     movies.push(...response.data.results)
//     //console.log(response.data.results)
  renderMovieList(movies)   
// }).catch((err) =>{
//   console.log(err)
// })
 
function showMoveModal(id){
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')

  axios.get(INDEX_URL + id)
       .then(response => {
         console.log(response.data.results)
        const data = response.data.results
         modalTitle.innerText = data.title
         modalDate.innerText = `Release date :${data.release_date}`
         modalDescription.innerText = data.description
         modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="poster" id="movie-modal-image"></img>`
       })
 }

 //製作一個刪除favorite的函式
   function removeFromFavorite (id){
    console.log(id)
    if(!movies || !movies.length)return

    const movieIndex = movies.findIndex(movie=>movie.id===id)
     if(movieIndex === -1) return

    //  if(movies.some((movie)=>movie.id===id)){
    //     return alert('此電影已經在收藏清單中')
    //  }
     movies.splice(movieIndex,1)
    //  const aaa = JSON.stringify(list)
    //  console.log(JSON.parse(aaa))
      //localStorage.setItem("favoriteMovies",JSON.stringify(list))
     localStorage.setItem("favoriteMovies",JSON.stringify(movies))
     renderMovieList(movies)  
     
      
   }
// 電影清單的電影收藏的點擊事件
dataPanel.addEventListener ('click',function onPanelClicked(event){
  if (event.target.matches('.btn-show-movie')){
    showMoveModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')){
    console.log(event.target.dataset.id)
    removeFromFavorite(Number(event.target.dataset.id))
  }
})
// search bar setting
// const searchForm = document.querySelector("#search-form")
// const searchInput = document.querySelector("#search-input")
//  search form的 submit 提交事件

// searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
//   event.preventDefault() //新增這裡
//   //console.log(event)
//   const keyword = searchInput.value.trim().toLowerCase()
//   let filteredMovies = []
//   filteredMovies = movies.filter(movie=>movie.title.toLowerCase().includes(keyword))

    
//   if(filteredMovies.length === 0){
//       return alert(`你輸入的關鍵字:${keyword}沒有符合條件，請重新輸入`)
//   }else{
//     renderMovieList(filteredMovies)
//   }
  
// })

// 收藏清單
//local storage

//localStorage.setItem("default_language","englihs")
// console.log(localStorage.getItem("default_language"))
// localStorage.removeItem("default_language")
 // localStorage.setItem("default_language",JSON.stringify())
 //localStorage只能儲存字串，所以要轉成JSON的string