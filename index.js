const form = document.getElementById("form");
const formInput = document.getElementById("form__input");
const formBtn = document.getElementById("form__button");
const wrapperList = document.querySelector(".wrapper-list");

form.addEventListener("click", function (event) {
  event.preventDefault();
  let profile = formInput.value;
  if(profile==="" || !profile.trim()) return
  let originalProfile=profile.split(' ').join('')
  getFetchReguest(originalProfile)
  formInput.value=""
}); 

async function getFetchReguest(profile) {
  let data = await fetch(`https://api.github.com/users/${profile}`).then(
    (response) => response.json()
  );

  // wrapperList.insertAdjacentHTML("afterbegin", getHtml(data));
  wrapperList.innerHTML=getHtml(data)

}



function getHtml({ id, name, avatar_url, html_url,followers,following }) {
  if(id ==="undefined" || name==="undefined" ) {
    return `<h1>Not found</h1>`
  }
  if(!name) return `<h1>Not Found</h1>`
  if(!avatar_url) return  `<h1>Not Found</h1>`
  return `
    
    <div class="col-xl-12">
    <a target="_blank" href="${html_url}" class="parent__href" href="#">
        <div class="list-box">
        <div class="list-box__image">
            <img src="${avatar_url}" alt=""/>
        </div>
        <div class="list-box__items">
            <h3>${name}</h3>
            <h5>id: <em>
                ${id}
            </em></h5>
            <a target="_blank" href="${html_url}" class="list_box__href" href="#">view profile</a>
        </div>
        <div>
    <h3>Followers:${followers}</h3>
    <h3>Following:${following}</h3>
    </div>
    </div>
   
    </a>
  
</div>
    
    `;
}
