// script.js

document.addEventListener('DOMContentLoaded', function() {
  const postsContainer = document.getElementById('postsContainer');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const loadingSpinner = document.getElementById('loading');
  const navLinks = document.querySelectorAll('.navbar a');

  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Function to fetch JSON data
  function fetchPosts(category = 'all') {
    // Show spinner
    loadingSpinner.style.display = 'block';
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        let posts = data.posts;
        // Filter by category if not "all"
        if (category !== 'all') {
          posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        }
        renderPosts(posts);
      })
      .catch(error => console.error('Error loading posts:', error));
  }

  // Function to render posts dynamically
  function renderPosts(posts) {
    postsContainer.innerHTML = '';
    // Hide spinner when posts are rendered
    loadingSpinner.style.display = 'none';

    if (posts.length === 0) {
      postsContainer.innerHTML = '<p>No posts available for this category.</p>';
      return;
    }

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      
      // Build post HTML
      let postHTML = `<h2>${post.title}</h2>`;
      if (post.image) {
        postHTML += `<img src="${post.image}" alt="${post.title}" loading="lazy">`;
      }
      postHTML += `<p>${post.content}</p>`;
      postHTML += `<small>Category: ${post.category}</small>`;
      
      postElement.innerHTML = postHTML;
      postsContainer.appendChild(postElement);
    });
  }

  // Initial load: fetch all posts
  fetchPosts();

  // Filter posts by category when a navbar link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove active state from all links and add to the clicked link
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
      const category = link.getAttribute('data-category');
      fetchPosts(category);
    });
  });
});
