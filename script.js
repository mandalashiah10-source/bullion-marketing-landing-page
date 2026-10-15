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


const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    const originalText = submitButton
      ? submitButton.textContent
      : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const formData = new FormData(contactForm);
      formData.set(
  "access_key",
  contactForm.querySelector('[name="access_key"]').value
);

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
      } else {
        alert('Could not send message: ' + result.message);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
}

