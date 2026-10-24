
(function () {
  var views = {
    home: document.getElementById('view-home'),
    blog: document.getElementById('view-blog'),
    faq: document.getElementById('view-faq')
  };

  var postSection = null;

  function clearPost() {
    if (postSection) {
      postSection.remove();
      postSection = null;
    }
  }

  function markCurrent(name) {
    document.querySelectorAll('.menu a').forEach(function (link) {
      link.removeAttribute('aria-current');
    });

    var target =
      name === 'blog' ? '#blog' :
      name === 'faq' ? '#faq' : null;

    var currentLink = target
      ? document.querySelector('.menu a[href="' + target + '"]')
      : null;

    if (!currentLink && name === 'blog') {
      currentLink = document.querySelector('.menu a[href="blog.html"]');
    }

    if (!currentLink && name === 'faq') {
      currentLink = document.querySelector('.menu a[href="faq.html"]');
    }

    if (currentLink) {
      currentLink.setAttribute('aria-current', 'page');
    }
  }

  function show(name) {
    clearPost();

    Object.keys(views).forEach(function (key) {
      if (views[key]) {
        views[key].hidden = key !== name;
      }
    });

    markCurrent(name);
  }

  function goToSection(id) {
    show('home');

    var target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function openPost(slug) {
    clearPost();
    window.__slug = slug;

    Object.keys(views).forEach(function (key) {
      if (views[key]) {
        views[key].hidden = true;
      }
    });

    postSection = document.createElement('section');
    postSection.className = 'blog-section';
    postSection.innerHTML =
      '<div class="wrap narrow">' +
      '<a class="back-link" href="#" id="backLink">← Back to all posts</a>' +
      '<article id="postBody"></article></div>';

    document.querySelector('footer').before(postSection);

    showPost();
    markCurrent('blog');
    window.scrollTo(0, 0);

    document.getElementById('backLink').addEventListener('click', function (event) {
      event.preventDefault();
      show('blog');
      window.scrollTo(0, 0);
    });
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');

    if (!link) return;

    var href = link.getAttribute('href') || '';

    if (/^(https?:|tel:|mailto:)/.test(href)) {
      return;
    }

    if (href === '#') {
      event.preventDefault();
      return;
    }

    if (
      href.indexOf('blog-post.html?post=') === 0
    ) {
      event.preventDefault();
      openPost(decodeURIComponent(href.split('post=')[1]));
    } else if (
      href === 'blog.html' ||
      href === '#blog'
    ) {
      event.preventDefault();
      show('blog');
      window.scrollTo(0, 0);
    } else if (
      href === 'faq.html' ||
      href === '#faq'
    ) {
      event.preventDefault();
      show('faq');
      window.scrollTo(0, 0);
    } else if (href.charAt(0) === '#') {
      event.preventDefault();
      goToSection(href.slice(1) || 'home');
    }
  });
})();
