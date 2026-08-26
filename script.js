/*
  ============================================
  MODERN FINDS - POSTS CONFIGURATION
  ============================================

  TO ADD A NEW POST:
  1. Copy one object inside the `posts` array.
  2. Change title, category, date, excerpt, image and amazonUrl.
  3. Put your image inside /assets/ and use its path here.
  4. Save. The homepage will update automatically.

  The `amazonUrl` should be your Amazon affiliate URL.
*/

const posts = [
  {
    title: "5 Desk Essentials That Make Working From Home Better",
    category: "Home Office",
    date: "Aug 18, 2026",
    excerpt: "A practical shortlist of useful desk upgrades that add comfort without clutter.",
    image: "assets/desk-essentials.svg",
    amazonUrl: "https://www.amazon.com/"
  },
  {
    title: "Simple Kitchen Upgrades Worth Buying",
    category: "Kitchen",
    date: "Aug 12, 2026",
    excerpt: "Small, affordable tools that can make everyday cooking faster and easier.",
    image: "assets/kitchen-upgrades.svg",
    amazonUrl: "https://www.amazon.com/"
  },
  {
    title: "Everyday Tech I Actually Keep On My Desk",
    category: "Tech",
    date: "Aug 05, 2026",
    excerpt: "Useful gadgets chosen for function, clean design, and everyday convenience.",
    image: "assets/everyday-tech.svg",
    amazonUrl: "https://www.amazon.com/"
  },
  {
    title: "Minimal Bedroom Finds for a More Relaxing Space",
    category: "Bedroom",
    date: "Jul 29, 2026",
    excerpt: "A few low-effort additions that can make a bedroom feel calmer and more organized.",
    image: "assets/bedroom-finds.svg",
    amazonUrl: "https://www.amazon.com/"
  },
  {
    title: "Travel Accessories That Earn Their Place",
    category: "Travel",
    date: "Jul 21, 2026",
    excerpt: "Compact travel products that solve common problems without filling your luggage.",
    image: "assets/travel-accessories.svg",
    amazonUrl: "https://www.amazon.com/"
  },
  {
    title: "Budget-Friendly Fitness Gear for Home Workouts",
    category: "Fitness",
    date: "Jul 14, 2026",
    excerpt: "A starter collection for building a useful home workout setup on a reasonable budget.",
    image: "assets/fitness-gear.svg",
    amazonUrl: "https://www.amazon.com/"
  }
];

const postGrid = document.getElementById("postGrid");
const categoryBar = document.getElementById("categoryBar");
const categoryLinks = document.getElementById("categoryLinks");
const searchInput = document.getElementById("postSearch");
const emptyState = document.getElementById("emptyState");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

let activeCategory = "All";

const uniqueCategories = ["All", ...new Set(posts.map(post => post.category))];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderFilters() {
  categoryBar.innerHTML = uniqueCategories.map(category => `
    <button
      class="filter-button ${category === activeCategory ? "active" : ""}"
      type="button"
      data-category="${escapeHtml(category)}"
    >
      ${escapeHtml(category)}
    </button>
  `).join("");

  categoryBar.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderPosts();
    });
  });
}

function filteredPosts() {
  const query = searchInput.value.trim().toLowerCase();

  return posts.filter(post => {
    const categoryMatches = activeCategory === "All" || post.category === activeCategory;
    const searchMatches = !query || [
      post.title,
      post.category,
      post.excerpt
    ].join(" ").toLowerCase().includes(query);

    return categoryMatches && searchMatches;
  });
}

function renderPosts() {
  const visiblePosts = filteredPosts();

  postGrid.innerHTML = visiblePosts.map(post => `
    <article class="post-card">
      <a href="${escapeHtml(post.amazonUrl)}" target="_blank" rel="nofollow sponsored noopener">
        <div class="post-image">
          <img src="${escapeHtml(post.image)}" alt="" loading="lazy" />
        </div>
        <div class="post-content">
          <div class="post-meta">
            <span class="post-category">${escapeHtml(post.category)}</span>
            <span class="post-date">${escapeHtml(post.date)}</span>
          </div>
          <h3 class="post-title">${escapeHtml(post.title)}</h3>
          <p class="post-excerpt">${escapeHtml(post.excerpt)}</p>
          <span class="post-link">View on Amazon <span>↗</span></span>
        </div>
      </a>
    </article>
  `).join("");

  emptyState.hidden = visiblePosts.length !== 0;
}

function renderCategoryLinks() {
  const categories = uniqueCategories.filter(category => category !== "All");

  categoryLinks.innerHTML = categories.map(category => {
    const count = posts.filter(post => post.category === category).length;
    return `
      <a class="category-link" href="#latest" data-category-link="${escapeHtml(category)}">
        <span>${escapeHtml(category)}</span>
        <small>${count} post${count === 1 ? "" : "s"}</small>
      </a>
    `;
  }).join("");

  categoryLinks.querySelectorAll("[data-category-link]").forEach(link => {
    link.addEventListener("click", () => {
      activeCategory = link.dataset.categoryLink;
      renderFilters();
      renderPosts();
    });
  });
}

searchInput.addEventListener("input", renderPosts);

menuToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderFilters();
renderPosts();
renderCategoryLinks();
