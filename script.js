
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

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );
    const message = document.getElementById('formMessage');

    if (!submitButton || !message) return;

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

const BLOG_POSTS = [
  {
    slug: '5-seo-steps-every-small-business-should-do-first',
    title: '5 SEO Steps Every Small Business Should Do First',
    date: '2026-10-15',
    category: 'SEO',
    readTime: '4 min read',
    excerpt: 'Not sure where to start with SEO? These five simple steps help customers find your business on Google.',
    content: `
      <p>SEO means making it easier for people to find your business on Google. You do not need a big budget to start. These five steps give you a strong base.</p>
      <h2>1. Claim your Google Business Profile</h2>
      <p>Add your business name, address, phone number, working hours and photos. This helps you show up on Google Maps and in "near me" searches.</p>
      <h2>2. Use the words your customers use</h2>
      <p>Think about what a customer would type into Google to find you. Use those words in your page titles, headings and descriptions.</p>
      <h2>3. Make your website fast and mobile friendly</h2>
      <p>Most people browse on their phones. If your site is slow or hard to read on a small screen, visitors leave quickly and Google notices.</p>
      <h2>4. Write helpful content</h2>
      <p>Answer the questions your customers ask again and again. A simple blog post or FAQ can bring new visitors every month.</p>
      <h2>5. Collect genuine reviews</h2>
      <p>Ask happy customers to leave a review on Google. Real reviews build trust and help more people choose you.</p>
      <p>SEO takes time, so be patient and keep improving a little every week.</p>
    `
  },
  {
    slug: 'why-short-videos-bring-more-customers',
    title: 'Why Short Videos Bring More Customers',
    date: '2026-10-12',
    category: 'Video',
    readTime: '3 min read',
    excerpt: 'Short videos and reels help people understand your business in seconds. Here is how to use them well.',
    content: `
      <p>People scroll fast. A short video can show what you sell, who you are and why people should trust you in just a few seconds.</p>
      <h2>Show, do not just tell</h2>
      <p>Show your products being made, a customer receiving an order or a quick tip from your team. Real moments feel more trustworthy than a polished advert.</p>
      <h2>Keep it short and clear</h2>
      <p>Start with the most interesting part in the first few seconds. Add captions, because many people watch without sound.</p>
      <h2>Post regularly</h2>
      <p>One good video every week is better than ten videos in one day and then silence. Regular posting helps people remember your brand.</p>
      <h2>End with one clear action</h2>
      <p>Tell viewers what to do next: call, message on WhatsApp or visit your page. One clear step works better than many.</p>
    `
  },
  {
    slug: 'how-to-choose-the-right-digital-marketing-agency',
    title: 'How to Choose the Right Digital Marketing Agency',
    date: '2026-10-08',
    category: 'Marketing',
    readTime: '4 min read',
    excerpt: 'Questions to ask before you hire an agency, so you work with a team that fits your business and goals.',
    content: `
      <p>Choosing an agency is a big decision. A good one acts like part of your team. Here is what to look for.</p>
      <h2>Start with your goals</h2>
      <p>Know what you want: more calls, more online orders or more people knowing your brand. A good agency will ask about your goals before it talks about services.</p>
      <h2>Ask what they will actually do</h2>
      <p>Ask for a clear list of work and a timeline. Be careful of anyone who promises results that sound too good to be true.</p>
      <h2>Check how they report</h2>
      <p>You should receive simple reports on what was done and what changed. If you cannot understand the report, ask them to explain it.</p>
      <h2>Look for real work and real feedback</h2>
      <p>Ask to see examples of past work and, where possible, speak to a client. It tells you more than any sales pitch.</p>
      <h2>Make sure you can talk to them easily</h2>
      <p>Good communication matters. You should know who to contact and get replies in a reasonable time.</p>
    `
  }
];

