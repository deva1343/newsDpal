// post.js

document.addEventListener('DOMContentLoaded', function() {
  // Helper function to get query parameters
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const slug = getQueryParam('slug');
  if (!slug) {
    document.getElementById('postContent').innerHTML = '<p>No post found.</p>';
    return;
  }

  // Fetch the JSON data
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      const posts = data.posts;
      const post = posts.find(p => p.slug === slug);
      if (!post) {
        document.getElementById('postContent').innerHTML = '<p>Post not found.</p>';
        return;
      }
      // Update the content on the page
      document.getElementById('postHeading').textContent = post.title;
      document.getElementById('postBody').textContent = post.content;
      document.getElementById('postCategory').textContent = post.category;
      const postImg = document.getElementById('postImage');
      if (post.image) {
        postImg.src = post.image;
        postImg.style.display = 'block';
      } else {
        postImg.style.display = 'none';
      }

      // Dynamically update meta tags
      document.getElementById('postTitle').textContent = post.title;
      document.getElementById('postDescription').setAttribute('content', post.description);
      document.getElementById('postKeywords').setAttribute('content', post.keywords.join(', '));
      document.getElementById('ogTitle').setAttribute('content', post.title);
      document.getElementById('ogDescription').setAttribute('content', post.description);
      document.getElementById('ogImage').setAttribute('content', post.image || 'https://picsum.photos/600/400');
      document.getElementById('twitterTitle').setAttribute('content', post.title);
      document.getElementById('twitterDescription').setAttribute('content', post.description);
      document.getElementById('twitterImage').setAttribute('content', post.image || 'https://picsum.photos/600/400');

      // Optionally update canonical URL (if required)
      document.getElementById('ogUrl').setAttribute('content', window.location.href);
    })
    .catch(error => {
      console.error('Error fetching post data:', error);
      document.getElementById('postContent').innerHTML = '<p>Error loading post. Please try again later.</p>';
    });
});
