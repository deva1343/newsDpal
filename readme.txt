Here’s an improved version of your prompt, ensuring that every article feels like a real newsroom publication, taking inspiration from professional journalism while retaining all essential elements:  

---

# **Objective:**  
Generate three highly detailed, engaging, and SEO-optimized news articles in JSON format that match the style and quality of professional journalism from BBC, Reuters, The New York Times, and The Guardian. Each article must be fact-driven, engaging, and structured like real news content.  

✅ **Sections:** Choose from one of these four categories:  
- **India**  
- **World**  
- **Tech**  
- **Economics**  

## **1. Expert-Level Newsroom-Style Writing**  
- Each article must **mimic real news reporting**—engaging, authoritative, and fact-based.  
- **No generic “conclusion” sections.** News articles don’t summarize at the end; instead, they end with a strong final point, quote, or open-ended insight.  
- Every article must start with a **compelling, attention-grabbing opening** like real news stories.  
- Use storytelling, investigative analysis, expert opinions, and institutional reports to create authenticity.  
- Keep the tone **neutral, objective, and professional.** Avoid opinionated or blog-style writing.  
- Ensure **a natural flow** with clear paragraphs, bold subheadings, and well-spaced content for readability.  

## **2. Trending & Research-Based Topics**  
- **Before writing, fetch trending topics** from top news portals (BBC, Reuters, The Guardian, Economic Times, etc.).  
- Each article must focus on a **different trending topic** from one of the four sections (India, World, Tech, Economics).  
- **Fact-driven reporting:** Use references from institutional studies, government reports, and expert analyses.  
- Articles must feel **current, relevant, and impactful.**  

## **3. Advanced SEO Optimization**  
- **SEO-Optimized Title:**  
  - Each article must have a compelling, high-ranking title that encourages clicks and search visibility.  
- **Meta Description:**  
  - Write a **1-2 sentence summary** incorporating long-tail keywords naturally for search engines.  
- **Keyword Integration:**  
  - **5–7 high-ranking SEO keywords** related to the topic.  
  - **Strategic keyword placement** (natural flow, no stuffing).  
  - Use **synonyms and variations** to maximize reach.  
- **Slug Optimization:**  
  - The `"slug"` field must contain a **clean, lowercase, hyphen-separated version of the title** for SEO-friendly URLs.  

## **4. Optimized Content Layout for Readability & Engagement**  
- Articles must **mirror real news portals** in structure and presentation.  
- Use **bold subheadings** for clear sections.  
- **Bullet points and numbered lists** to highlight key insights.  
- Ensure **white space and readability** for skimmability.  
- **Use proper HTML formatting (`<p>`, `<br>`, `<strong>`)** in the `"content"` field to maintain professional news layout.  

## **5. Multimedia Integration for Higher Engagement**  
- Each article must have a **placeholder image URL** such as:  
  `"https://picsum.photos/600/400?random=3"`  
- **Suggest additional multimedia elements** (charts, infographics, embedded tweets, interactive visuals) where relevant.  
- Ensure articles **naturally support multimedia embeds** to improve engagement.  

---

## **6. JSON Output Format with SEO Elements**  

Each news post must be in the following JSON format:  

```json
{
  "category": "India / World / Tech / Economics",
  "slug": "slug",
  "title": "Title",
  "description": "Meta description with long-tail keywords integrated naturally.",
  "content": "<p><strong>Headline of the Section</strong></p>
  <p>First engaging paragraph that hooks the reader...</p>
  <br><br>
  <p><strong>Subheading 1</strong></p>
  <p>Detailed paragraph with analysis...</p>
  <p>Another paragraph expanding on the point...</p>
  <br><br>
  <p><strong>Subheading 2</strong></p>
  <p>Fact-based insights, expert opinions...</p>
  <p>Include bullet points for key insights:</p>
  <p>- Key point 1<br>- Key point 2<br>- Key point 3</p>
  <br><br>
  <p><strong>Subheading 3</strong></p>
  <p>Deep dive into the implications...</p>
  <p>Use additional multimedia suggestions...</p>",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "image": "https://picsum.photos/600/400?random=3"
}
```

---

## **7. Final Output Requirements**  
- **Three fully optimized news posts** covering different trending topics.  
- **Each article must belong to a different category** (India, World, Tech, Economics).  
- **Each post must exceed 700 words** and maintain professional newsroom writing standards.  
- **HTML tagging (`<p>`, `<strong>`) must be used** in `"content"` to ensure professional news formatting.  
- **Each article must appear visually formatted** like a real news article when displayed.  
- **No placeholders like** `[oaicite:1]{index=1}` or `[oaicite:2]{index=2}` in the text.  

---

# 🚀 **Why This Version is Better:**  
✔ **Feels like real news articles.**  
✔ **Trending topics backed by real-time research.**  
✔ **SEO optimization without unnatural stuffing.**  
✔ **Professional formatting with HTML for better readability.**  
✔ **Multimedia-ready for a visually engaging experience.**  

Now, generate three fully optimized news posts based on the latest trending topics!
