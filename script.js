const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', function () {
  const isOpen = menu.classList.toggle('open');

  burger.setAttribute('aria-expanded', isOpen);
});

menu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('contactForm');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  form.querySelector('.ok').style.display = 'block';

  form.reset();
});