const posts = BLOG_POSTS.slice().sort(function (a, b) {
  return new Date(b.date) - new Date(a.date);
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function postLink(post) {
  return 'blog-post.html?post=' + encodeURIComponent(post.slug);
}

function makeCard(post) {
  const card = makeElement('article', 'card post-card');
  const title = makeElement('h3');
  const titleLink = makeElement('a', '', post.title);

  titleLink.href = postLink(post);
  title.appendChild(titleLink);

  const readMore = makeElement('a', 'read-more', 'Read more →');
  readMore.href = postLink(post);

  card.appendChild(makeElement('span', 'tag', post.category));
  card.appendChild(title);
  card.appendChild(makeElement('p', 'excerpt', post.excerpt));
  card.appendChild(
    makeElement(
      'p',
      'post-meta',
      formatDate(post.date) + ' · ' + post.readTime
    )
  );
  card.appendChild(readMore);

  return card;
}

function showBlogList() {
  const list = document.getElementById('blogList');
  const filters = document.getElementById('blogFilters');

  if (!list || !filters || filters.dataset.initialized === 'true') {
    return;
  }

  filters.dataset.initialized = 'true';

  const categories = ['All'];
  posts.forEach(function (post) {
    if (!categories.includes(post.category)) {
      categories.push(post.category);
    }
  });

  let activeCategory = 'All';

  function render() {
    list.innerHTML = '';

    const visible = posts.filter(function (post) {
      return activeCategory === 'All' ||
        post.category === activeCategory;
    });

    if (visible.length === 0) {
      list.appendChild(
        makeElement('p', '', 'No posts yet. Please check back soon.')
      );
    }

    visible.forEach(function (post) {
      list.appendChild(makeCard(post));
    });

    filters.querySelectorAll('button').forEach(function (button) {
      button.classList.toggle(
        'active',
        button.textContent === activeCategory
      );
    });
  }

  categories.forEach(function (category) {
    const button = makeElement('button', 'filter-btn', category);
    button.type = 'button';

    button.addEventListener('click', function () {
      activeCategory = category;
      render();
    });

    filters.appendChild(button);
  });

  render();
}

function showPost() {
  const body = document.getElementById('postBody');
  if (!body) return;

  const slug = window.__slug;
  const post = posts.find(function (item) {
    return item.slug === slug;
  });

  body.innerHTML = '';

  if (!post) {
    body.appendChild(makeElement('h1', '', 'Post not found'));
    body.appendChild(
      makeElement(
        'p',
        '',
        'Sorry, we could not find that post. Please go back and pick another one.'
      )
    );
    return;
  }

  document.title = post.title + ' | Bullion Marketing';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', post.excerpt);
  }

  const content = makeElement('div', 'article-content');
  content.innerHTML = post.content;

  const cta = makeElement('div', 'cta-box');
  cta.appendChild(
    makeElement('h3', '', 'Want help growing your business?')
  );
  cta.appendChild(
    makeElement('p', '', 'Talk to our team and get a free consultation.')
  );

  const button = makeElement('a', 'btn', 'Get Free Consultation');
  button.href = 'index.html#contact';
  cta.appendChild(button);

  body.appendChild(makeElement('span', 'tag', post.category));
  body.appendChild(makeElement('h1', '', post.title));
  body.appendChild(
    makeElement(
      'p',
      'post-meta',
      formatDate(post.date) + ' · ' + post.readTime
    )
  );
  body.appendChild(content);
  body.appendChild(cta);
}

if (document.getElementById('blogList')) {
  showBlogList();
}

if (document.getElementById('postBody')) {
  showPost();
}

const groups = Array.from(document.querySelectorAll('.faq-group'));
const searchBox = document.getElementById('faqSearch');
const filters = document.getElementById('faqFilters');
const emptyMessage = document.getElementById('faqEmpty');

let activeCategory = 'All';

function makeFilterButton(label) {
  if (!filters) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'filter-btn';
  button.textContent = label;

  button.addEventListener('click', function () {
    activeCategory = label;
    applyFilters();
  });

  filters.appendChild(button);
}

function applyFilters() {
  if (!searchBox || !filters || !emptyMessage) return;

  const searchText = searchBox.value.trim().toLowerCase();
  let visibleTotal = 0;

  groups.forEach(function (group) {
    const categoryMatches =
      activeCategory === 'All' ||
      group.dataset.category === activeCategory;

    let visibleInGroup = 0;

    group.querySelectorAll('details').forEach(function (item) {
      const textMatches =
        searchText === '' ||
        item.textContent.toLowerCase().includes(searchText);

      const shouldShow = categoryMatches && textMatches;
      item.hidden = !shouldShow;
      item.open = shouldShow && searchText !== '';

      if (shouldShow) visibleInGroup++;
    });

    group.hidden = visibleInGroup === 0;
    visibleTotal += visibleInGroup;
  });

  emptyMessage.hidden = visibleTotal !== 0;

  filters.querySelectorAll('button').forEach(function (button) {
    button.classList.toggle(
      'active',
      button.textContent === activeCategory
    );
  });
}

function addFaqSchema() {
  const questions = Array.from(
    document.querySelectorAll('.faq-group details')
  ).map(function (item) {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('p');

    return {
      '@type': 'Question',
      name: summary ? summary.textContent.trim() : '',
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer ? answer.textContent.trim() : ''
      }
    };
  });

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions
  });

  document.head.appendChild(script);
}

