// script.js

document.addEventListener('DOMContentLoaded', function() {
  const newsContainer = document.getElementById('newsContainer');
  const trendingContainer = document.getElementById('trendingContainer');
  const navLinks = document.querySelectorAll('.navbar a');

  // Fetch news data from data.json and filter by category if needed
  function fetchNews(category = 'all') {
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        let posts = data.posts;
        if (category !== 'all') {
          posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        }
        renderLatestNews(posts);
        renderTrendingNews(posts);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error loading news. Please try again later.</p>';
      });
  }

  // Open post in a new window using the post's slug as query parameter
  function openPost(slug) {
    window.open(`post.html?slug=${encodeURIComponent(slug)}`, '_blank');
  }

  // Render the "Latest News" grid with clickable cards
  function renderLatestNews(posts) {
    newsContainer.innerHTML = '';
    if (posts.length === 0) {
      newsContainer.innerHTML = '<p>No news available.</p>';
      return;
    }
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'news-card col';
      let cardHTML = '';
      if (post.image) {
        cardHTML += `<img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.style.display='none'">`;
      }
      cardHTML += `<div class="news-card-content">`;
      cardHTML += `<h3>${post.title}</h3>`;
      cardHTML += `<p>${post.content.substring(0, 120)}...</p>`;
      cardHTML += `<small>${post.category}</small>`;
      cardHTML += `</div>`;
      card.innerHTML = cardHTML;
      // Click event: open post in new window
      card.addEventListener('click', function() {
        openPost(post.slug);
      });
      newsContainer.appendChild(card);
    });
  }

  // Render the "Trending" section (first 3 posts as trending) with clickable items
  function renderTrendingNews(posts) {
    trendingContainer.innerHTML = '';
    const trendingPosts = posts.slice(0, 3);
    trendingPosts.forEach(post => {
      const trendingItem = document.createElement('div');
      trendingItem.className = 'trending-item';
      let itemHTML = '';
      if (post.image) {
        itemHTML += `<img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.style.display='none'">`;
      }
      itemHTML += `<div class="trending-item-content">`;
      itemHTML += `<h4>${post.title}</h4>`;
      itemHTML += `<small>${post.category}</small>`;
      itemHTML += `</div>`;
      trendingItem.innerHTML = itemHTML;
      // Click event: open post in new window
      trendingItem.addEventListener('click', function() {
        openPost(post.slug);
      });
      trendingContainer.appendChild(trendingItem);
    });
  }

  // Initial load: fetch all news
  fetchNews();

  // Filter news by category when a navbar link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
      const category = link.getAttribute('data-category');
      fetchNews(category);
    });
  });
});
