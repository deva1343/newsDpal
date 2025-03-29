// script.js

document.addEventListener('DOMContentLoaded', function() {
  const newsContainer = document.getElementById('newsContainer');
  const trendingContainer = document.getElementById('trendingContainer');
  const navLinks = document.querySelectorAll('.navbar a');
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  const modalTitle = document.getElementById('postModalLabel');
  const modalImage = document.getElementById('modalImage');
  const modalContent = document.getElementById('modalContent');
  const modalCategory = document.getElementById('modalCategory');

  let allPosts = [];

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
        allPosts = data.posts;
        let posts = allPosts;
        if (category !== 'all') {
          posts = allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        }
        renderLatestNews(posts);
        renderTrendingNews(posts);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error loading news. Please try again later.</p>';
      });
  }

  // Render the "Latest News" grid with clickable cards
  function renderLatestNews(posts) {
    newsContainer.innerHTML = '';
    if (posts.length === 0) {
      newsContainer.innerHTML = '<p>No news available.</p>';
      return;
    }
    posts.forEach((post, index) => {
      const card = document.createElement('div');
      card.className = 'news-card col';
      // Make card clickable: add data-index attribute to reference the post
      card.setAttribute('data-index', index);
      let cardHTML = '';
      if (post.image) {
        cardHTML += `<img src="${post.image}" alt="${post.title}" loading="lazy">`;
      }
      cardHTML += `<div class="news-card-content">`;
      cardHTML += `<h3>${post.title}</h3>`;
      cardHTML += `<p>${post.content.substring(0, 120)}...</p>`;
      cardHTML += `<small>${post.category}</small>`;
      cardHTML += `</div>`;
      card.innerHTML = cardHTML;
      // Add click event to open modal with full post
      card.addEventListener('click', () => {
        openPostModal(post);
      });
      newsContainer.appendChild(card);
    });
  }

  // Render the "Trending" section with clickable items (first 3 posts)
  function renderTrendingNews(posts) {
    trendingContainer.innerHTML = '';
    const trendingPosts = posts.slice(0, 3);
    trendingPosts.forEach((post, index) => {
      const trendingItem = document.createElement('div');
      trendingItem.className = 'trending-item';
      trendingItem.setAttribute('data-index', index);
      let itemHTML = '';
      if (post.image) {
        itemHTML += `<img src="${post.image}" alt="${post.title}" loading="lazy">`;
      }
      itemHTML += `<div class="trending-item-content">`;
      itemHTML += `<h4>${post.title}</h4>`;
      itemHTML += `<small>${post.category}</small>`;
      itemHTML += `</div>`;
      trendingItem.innerHTML = itemHTML;
      // Add click event to open modal with full post
      trendingItem.addEventListener('click', () => {
        openPostModal(post);
      });
      trendingContainer.appendChild(trendingItem);
    });
  }

  // Open Bootstrap modal with full post content
  function openPostModal(post) {
    modalTitle.textContent = post.title;
    modalContent.textContent = post.content;
    modalCategory.textContent = `Category: ${post.category}`;
    if (post.image) {
      modalImage.src = post.image;
      modalImage.alt = post.title;
      modalImage.style.display = 'block';
    } else {
      modalImage.style.display = 'none';
    }
    postModal.show();
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