if (filters && searchBox && emptyMessage) {
  filters.innerHTML = '';
  makeFilterButton('All');

  groups.forEach(function (group) {
    makeFilterButton(group.dataset.category);
  });

  searchBox.addEventListener('input', applyFilters);
  applyFilters();
  addFaqSchema();
}

(function () {
  const views = {
    home: document.getElementById('view-home'),
    blog: document.getElementById('view-blog'),
    faq: document.getElementById('view-faq')
  };

  let postSection = null;

  function clearPost() {
    if (postSection) {
      postSection.remove();
      postSection = null;
    }
  }

  function updateUrl(name) {
    const hash =
      name === 'blog' ? '#blog' :
      name === 'faq' ? '#faq' : '';

    const newUrl = window.location.pathname +
      window.location.search + hash;

    window.history.replaceState(null, '', newUrl);
  }

  function markCurrent(name) {
    document.querySelectorAll('.menu a').forEach(function (link) {
      link.removeAttribute('aria-current');
    });

    const target =
      name === 'blog' ? '#blog' :
      name === 'faq' ? '#faq' : null;

    if (target) {
      const currentLink = document.querySelector(
        '.menu a[href="' + target + '"], ' +
        '.menu a[href="' +
        (name === 'blog' ? 'blog.html' : 'faq.html') + '"]'
      );

      if (currentLink) {
        currentLink.setAttribute('aria-current', 'page');
      }
    }
  }

  function show(name) {
    clearPost();

    Object.keys(views).forEach(function (key) {
      if (views[key]) {
        views[key].hidden = key !== name;
      }
    });

    if (name === 'blog') showBlogList();

    markCurrent(name);
    updateUrl(name);
  }

  function goToSection(id) {
    show('home');

    const target = document.getElementById(id);

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
      if (views[key]) views[key].hidden = true;
    });

    postSection = document.createElement('section');
    postSection.className = 'blog-section';
    postSection.innerHTML =
      '<div class="wrap narrow">' +
      '<a class="back-link" href="#blog" id="backLink">' +
      '← Back to all posts</a>' +
      '<article id="postBody"></article></div>';

    const footer = document.querySelector('footer');
    if (footer) {
      footer.before(postSection);
    } else {
      document.body.appendChild(postSection);
    }

    showPost();
    markCurrent('blog');
    updateUrl('blog');
    window.scrollTo(0, 0);

    const backLink = document.getElementById('backLink');

    if (backLink) {
      backLink.addEventListener('click', function (event) {
        event.preventDefault();
        show('blog');
        window.scrollTo(0, 0);
      });
    }
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';

    if (/^(https?:|tel:|mailto:)/.test(href)) return;

    if (href === '#') {
      event.preventDefault();
      return;
    }

    if (href.indexOf('blog-post.html?post=') === 0) {
      event.preventDefault();
      openPost(decodeURIComponent(href.split('post=')[1]));
    } else if (href === 'blog.html' || href === '#blog') {
      event.preventDefault();
      show('blog');
      window.scrollTo(0, 0);
    } else if (href === 'faq.html' || href === '#faq') {
      event.preventDefault();
      show('faq');
      window.scrollTo(0, 0);
    } else if (href.charAt(0) === '#') {
      event.preventDefault();
      goToSection(href.slice(1) || 'home');
    }
  });

  window.addEventListener('hashchange', function () {
    if (window.location.hash === '#blog') {
      show('blog');
    } else if (window.location.hash === '#faq') {
      show('faq');
    }
  });

  if (window.location.hash === '#blog') {
    show('blog');
  } else if (window.location.hash === '#faq') {
    show('faq');
  }
})();
