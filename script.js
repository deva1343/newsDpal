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

  // Render the "Latest News" grid
  function renderLatestNews(posts) {
    newsContainer.innerHTML = '';
    if (posts.length === 0) {
      newsContainer.innerHTML = '<p>No news available.</p>';
      return;
    }
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'news-card';
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
      
      // Make card clickable to open modal with full post
      card.addEventListener('click', () => {
        modalTitle.textContent = post.title;
        if (post.image) {
          modalImage.src = post.image;
          modalImage.alt = post.title;
          modalImage.style.display = 'block';
        } else {
          modalImage.style.display = 'none';
        }
        modalContent.textContent = post.content;
        modalCategory.textContent = `Category: ${post.category}`;
        postModal.show();
      });
      
      newsContainer.appendChild(card);
    });
  }

  // Render the "Trending" section (using the first 3 posts as trending)
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
      
      // Make trending item clickable as well
      trendingItem.addEventListener('click', () => {
        modalTitle.textContent = post.title;
        if (post.image) {
          modalImage.src = post.image;
          modalImage.alt = post.title;
          modalImage.style.display = 'block';
        } else {
          modalImage.style.display = 'none';
        }
        modalContent.textContent = post.content;
        modalCategory.textContent = `Category: ${post.category}`;
        postModal.show();
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
