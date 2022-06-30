const arrows = document.querySelectorAll(".arrow");
const apikey ="d79ffd5406c8ddfc7274002e652eca44";
const baseImgUrl ="https://image.tmdb.org/t/p/w500/";
const movieLists = document.querySelectorAll(".movie-list");
arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});

//TOGGLE

// const ball = document.querySelector(".toggle-ball");
// console.log(ball);
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);
// ball.addEventListener("click", () => {
//   items.forEach((item) => {
//     item.classList.toggle("active");
//   });
//   ball.classList.toggle("active");
// });

 /* 
    API REQUESTS
 */


const SearchResults = document.querySelector("#search-results");
const main = document.querySelector("main");
const returnhome = document.querySelector("#return");
let moviequery = async (value)=>{
  const config ={params :{q : value}};
  let ans = await axios.get("https://api.tvmaze.com/search/shows",config);
  return ans.data;
};
let submit = document.querySelector("#query-form");
const input =submit.elements.query;
  submit.addEventListener("submit",async (e)=>{
  e.preventDefault();
  e.stopPropagation();
  main.style.display="none";
  input.value="";
});
input.addEventListener("input",async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    SearchResults.innerHTML="";
    main.style.display="none";
    SearchResults.style.display="flex";
    const value = input.value;
    let results = await moviequery(value);
    console.log(results);
    for(let result of results)
    {
      if(result.show.image != null){
        const moviecarddiv = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("p");
        const rating = document.createElement("p");
        moviecarddiv.classList.add("movie-card");
        img.alt="image";
        img.src=result.show.image.medium;
        title.innerHTML=result.show.name;
        if(result.show.rating.average != null)
        {
          rating.innerHTML=`Rating : ${result.show.rating.average} / 10`;
        }
        else
        {
          rating.innerHTML=`Rating : Not-rated`;
        }
        moviecarddiv.appendChild(img);
        moviecarddiv.appendChild(title);
        moviecarddiv.appendChild(rating);
        SearchResults.appendChild(moviecarddiv);
      }
    }
  });
  returnhome.addEventListener("click",(e)=>{
    main.style.display="block";
    SearchResults.style.display="none";
  })
const trending = document.querySelector("#div1");
const trending1 = document.querySelector("#div2");
const trending2 = document.querySelector("#div3");
const trending3 = document.querySelector("#div4");


const movieAppender=async (dom1,url)=>{
  const config ={params :{api_key : apikey}};
  try{
    let ans = await axios.get(url,config);
    const results = ans.data.results;
    for(let result of results)
    {
      const newdiv = document.createElement("div");
      newdiv.classList.add("movie-list-item");
      newdiv.innerHTML=`<img class="movie-list-item-img" src="${baseImgUrl+result.backdrop_path}" alt="Image">
      <span class="movie-list-item-title">${result.original_title}</span>
      <p class="movie-list-item-desc">${result.overview}</p>
      <button class="movie-list-item-button">Watch</button>`
      dom1.appendChild(newdiv);
    }
  }
  catch(err){
    console.log("Error",err);
  }
}



const movieAppendertv = async (dom1,url)=>{
  const config ={params :{api_key : apikey}};
  try{
    let ans = await axios.get(url,config);
    const results =ans.data.results;
    console.log(results);
  for(let result of results)
  {
    const newdiv = document.createElement("div");
    newdiv.classList.add("movie-list-item");
    newdiv.innerHTML=`<img class="movie-list-item-img" src="${baseImgUrl+result.backdrop_path}" alt="Image">
    <span class="movie-list-item-title">${result.original_name}</span>
    <p class="movie-list-item-desc">${result.overview}</p>
    <button class="movie-list-item-button">Watch</button>`
    dom1.appendChild(newdiv);
  }
  }
  catch (err){
    console.log("Error",err);
  }
}
const movieAppenderpop = async (dom1,url)=>{
  const config ={params :{api_key : apikey}};
  try{
    let ans = await axios.get(url,config);
    const results = ans.data.results;
    console.log(results);
    for(let result of results)
    {
      const newdiv = document.createElement("div");
      newdiv.classList.add("movie-list-item");
      newdiv.innerHTML = `<img class="movie-list-item-img" src="${baseImgUrl+result.backdrop_path}" alt="Image">
      <span class="movie-list-item-title">${result.title}</span>
      <p class="movie-list-item-desc">${result.overview}</p>
      <button class="movie-list-item-button">Watch</button>`
      dom1.appendChild(newdiv);
    }
  }
  catch (err){
    console.log("Error",err);
  }
}
const movieAppenderrated = async (dom1,url)=>{
  const config ={params :{api_key : apikey}};
  try{
    let ans = await axios.get(url,config);
   const results =ans.data.results;
  console.log(results);
  for(let result of results)
  {
    const newdiv = document.createElement("div");
    newdiv.classList.add("movie-list-item");
    newdiv.innerHTML = `<img class="movie-list-item-img" src="${baseImgUrl+result.backdrop_path}" alt="Image">
    <span class="movie-list-item-title">${result.title}</span>
    <p class="movie-list-item-desc">${result.overview}</p>
    <button class="movie-list-item-button">Watch</button>`
    dom1.appendChild(newdiv);
  }
  }
  catch (err){
    console.log("Error",err);
  }
}
const initialize = async () =>{
    await movieAppender(trending,"https://api.themoviedb.org/3/trending/movie/week");
    await movieAppendertv(trending1,"https://api.themoviedb.org/3/trending/tv/week");
    await movieAppenderpop(trending2,"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc");
    await movieAppenderrated(trending3,"https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc");
}
initialize()
.catch(err =>{
    console.log("Error",err);
})