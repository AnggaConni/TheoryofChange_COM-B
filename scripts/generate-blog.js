const fs = require('fs');
const path = require('path');

// ==========================================
// CONFIGURATION
// ==========================================
const SITE_URL = 'https://anggaconni.github.io/TheoryofChange_COM-B'; // Change this to your actual domain
const dataPath = path.join(__dirname, '../blog/data.json');
const blogIndexPath = path.join(__dirname, '../blog.html');
const articlesDir = path.join(__dirname, '../blog/article');

// Buat folder 'blog/article' jika belum ada
if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
}

// Helper Function: Ubah Judul jadi Slug (URL SEO-friendly)
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Ganti spasi dengan -
        .replace(/[^\w\-]+/g, '')       // Hapus karakter non-word
        .replace(/\-\-+/g, '-');        // Ganti multiple - dengan single -
}

// Baca data dari JSON
const articles = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Urutkan artikel dari yang paling baru (Newest) ke yang lama (Oldest)
articles.sort((a, b) => new Date(b.date) - new Date(a.date));

// Ambil Kategori Unik untuk Filter
const uniqueCategories = [...new Set(articles.map(article => article.category))];
let categoryOptions = `<option value="all">All Categories</option>`;
uniqueCategories.forEach(cat => {
    categoryOptions += `<option value="${cat}">${cat}</option>`;
});

// Variabel penampung untuk daftar artikel di blog.html
let articleCards = '';

// ==========================================
// GENERATE ARTICLES
// ==========================================
articles.forEach(article => {
    const slug = slugify(article.title);
    const articleUrl = `blog/article/${slug}.html`;
    const fallbackImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
    const imageUrl = article.image || article.imageUrl || fallbackImage;

    // ---------------------------------------------------------
    // A. Buat Card untuk dimasukkan ke blog.html (List)
    // ---------------------------------------------------------
    articleCards += `
        <a href="${articleUrl}" data-category="${article.category}" data-timestamp="${new Date(article.date).getTime()}" class="article-card bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col group transform hover:-translate-y-1">
            <div class="h-56 overflow-hidden relative border-b border-slate-100">
                <img src="${imageUrl}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='${fallbackImage}'">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="absolute top-4 left-4 bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                    ${article.category}
                </span>
            </div>
            
            <div class="p-6 flex-1 flex flex-col relative">
                <div class="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                    <i class="fa-regular fa-calendar"></i> ${article.date}
                </div>
                
                <h3 class="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                    ${article.title}
                </h3>
                
                <p class="text-sm text-slate-600 mb-6 flex-1 line-clamp-3 leading-relaxed">
                    ${article.excerpt}
                </p>
                
                <div class="mt-auto pt-4 border-t border-slate-100">
                    <span class="text-indigo-600 text-sm font-bold flex items-center gap-2 group-hover:text-indigo-500 transition-colors">
                        Read Article <i class="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </span>
                </div>
            </div>
        </a>
    `;

    // ---------------------------------------------------------
    // B. Template untuk Halaman Artikel Individu (Single Page)
    // ---------------------------------------------------------
    const singleArticleHtml = `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} | ImpactArchitect</title>
    <meta name="description" content="${article.excerpt}">
    
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.excerpt}">
    <meta property="og:image" content="../../${imageUrl}">
    <meta property="og:type" content="article">

    <!-- Tailwind & Plugins -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
    
    <!-- FontAwesome & Google Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans:['"Plus Jakarta Sans"', 'sans-serif'] },
                    colors: {
                        linkedin: '#0A66C2'
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; }
    </style>
</head>
<body class="text-slate-800 antialiased selection:bg-indigo-200 selection:text-indigo-900">

    <!-- Navbar (Identical to Landing Page) -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                <a href="../../index.html" class="flex items-center gap-3 cursor-pointer group">
                    <div class="w-10 h-10 bg-indigo-600 group-hover:bg-indigo-700 transition-colors rounded-xl flex items-center justify-center shadow-md">
                        <i class="fa-solid fa-layer-group text-white text-lg"></i>
                    </div>
                    <div>
                        <span class="text-xl font-bold tracking-tight text-slate-900 block leading-none">ImpactArchitect</span>
                        <span class="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest">v3.3 AI Edition</span>
                    </div>
                </a>
                
                <div class="hidden lg:flex items-center gap-8">
                    <a href="../../index.html#problem" class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">The Problem</a>
                    <a href="../../index.html#features" class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Platform Features</a>
                    <a href="../../blog.html" class="text-sm font-bold text-indigo-600 transition-colors flex items-center gap-1"><i class="fa-solid fa-book-open"></i> Articles</a>
                </div>

                <div class="flex items-center gap-4">
                    <a href="../../tool.html" class="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 transform hover:-translate-y-0.5">
                        Open Workspace <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Article Header -->
    <header class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <span class="inline-block bg-white border border-slate-200 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-sm">
            ${article.category}
        </span>
        <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.15] tracking-tight">${article.title}</h1>
        
        <div class="flex items-center justify-center gap-4 text-sm text-slate-500 font-medium">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500"><i class="fa-solid fa-user-tie"></i></div>
                <span class="text-slate-800 font-bold">${article.author}</span>
            </div>
            <span>•</span>
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-calendar text-slate-400"></i> ${article.date}
            </div>
        </div>
    </header>

    <!-- Featured Image -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <img src="../../${imageUrl}" alt="${article.title}" class="w-full h-auto max-h-[500px] object-cover rounded-[2rem] shadow-2xl border border-slate-200/50" onerror="this.src='${fallbackImage}'">
    </div>

    <!-- Article Body -->
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <article class="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-2xl leading-relaxed">
            ${article.content}
        </article>
        
        <!-- Share & Author Section -->
        <div class="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xl"><i class="fa-solid fa-user-tie"></i></div>
                <div>
                    <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Written By</p>
                    <p class="font-bold text-slate-900">${article.author}</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-sm font-bold text-slate-500">Share Article:</span>
                <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-linkedin hover:border-linkedin hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1"><i class="fa-brands fa-linkedin-in text-lg"></i></a>
                <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1"><i class="fa-brands fa-x-twitter text-lg"></i></a>
            </div>
        </div>
    </main>

    <!-- Footer (Identical to Landing Page) -->
    <footer class="pt-20 pb-10 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-12 mb-16 border-b border-slate-800 pb-16">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white"><i class="fa-solid fa-layer-group"></i></div>
                        <span class="font-bold text-white text-xl tracking-tight">ImpactArchitect</span>
                    </div>
                    <p class="text-sm leading-relaxed max-w-sm mb-6">An advanced AI-integrated IDE designed to stress-test your social interventions using the Theory of Change and COM-B behavioral models before you spend a single dollar.</p>
                </div>
                
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Product</h4>
                    <ul class="space-y-4 text-sm">
                        <li><a href="../../tool.html" class="hover:text-white transition-colors">Open Workspace</a></li>
                        <li><a href="../../index.html#features" class="hover:text-white transition-colors">Features</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Resources</h4>
                    <ul class="space-y-4 text-sm">
                        <li><a href="../../blog.html" class="hover:text-white transition-colors">Articles & Guides</a></li>
                        <li><a href="../../index.html#creator" class="hover:text-white transition-colors">About the Creator</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between items-center text-xs">
                <p>&copy; 2026 ImpactArchitect. Built & Designed by <strong>Angga Conni Saputra</strong>.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="#" class="hover:text-white transition-colors">Privacy</a>
                    <a href="#" class="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </div>
    </footer>

</body>
</html>
    `;

    // Simpan File Artikel
    const outPath = path.join(articlesDir, `${slug}.html`);
    fs.writeFileSync(outPath, singleArticleHtml);
    console.log(`📄 Created: ${slug}.html`);
});

