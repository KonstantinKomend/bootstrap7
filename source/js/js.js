

const up= document.querySelector('.btn-open');
const down= document.querySelector('.btn-close');





up.addEventListener('click', function () {
    up.classList.add('disabled');
    down.classList.remove('disabled');
  });

  down.addEventListener('click', function () {
    down.classList.add('disabled');
    up.classList.remove('disabled');
  });