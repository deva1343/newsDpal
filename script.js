// script.js

document.addEventListener('DOMContentLoaded', function() {
  const newsContainer = document.getElementById('newsContainer');
  const navLinks = document.querySelectorAll('.navbar a');

  // Function to fetch JSON data
  function fetchNews(category = 'all') {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        let posts = data.posts;
        if (category !== 'all') {
          posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        }
        renderNews(posts);
      })
      .catch(error => console.error('Error fetching news:', error));
  }

  // Function to render news cards
  function renderNews(posts) {
    newsContainer.innerHTML = '';
    if (posts.length === 0) {
      newsContainer.innerHTML = '<p>No news available at the moment.</p>';
      return;
    }
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'news-card';
      
      let cardHTML = '';
      if (post.image) {
        cardHTML += `<img src="${post.image}" alt="${post.title}" loading="lazy">`;
      }
      cardHTML += `<div class="news-card-content">`;
      cardHTML += `<h3>${post.title}</h3>`;
      cardHTML += `<p>${post.content.substring(0, 100)}...</p>`;
      cardHTML += `<small>${post.category}</small>`;
      cardHTML += `</div>`;
      
      card.innerHTML = cardHTML;
      newsContainer.appendChild(card);
    });
  }

  // Initial load: fetch all news
  fetchNews();

  // Filter posts by category on navbar click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Set active class
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
      const category = link.getAttribute('data-category');
      fetchNews(category);
    });
  });
});