// ---------------------------------------------------------
// 5. Generate Template HTML untuk blog.html (Daftar Artikel)
// ---------------------------------------------------------
const blogIndexHtml = `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Articles & Guides | ImpactArchitect</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- FontAwesome & Google Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans:['"Plus Jakarta Sans"', 'sans-serif'] }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; }
    </style>
</head>
<body class="text-slate-800 antialiased selection:bg-indigo-200 selection:text-indigo-900">

    <!-- Ambient Background Blobs -->
    <div class="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
    </div>

    <!-- Navbar (Identical to Landing Page) -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                <a href="index.html" class="flex items-center gap-3 cursor-pointer group">
                    <div class="w-10 h-10 bg-indigo-600 group-hover:bg-indigo-700 transition-colors rounded-xl flex items-center justify-center shadow-md">
                        <i class="fa-solid fa-layer-group text-white text-lg"></i>
                    </div>
                    <div>
                        <span class="text-xl font-bold tracking-tight text-slate-900 block leading-none">ImpactArchitect</span>
                        <span class="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest">v3.3 AI Edition</span>
                    </div>
                </a>
                
                <div class="hidden lg:flex items-center gap-8">
                    <a href="index.html#problem" class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">The Problem</a>
                    <a href="index.html#features" class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Platform Features</a>
                    <a href="blog.html" class="text-sm font-bold text-indigo-600 transition-colors flex items-center gap-1"><i class="fa-solid fa-book-open"></i> Articles</a>
                </div>

                <div class="flex items-center gap-4">
                    <a href="tool.html" class="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 transform hover:-translate-y-0.5">
                        Open Workspace <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Header Section -->
    <header class="pt-20 pb-12 text-center px-4 relative z-10">
        <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Articles & Guides</h1>
        <p class="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Deep dives into the Theory of Change, COM-B behavior modeling, and how to successfully architect social impact and policy interventions.</p>
    </header>

    <!-- Search & Filter Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div class="relative w-full md:w-96">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" id="searchInput" placeholder="Search articles by title..." class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow">
            </div>
            <div class="flex gap-3 w-full md:w-auto">
                <select id="categoryFilter" class="w-full md:w-auto px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer">
                    ${categoryOptions}
                </select>
                <select id="sortFilter" class="w-full md:w-auto px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Article Grid -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        <div id="articleGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${articleCards}
        </div>
        
        <!-- Empty State -->
        <div id="emptyState" class="hidden text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm mt-8">
            <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-3xl text-slate-300 mx-auto mb-4"><i class="fa-solid fa-file-circle-xmark"></i></div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
            <p class="text-slate-500">We couldn't find any articles matching your search criteria.</p>
        </div>
    </main>

    <!-- Footer (Identical to Landing Page) -->
    <footer class="pt-20 pb-10 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-12 mb-16 border-b border-slate-800 pb-16">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white"><i class="fa-solid fa-layer-group"></i></div>
                        <span class="font-bold text-white text-xl tracking-tight">ImpactArchitect</span>
                    </div>
                    <p class="text-sm leading-relaxed max-w-sm mb-6">An advanced AI-integrated IDE designed to stress-test your social interventions using the Theory of Change and COM-B behavioral models before you spend a single dollar.</p>
                </div>
                
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Product</h4>
                    <ul class="space-y-4 text-sm">
                        <li><a href="tool.html" class="hover:text-white transition-colors">Open Workspace</a></li>
                        <li><a href="index.html#features" class="hover:text-white transition-colors">Features</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Resources</h4>
                    <ul class="space-y-4 text-sm">
                        <li><a href="blog.html" class="hover:text-white transition-colors">Articles & Guides</a></li>
                        <li><a href="index.html#creator" class="hover:text-white transition-colors">About the Creator</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between items-center text-xs">
                <p>&copy; 2026 ImpactArchitect. Built & Designed by <strong>Angga Conni Saputra</strong>.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="#" class="hover:text-white transition-colors">Privacy</a>
                    <a href="#" class="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('searchInput');
            const categoryFilter = document.getElementById('categoryFilter');
            const sortFilter = document.getElementById('sortFilter');
            const articleGrid = document.getElementById('articleGrid');
            const emptyState = document.getElementById('emptyState');
            let cards = Array.from(document.querySelectorAll('.article-card'));

            function filterAndSort() {
                const searchTerm = searchInput.value.toLowerCase();
                const category = categoryFilter.value;
                const sortOrder = sortFilter.value;
                let visibleCount = 0;

                // Filter Process
                cards.forEach(card => {
                    const title = card.querySelector('h3').innerText.toLowerCase();
                    const cardCategory = card.getAttribute('data-category');
                    
                    const matchesSearch = title.includes(searchTerm);
                    const matchesCategory = category === 'all' || cardCategory === category;

                    if (matchesSearch && matchesCategory) {
                        card.style.display = 'flex';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Sorting Process
                const visibleCards = cards.filter(card => card.style.display !== 'none');
                
                visibleCards.sort((a, b) => {
                    const timeA = parseInt(a.getAttribute('data-timestamp'));
                    const timeB = parseInt(b.getAttribute('data-timestamp'));
                    return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
                });

                // Apply new sorting to DOM
                visibleCards.forEach(card => articleGrid.appendChild(card));

                // Empty State Handle
                if (visibleCount === 0) {
                    emptyState.classList.remove('hidden');
                } else {
                    emptyState.classList.add('hidden');
                }
            }

            // Event Listeners
            searchInput.addEventListener('input', filterAndSort);
            categoryFilter.addEventListener('change', filterAndSort);
            sortFilter.addEventListener('change', filterAndSort);
        });
    </script>
</body>
</html>
`;

fs.writeFileSync(blogIndexPath, blogIndexHtml);

// =========================================================
// 7. AUTO-GENERATE SITEMAP.XML
// =========================================================
const sitemapPath = path.join(__dirname, '../sitemap.xml');
const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/tool.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
`;

// Dynamic Article URLs
articles.forEach(article => {
    const slug = slugify(article.title);
    sitemapXml += `
  <url>
    <loc>${SITE_URL}/blog/article/${slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

sitemapXml += `\n</urlset>`;

fs.writeFileSync(sitemapPath, sitemapXml);

console.log('\n✅ BUILD SUCCESSFUL!');
console.log(`🗺️  sitemap.xml generated with ${articles.length} article links.`);
console.log(`📊 blog.html generated successfully.`);
console.log(`📂 Individual articles saved in: /blog/article/`);
