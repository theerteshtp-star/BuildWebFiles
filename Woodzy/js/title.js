(function() {
  const head = document.head;
  function addMeta(attrs) {
    const m = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => m.setAttribute(k, v));
    head.appendChild(m);
  }

  addMeta({ name: 'theme-color', content: '#f78d04' });
  addMeta({
    name: 'theme-color',
    media: '(prefers-color-scheme: light)',
    content: '#f78d04'
  });
  addMeta({
    name: 'theme-color',
    media: '(prefers-color-scheme: dark)',
    content: '#f78d04'
  });
  addMeta({ name: 'msapplication-TileColor', content: '#f78d04' });
  addMeta({ name: 'apple-mobile-web-app-capable', content: 'yes' });
  addMeta({
    name: 'apple-mobile-web-app-status-bar-style',
    content: '#f78d04'
  });
})();

const title = document.querySelector('.section-title1');
const startani = document.querySelector('.start_ani');
const ob = new IntersectionObserver((entr) => {
 entr.forEach((e)=>{
    if(e.isIntersecting){
        title.style.animation = "Sec_title 1.5s ease-out forwards";
    }
 })
},
{
    threshold:0.5,
}
);
ob.observe(startani);