var search=document.querySelector(".search-input")
var button=document.querySelector(".search-button")
var temp=document.querySelector(".temp")
var container=document.querySelector(".container")
var link=document.querySelectorAll("ul li")


link.forEach(function (li){
    li.addEventListener("click",(i)=>{
       const ur=(i.target.textContent)

       var url = 'https://newsapi.org/v2/everything?' +
          `q=${ur}&` +
          'from=2024-03-14&' +
          'sortBy=popularity&' +
          'apiKey=a9eb263e9ba64c9ebd65b32a6e6320d2';

        var req = new Request(url);

        fetch(req)
            .then(function(response) {
                return(response.json());
            }).then((data)=>{
                container.innerHTML=""
                const articals=(data.articles)

            articals.forEach((i)=>{
            if(!i.urlToImage) return;
            else{
                const cards = temp.content.cloneNode(true);
                
                copy(cards,i)
                container.appendChild(cards)    
            }
            })
            })
    })
})

window.addEventListener("load",main)
function main(){
    var url ='https://newsapi.org/v2/everything?' +
    `q=india&` +
    'from=2024-03-14&' +
    'sortBy=popularity&' +
    'apiKey=a9eb263e9ba64c9ebd65b32a6e6320d2';
    var req = new Request(url);
    fetch(req)
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            container.innerHTML=""
            const articals=(data.articles)
            articals.forEach((i)=>{
                const cards = temp.content.cloneNode(true);      
                copy(cards,i)
                container.appendChild(cards)    
            })
            
        })
}



button.addEventListener("click",load)
function load(){
    var url = 'https://newsapi.org/v2/everything?' +
          `q=${search.value}&` +
          'from=2024-03-14&' +
          'sortBy=popularity&' +
          'apiKey=a9eb263e9ba64c9ebd65b32a6e6320d2';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        return(response.json());
    }).then((data)=>{
        container.innerHTML=""
        const articals=(data.articles)

    articals.forEach((i)=>{
    if(!i.urlToImage) return;
    else{
        const cards = temp.content.cloneNode(true);
        
        copy(cards,i)
        container.appendChild(cards)    
    }
    })
    })   

}

function copy(cards,i){
    const title=cards.querySelector(".title")
        const source=cards.querySelector(".source")
        const desc=cards.querySelector(".desc")
        const img=cards.querySelector("#news-img")

        title.textContent=i.title
        desc.textContent=i.description
        img.src = i.urlToImage;

        const date = new Date(i.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        
        });
        source.innerHTML=`${i.source.name} · ${date}`
        cards.firstElementChild.addEventListener("click",function(){
            window.open(i.url, "_blank");
        })

}