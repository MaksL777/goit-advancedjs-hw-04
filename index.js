/* empty css                      */import{a as S,S as v,i as n}from"./assets/vendor-DcHCnVjq.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&u(d)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function u(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const P="55900104-77b70d42c45e5d2cc95a09a21",q={image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function f(o,e){return(await S.get("https://pixabay.com/api/",{params:{key:P,q:o,page:e,...q}})).data}const m=document.querySelector(".gallery"),h=document.querySelector(".loader"),g=document.querySelector("#loadMore"),C=new v(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function y(){h.classList.remove("is-hidden")}function p(){h.classList.add("is-hidden")}function M(){m.innerHTML=""}function L(){g.classList.remove("visually-hidden")}function i(){g.classList.add("visually-hidden")}function b(o){const e=o.map(r=>`<li class="gallery-list-item">
      <a href="${r.largeImageURL}"><img src="${r.webformatURL}" alt="${r.tags}" /></a>
    <table>
      <tr>
        <th>Likes</th>
        <th>Views</th>
        <th>Comments</th>
        <th>Downloads</th>
      </tr>
      <tr>
        <td>${r.likes}</td>
        <td>${r.views}</td>
        <td>${r.comments}</td>
        <td>${r.downloads}</td>
      </tr>
    </table>
  </li>`).join("");m.insertAdjacentHTML("beforeend",e),C.refresh()}const B=document.querySelector(".form"),O=document.querySelector("#loadMore"),l={backgroundColor:"#ef4040",maxWidth:"432px",position:"topRight",icon:"fa-regular fa-times-circle",iconColor:"#fafafb",messageColor:"#fafafb",close:!1,closeOnClick:!0};let c="",s=1;const w=15;B.addEventListener("submit",async o=>{if(o.preventDefault(),c=o.target.elements.search.value.trim(),c===""){n.error({message:"Please enter a search term!",...l});return}s=1,M(),i(),y();try{const e=await f(c,s);if(e.totalHits===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",...l});return}b(e.hits),s*w<e.totalHits?L():i()}catch{n.error({message:"Something went wrong. Please try again!",...l})}finally{p()}});O.addEventListener("click",async()=>{s++,i(),y();try{const o=await f(c,s);b(o.hits);const e=document.querySelector(".gallery-list-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}s*w>=o.totalHits?(i(),n.info({message:"We're sorry, but you've reached the end of search results.",...l,backgroundColor:"#4e75ff"})):L()}catch{i(),n.error({message:"Something went wrong. Please try again!",...l})}finally{p()}});
//# sourceMappingURL=index.js.map
