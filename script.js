```javascript
// ===================================
// MOBILE MENU
// ===================================

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

if (burger && menu) {
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
}


// ===================================
// CONTACT FORM - WEB3FORMS
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const message = document.getElementById('formMessage');

    if (!submitButton || !message) {
      return;
    }

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    message.style.display = 'none';

    try {
      const formData = new FormData(contactForm);

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        message.textContent =
          'Thank you for reaching out! Our team will get back to you within 24 hours.';

        message.style.display = 'block';
        message.style.color = '#276749';

        contactForm.reset();
      } else {
        message.textContent =
          'Sorry, your message could not be sent. Please try again.';

        message.style.display = 'block';
        message.style.color = '#b91c1c';
      }
    } catch (error) {
      message.textContent =
        'Something went wrong. Please try again later.';

      message.style.display = 'block';
      message.style.color = '#b91c1c';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}
```
