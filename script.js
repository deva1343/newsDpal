document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.querySelector('.news-grid');
    const trendingContainer = document.querySelector('.trending-list');
    const breakingNewsContainer = document.querySelector('.breaking-news-list');
    const navLinks = document.querySelectorAll('.navbar a');

    async function fetchNews(category = 'all') {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            let posts = data.posts || [];

            if (category !== 'all') {
                posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
            }

            renderLatestNews(posts);
            renderTrendingNews(posts);
            renderBreakingNews(posts);
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Error loading news. Please try again later.</p>';
        }
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

        const fragment = document.createDocumentFragment();
        posts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'news-card';
            card.innerHTML = `
                <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='fallback.jpg'">
                <div class="news-card-content">
                    <h3>${post.title}</h3>
                    <p>${post.content.substring(0, 120)}...</p>
                    <small>Published: ${post.publishedDate}</small>
                </div>
            `;
            card.addEventListener('click', () => openPost(post.slug));
            fragment.appendChild(card);
        });

        newsContainer.appendChild(fragment);
    }

    function renderTrendingNews(posts) {
        trendingContainer.innerHTML = '';
        const trendingPosts = posts.slice(0, 3);
        const fragment = document.createDocumentFragment();

        trendingPosts.forEach(post => {
            const item = document.createElement('div');
            item.className = 'trending-item';
            item.innerHTML = `
                <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='fallback.jpg'">
                <div class="trending-item-content">
                    <h4>${post.title}</h4>
                    <small>${post.publishedDate}</small>
                </div>
            `;
            item.addEventListener('click', () => openPost(post.slug));
            fragment.appendChild(item);
        });

        trendingContainer.appendChild(fragment);
    }

    function renderBreakingNews(posts) {
        breakingNewsContainer.innerHTML = '';
        const breakingNews = posts.slice(0, 3);
        const fragment = document.createDocumentFragment();

        breakingNews.forEach(post => {
            const item = document.createElement('div');
            item.className = 'breaking-news-item';
            item.innerHTML = `
                <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='fallback.jpg'">
                <div class="breaking-news-content">
                    <h3>${post.title}</h3>
                    <p>${post.content.substring(0, 100)}...</p>
                </div>
            `;
            item.addEventListener('click', () => openPost(post.slug));
            fragment.appendChild(item);
        });

        breakingNewsContainer.appendChild(fragment);
    }

    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const handleCategorySwitch = debounce((category) => {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        fetchNews(category);
    }, 300);

    fetchNews();

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleCategorySwitch(link.getAttribute('data-category'));
        });
    });
});
