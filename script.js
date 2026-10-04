const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const langToggle = document.getElementById('langToggle');
let currentLang = 'ar';

function applyLanguage(lang) {
  currentLang = lang;
  const isArabic = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  if (langToggle) {
    langToggle.textContent = isArabic ? 'EN' : 'AR';
  }

  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    const text = isArabic ? el.dataset.ar : el.dataset.en;
    if (!text) return;
    const hasHtml = text.includes('<');
    if (hasHtml) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  document.querySelectorAll('.nav nav a, .nav-cta, .text-link, .btn, .mail').forEach(el => {
    if (el.hasAttribute('data-ar') && el.hasAttribute('data-en')) {
      const text = isArabic ? el.dataset.ar : el.dataset.en;
      if (text && text.includes('<')) {
        el.innerHTML = text;
      } else if (text) {
        el.textContent = text;
      }
    }
  });
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
  });
}

applyLanguage('ar');

const filters=document.querySelectorAll(".filter button");
const projects=document.querySelectorAll(".project");
filters.forEach(btn=>btn.addEventListener("click",()=>{
 filters.forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const f=btn.dataset.filter;
 projects.forEach(p=>{p.style.display=f==="all"||p.dataset.type===f?"block":"none"});
}));

const lightbox=document.getElementById("lightbox"), content=document.querySelector(".lightbox-content");
document.querySelector(".close").onclick=()=>{lightbox.classList.remove("open");content.innerHTML=""};
lightbox.addEventListener("click",e=>{if(e.target===lightbox){lightbox.classList.remove("open");content.innerHTML=""}});
document.querySelectorAll(".media").forEach(media=>{
 media.addEventListener("click",()=>{
   const img=media.querySelector("img");
   const video=media.dataset.video;
   if(img && img.style.display!=="none"){content.innerHTML=`<img src="${img.src}" alt="">`;lightbox.classList.add("open")}
   else if(video){content.innerHTML=`<video src="${video}" controls autoplay playsinline></video>`;lightbox.classList.add("open")}
 });
});
document.querySelector(".menu").addEventListener("click",()=>{
 const nav=document.querySelector(".nav nav");
 nav.style.display=nav.style.display==="flex"?"none":"flex";
 if(nav.style.display==="flex"){nav.style.position="absolute";nav.style.top="70px";nav.style.left="0";nav.style.right="0";nav.style.padding="25px 6vw";nav.style.background="#f4f1eb";nav.style.flexDirection="column";nav.style.gap="20px"}
});
