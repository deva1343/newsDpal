document.addEventListener('DOMContentLoaded', function () {
  const newsContainer = document.getElementById('newsContainer');
  const trendingContainer = document.getElementById('trendingContainer');
  const breakingNewsContainer = document.getElementById('breakingNewsContainer');
  const navLinks = document.querySelectorAll('.navbar a');

  function fetchNews(category = 'all') {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        let posts = data.posts;
        if (category !== 'all') {
          posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        }
        renderLatestNews(posts);
        renderTrendingNews(posts);
        renderBreakingNews(posts);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error loading news. Please try again later.</p>';
      });
  }

  function openPost(slug) {
    window.open(`post.html?slug=${encodeURIComponent(slug)}`, '_blank');
  }

  function renderLatestNews(posts) {
    newsContainer.innerHTML = '';
    if (posts.length === 0) {
      newsContainer.innerHTML = '<p>No news available.</p>';
      return;
    }
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'news-card col';
      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.style.display='none'">
        <div class="news-card-content">
          <h3>${post.title}</h3>
          <p>${post.content.substring(0, 120)}...</p>
          <small>${post.category}</small>
        </div>
      `;
      card.addEventListener('click', () => openPost(post.slug));
      newsContainer.appendChild(card);
    });
  }

  function renderTrendingNews(posts) {
    trendingContainer.innerHTML = '';
    const trendingPosts = posts.slice(0, 3);
    trendingPosts.forEach(post => {
      const item = document.createElement('div');
      item.className = 'trending-item';
      item.innerHTML = `
        <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.style.display='none'">
        <div class="trending-item-content">
          <h4>${post.title}</h4>
          <small>${post.category}</small>
        </div>
      `;
      item.addEventListener('click', () => openPost(post.slug));
      trendingContainer.appendChild(item);
    });
  }

  function renderBreakingNews(posts) {
    breakingNewsContainer.innerHTML = '';
    const breakingNews = posts.slice(0, 6);

    breakingNews.forEach((post, index) => {
      const item = document.createElement('div');
      item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
      item.innerHTML = `
        <img src="${post.image}" class="d-block w-100" alt="${post.title}" />
        <div class="carousel-caption d-none d-md-block">
          <h5>${post.title}</h5>
          <p>${post.content.substring(0, 100)}...</p>
        </div>
      `;
      item.addEventListener('click', () => openPost(post.slug));
      breakingNewsContainer.appendChild(item);
    });
  }

  fetchNews();

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
      fetchNews(link.getAttribute('data-category'));
    });
  });
});
