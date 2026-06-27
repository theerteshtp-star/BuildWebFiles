function NewVideo() {
  fetch('./Video/VideoNew.txt')
    .then(res => res.text())
    .then(videoLink => {
      videoLink = videoLink.trim();

      // extract the YouTube video ID
      let videoId = '';
      if (videoLink.includes('youtu.be/')) {
        videoId = videoLink.split('youtu.be/')[1].split('?')[0];
      } else if (videoLink.includes('youtube.com/watch?v=')) {
        videoId = videoLink.split('watch?v=')[1].split('&')[0];
      } else if (videoLink.includes('youtube.com/shorts/')) {
        videoId = videoLink.split('youtube.com/shorts/')[1].split('?')[0];
      }

      // if we got an ID, set src & open popup; otherwise close it
      if (videoId) {
        // document.getElementById('popup-video').src =
        //   `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
        // document.getElementById('popup').style.display = 'flex';
        // document.body.classList.add('popup-open');

      const iframe = document.getElementById('popup-video');
       const popup  = document.getElementById('popup');

       // ensure popup stays hidden until video is fully loaded
      //  popup.style.display = 'none';

      iframe.onload = () => {
         popup.classList.add('visible');
          document.body.classList.add('popup-open');
        };

       // only setting src here—popup won’t appear until onload fires
       iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
      } else {
        closePopup();
      }
    })
    .catch(err => {
      console.error('Error loading video link:', err);
      closePopup();
    });
}
const splash = document.getElementById('splash-screen');

 const currentURL = window.location.href;
document.addEventListener('DOMContentLoaded', () => {
splash.classList.add('animate');

  setTimeout(() => {
    NewVideo();
    splash.classList.add('splash-hide');
  }, 800);
  
});


function closePopup() {
  document.getElementById('popup').style.display = 'none';
  document.body.classList.remove('popup-open');
}