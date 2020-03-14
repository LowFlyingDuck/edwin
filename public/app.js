function setProgress(progress) {
  if (progress >= 50 && progress <= 100) {
    document.querySelector('.container-right').style.overflow = 'visible';
    document.getElementById('background').style.display = 'block';
  } else if (progress < 50 && progress <= 100) {
    document.querySelector('.container-right').style.overflow = 'hidden';
    document.getElementById('background').style.display = 'none';
  } else {
    return false;
  }
  document.getElementById('swiper').style.transform = `rotate(${progress * 3.6}deg)`;
  document.querySelector('.progress').textContent = progress + '%';
}