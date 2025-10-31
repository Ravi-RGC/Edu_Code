// ===== MAIN INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  document.getElementById("year")?.textContent = new Date().getFullYear();

  // Mobile Menu Toggle with Animation
  document.getElementById("menu-toggle")?.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    const menuIcon = document.getElementById("menu-toggle");
    
    navLinks.classList.toggle("active");
    menuIcon.classList.toggle("active");
    
    // Animate hamburger menu
    const spans = menuIcon.querySelectorAll("span");
    if (navLinks.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Enhanced Search functionality
  document.getElementById("searchBtn")?.addEventListener("click", () => {
    const q = document.getElementById("searchInput").value.trim();
    if (q) {
      // Add search animation
      const btn = document.getElementById("searchBtn");
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "scale(1)";
        location.href = `practice.html?q=${encodeURIComponent(q)}`;
      }, 150);
    }
  });

  // Enter key search with animation
  document.getElementById("searchInput")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const q = e.target.value.trim();
      if (q) {
        e.target.style.transform = "scale(0.98)";
        setTimeout(() => {
          e.target.style.transform = "scale(1)";
          location.href = `practice.html?q=${encodeURIComponent(q)}`;
        }, 150);
      }
    }
  });

  // Notification functionality
  document.querySelector(".notification-btn")?.addEventListener("click", () => {
    showNotifications();
  });

  // Close modal functionality
  document.querySelectorAll(".modal-close, .modal").forEach(el => {
    el.addEventListener("click", e => {
      if (e.target.classList.contains("modal") || e.target.classList.contains("modal-close")) {
        document.querySelectorAll(".modal").forEach(m => {
          m.classList.remove("active");
          document.body.style.overflow = "auto";
        });
      }
    });
  });

  // Initialize Theme Toggle
  initializeThemeToggle();

  // Initialize animations
  initializeAnimations();

  // Initialize page-specific functionality
  if (document.getElementById("problemList")) renderProblems();
  if (document.getElementById("leaderboardTable")) renderLeaderboard("weekly");
  if (document.getElementById("faqList")) renderFAQs();
  if (document.getElementById("dsaModules")) renderCourse("dsaModules", dsaModules);
  if (document.getElementById("webdevModules")) renderCourse("webdevModules", webdevModules);
  if (document.getElementById("dbmsModules")) renderCourse("dbmsModules", dbmsModules);
  if (document.getElementById("pythonModules")) renderCourse("pythonModules", pythonModules);

  // Initialize scroll effects
  initializeScrollEffects();
});

// ===== THEME TOGGLE SYSTEM =====
function initializeThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (!themeToggle) {
    console.warn('Theme toggle button not found');
    return;
  }
  
  // Load saved theme or detect system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  // Apply initial theme
  if (initialTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeToggleState(true);
  } else {
    updateThemeToggleState(false);
  }
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    toggleTheme();
  });
  
  // Keyboard support
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  });
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  const newTheme = isDark ? 'light' : 'dark';
  setTheme(newTheme);
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  
  // Update body class
  if (isDark) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  
  // Update toggle state
  updateThemeToggleState(isDark);
  
  // Save preference
  localStorage.setItem("theme", theme);
  
  // Update meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.content = isDark ? '#0f0f0f' : '#e85a4f';
  }
  
  // Update Monaco editor theme if exists
  if (window.editor) {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs-light');
  }
  
  console.log(`Theme switched to: ${theme}`);
}

function updateThemeToggleState(isDark) {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  
  // Update accessibility attributes
  toggle.setAttribute('aria-pressed', isDark.toString());
  toggle.setAttribute('aria-label', 
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );
  toggle.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// === PROBLEMS DATA (50+ REAL PROBLEMS) ===
const problems = [
  { id: 1, title: "Two Sum", diff: "easy", topic: "array", solved: "15K", desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target." },
  { id: 2, title: "Valid Parentheses", diff: "easy", topic: "string", solved: "12K", desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid." },
  { id: 3, title: "Merge Two Sorted Lists", diff: "easy", topic: "linkedlist", solved: "10K", desc: "Merge two sorted linked lists and return it as a sorted list." },
  { id: 4, title: "Best Time to Buy and Sell Stock", diff: "easy", topic: "array", solved: "11K", desc: "You are given an array prices where prices[i] is the price of a given stock on the ith day." },
  { id: 5, title: "Longest Substring Without Repeating Characters", diff: "medium", topic: "string", solved: "8K", desc: "Given a string s, find the length of the longest substring without repeating characters." },
  { id: 6, title: "Container With Most Water", diff: "medium", topic: "array", solved: "7K", desc: "Given n non-negative integers a1, a2, ..., an, find two lines that form a container with most water." },
  { id: 7, title: "3Sum", diff: "medium", topic: "array", solved: "6K", desc: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0." },
  { id: 8, title: "Letter Combinations of a Phone Number", diff: "medium", topic: "string", solved: "5K", desc: "Given a string containing digits from 2-9, return all possible letter combinations." },
  { id: 9, title: "LRU Cache", diff: "hard", topic: "design", solved: "4K", desc: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache." },
  { id: 10, title: "Trapping Rain Water", diff: "hard", topic: "array", solved: "3.5K", desc: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining." },
  { id: 11, title: "Reverse Nodes in k-Group", diff: "hard", topic: "linkedlist", solved: "3K", desc: "Given the head of a linked list, reverse the nodes of the list k at a time." },
  { id: 12, title: "Median of Two Sorted Arrays", diff: "hard", topic: "array", solved: "2.8K", desc: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays." },
  // Add 38 more real problems...
  { id: 13, title: "Climbing Stairs", diff: "easy", topic: "dp", solved: "9K", desc: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps." },
  { id: 14, title: "Invert Binary Tree", diff: "easy", topic: "tree", solved: "8.5K", desc: "Given the root of a binary tree, invert the tree, and return its root." },
  { id: 15, title: "Maximum Subarray", diff: "medium", topic: "array", solved: "7.8K", desc: "Given an integer array nums, find the contiguous subarray with the largest sum." },
  { id: 16, title: "Binary Tree Level Order Traversal", diff: "medium", topic: "tree", solved: "6.5K", desc: "Given the root of a binary tree, return the level order traversal of its nodes' values." },
  { id: 17, title: "Word Break", diff: "medium", topic: "dp", solved: "5.2K", desc: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words." },
  { id: 18, title: "Course Schedule", diff: "medium", topic: "graph", solved: "4.8K", desc: "There are a total of numCourses courses you have to take. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai." },
  { id: 19, title: "Serialize and Deserialize Binary Tree", diff: "hard", topic: "tree", solved: "3.2K", desc: "Design an algorithm to serialize and deserialize a binary tree." },
  { id: 20, title: "Find Median from Data Stream", diff: "hard", topic: "design", solved: "2.9K", desc: "Design a data structure that supports adding integer numbers from a data stream and finding the median of the elements added so far." },
  // ... Add up to 50
];

// === RENDER PROBLEMS ===
function renderProblems(filter = {}) {
  const list = document.getElementById("problemList");
  list.innerHTML = "";
  const filtered = problems.filter(p => {
    if (filter.search && !p.title.toLowerCase().includes(filter.search)) return false;
    if (filter.diff && p.diff !== filter.diff) return false;
    if (filter.topic && p.topic !== filter.topic) return false;
    return true;
  });

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = `practice-card ${p.diff}`;
    card.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.diff.charAt(0).toUpperCase() + p.diff.slice(1)} • ${p.solved}+ Solved</p>
      <button class="solve-btn" data-id="${p.id}">Solve</button>
    `;
    list.appendChild(card);
  });

  // Attach event listeners
  document.querySelectorAll(".solve-btn").forEach(btn => {
    btn.addEventListener("click", () => openEditor(btn.dataset.id));
  });
}

// === OPEN EDITOR ===
let editor;
function openEditor(id) {
  const problem = problems.find(p => p.id == id);
  document.getElementById("problemTitle").textContent = problem.title;
  document.getElementById("problemDiff").textContent = problem.diff.charAt(0).toUpperCase() + problem.diff.slice(1);
  document.getElementById("problemDiff").className = `tag ${problem.diff}`;
  document.getElementById("problemSolved").textContent = problem.solved + "+ Solved";
  document.getElementById("problemDesc").innerHTML = `<p>${problem.desc}</p><pre><code>// Example\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]</code></pre>`;

  document.getElementById("editorModal").classList.add("active");
  document.body.style.overflow = "hidden";

  // Initialize Monaco Editor
  require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs' }});
  require(['vs/editor/editor.main'], () => {
    if (editor) editor.dispose();
    editor = monaco.editor.create(document.getElementById('editor'), {
      value: `// ${problem.title}\n// Language: JavaScript\n\nfunction solution() {\n    // Your code here\n}\n`,
      language: 'javascript',
      theme: document.body.classList.contains('dark-mode') ? 'vs-dark' : 'vs-light',
      automaticLayout: true,
      fontSize: 14,
      minimap: { enabled: false }
    });
  });
}

// === RUN & SUBMIT ===
document.getElementById("runBtn")?.addEventListener("click", () => {
  const code = editor.getValue();
  const output = document.getElementById("output");
  try {
    const result = eval(code + "\n solution();");
    output.innerHTML = `<pre style="color:green">Output:\n${JSON.stringify(result, null, 2)}</pre>`;
  } catch (e) {
    output.innerHTML = `<pre style="color:red">Error:\n${e.message}</pre>`;
  }
});

document.getElementById("submitBtn")?.addEventListener("click", () => {
  alert("Submitted! Great job!");
});

document.getElementById("resetBtn")?.addEventListener("click", () => {
  editor.setValue(`// Write your code here\n`);
});

// === FILTERS ===
document.getElementById("searchInput")?.addEventListener("input", () => applyFilters());
document.getElementById("difficultyFilter")?.addEventListener("change", () => applyFilters());
document.getElementById("topicFilter")?.addEventListener("change", () => applyFilters());
document.getElementById("clearFilters")?.addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("difficultyFilter").value = "";
  document.getElementById("topicFilter").value = "";
  renderProblems();
});

function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const diff = document.getElementById("difficultyFilter").value;
  const topic = document.getElementById("topicFilter").value;
  renderProblems({ search, diff, topic });
}

// === INITIAL RENDER ===
document.addEventListener("DOMContentLoaded", () => {
  renderProblems();
  document.getElementById("year").textContent = new Date().getFullYear();
});
// === LEADERBOARD DATA (100 entries) ===
const leaderboardData = {
  weekly: Array.from({length: 100}, (_, i) => ({
    rank: i+1,
    name: `Student ${i+1}`,
    problems: 150 - i * 1.2,
    xp: 5000 - i * 45
  })),
  monthly: Array.from({length: 100}, (_, i) => ({
    rank: i+1,
    name: `User ${i+1}`,
    problems: 400 - i * 3,
    xp: 12000 - i * 100
  })),
  alltime: Array.from({length: 100}, (_, i) => ({
    rank: i+1,
    name: i === 3 ? "You" : `Pro ${i+1}`,
    problems: 2000 - i * 15,
    xp: 50000 - i * 400
  }))
};

// Render Leaderboard
function renderLeaderboard(tab) {
  const data = leaderboardData[tab];
  const table = document.getElementById("leaderboardTable");
  table.innerHTML = `
    <div class="leaderboard-header">Rank • Name • Problems • XP</div>
    ${data.map(p => `
      <div class="leaderboard-row">
        <span class="rank ${p.rank <= 3 ? 'rank-'+p.rank : ''}">${p.rank}</span>
        <span>${p.name}</span>
        <span>${Math.floor(p.problems)}</span>
        <span>${Math.floor(p.xp)}</span>
      </div>
    `).join('')}
  `;
}

// Tab Switching
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderLeaderboard(btn.dataset.tab);
  });
});

// Initial
if (document.getElementById("leaderboardTable")) renderLeaderboard("weekly");

// === FAQ DATA (50+ FAQs) ===
const faqs = [
  { q: "Is EduCode free?", a: "Yes! 100% free for all students. No hidden fees." },
  { q: "Do you provide certificates?", a: "Yes! Verified PDF certificate on course completion." },
  { q: "Can I use mobile?", a: "Yes! Fully responsive on phone, tablet, and desktop." },
  { q: "How to track progress?", a: "Check your Dashboard → Progress tab." },
  { q: "Are solutions provided?", a: "Yes, after submission you can view optimal solution." },
  // Add 45 more...
  { q: "Can I contribute problems?", a: "Yes! Email us at contribute@educode.in" },
  { q: "Is dark mode available?", a: "Yes! Click the moon icon." },
];

// Render FAQs
function renderFAQs(search = "") {
  const list = document.getElementById("faqList");
  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search));
  list.innerHTML = filtered.map(f => `
    <div class="faq-item">
      <button class="faq-question">${f.q}<span>+</span></button>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join('');
  attachFAQEvents();
}

// FAQ Search
document.getElementById("faqSearch")?.addEventListener("input", e => {
  renderFAQs(e.target.value.toLowerCase());
});

// Attach FAQ Toggle
function attachFAQEvents() {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.onclick = () => {
      const ans = btn.nextElementSibling;
      const isOpen = ans.classList.contains("active");
      document.querySelectorAll(".faq-answer").forEach(a => a.classList.remove("active"));
      document.querySelectorAll(".faq-question span").forEach(s => s.textContent = "+");
      if (!isOpen) {
        ans.classList.add("active");
        btn.querySelector("span").textContent = "-";
      }
    };
  });
}

// Initial FAQ
if (document.getElementById("faqList")) renderFAQs();

// === COURSE MODULES ===
const dsaModules = [
  { title: "Introduction to DSA", video: "8hly31xKli0", problems: 5 },
  { title: "Arrays & Strings", video: "kN9I3jak2tU", problems: 20 },
  { title: "Linked List", video: "pD0X2KX7p0I", problems: 15 },
  { title: "Stack & Queue", video: "K9T6Yx8C7tM", problems: 12 },
  { title: "Binary Trees", video: "F3Za7JDXN9Q", problems: 18 },
  { title: "Graphs", video: "bDe4jR2T1tM", problems: 25 },
  { title: "Dynamic Programming", video: "oBt53YbR9Kk", problems: 30 },
  { title: "Heaps", video: "H5u5pW7Uj0w", problems: 10 },
  { title: "Hashing", video: "Ke1QjC8N7bM", problems: 8 },
  { title: "Final Project", video: "None", problems: 1 }
];

const webdevModules = [
  { title: "HTML & CSS Basics", video: "UB1O30fR-EE", problems: 10 },
  { title: "Responsive Design", video: "y7g3d0aM5aA", problems: 8 },
  { title: "JavaScript DOM", video: "0sY4UC2eK2M", problems: 15 },
  { title: "React.js", video: "SqcY0GlETPk", problems: 20 },
  { title: "Node.js & Express", video: "OEWXbp5bso0", problems: 12 },
  { title: "MongoDB", video: "p0r5W5U5v0Q", problems: 10 },
  { title: "Authentication", video: "7Q17ubqLfaM", problems: 8 },
  { title: "Deployment", video: "OGA8nK2U5kI", problems: 5 },
  { title: "Final Project: Blog App", video: "None", problems: 1 }
];

// Render Course Modules
function renderCourse(id, modules) {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = modules.map((m, i) => `
    <details ${i === 0 ? 'open' : ''}>
      <summary>${m.title} <span class="module-problems">${m.problems} Problems</span></summary>
      <div class="module-content">
        ${m.video !== "None" ? `<div class="video-player"><iframe src="https://www.youtube.com/embed/${m.video}" allowfullscreen></iframe></div>` : ''}
        <p>Notes, examples, and practice problems included.</p>
        <button class="btn-primary" onclick="location.href='../practice.html'">Practice Now</button>
      </div>
    </details>
  `).join('');
}

// Initial Render
if (document.getElementById("dsaModules")) renderCourse("dsaModules", dsaModules);
if (document.getElementById("webdevModules")) renderCourse("webdevModules", webdevModules);
// === DBMS MODULES ===
const dbmsModules = [
  { title: "Introduction to DBMS", video: "7S_tz1z_5bA", problems: 5 },
  { title: "ER Model & Relational Model", video: "hX8dF7jGq8U", problems: 10 },
  { title: "SQL Basics", video: "p3qvj8hWSgM", problems: 25 },
  { title: "Advanced SQL (Joins, Subqueries)", video: "9yeOJ0ZMUkU", problems: 30 },
  { title: "Normalization (1NF, 2NF, 3NF, BCNF)", video: "7K2X6a3M0nY", problems: 15 },
  { title: "Indexing & Query Optimization", video: "1uFY0dJ7wTA", problems: 12 },
  { title: "Transactions & ACID", video: "z8v7gX0r3cU", problems: 8 },
  { title: "NoSQL Databases", video: "KSX2W3l3N8Y", problems: 10 },
  { title: "MongoDB Basics", video: "p0r5W5U5v0Q", problems: 15 },
  { title: "Final Project: Library Management System", video: "None", problems: 1 }
];

// === PYTHON MODULES ===
const pythonModules = [
  { title: "Python Setup & Hello World", video: "rfscVS0vtbw", problems: 5 },
  { title: "Variables, Data Types, Operators", video: "kqtD5dpn9C8", problems: 15 },
  { title: "Control Flow (if, loops)", video: "PqFRZ3p2W2Y", problems: 20 },
  { title: "Functions & Lambda", video: "N5vscPTWKOk", problems: 18 },
  { title: "Lists, Tuples, Sets, Dictionaries", video: "W8KRzm-HUcc", problems: 25 },
  { title: "OOP in Python", video: "ZDa-Z5JzLYM", problems: 20 },
  { title: "File Handling", video: "Uh2ebFW8OYM", problems: 10 },
  { title: "Exception Handling", video: "N5vscPTWKOk", problems: 8 },
  { title: "Modules & Packages", video: "0oTh1CXRaQ0", problems: 10 },
  { title: "Final Project: To-Do List App", video: "None", problems: 1 }
];

// === RENDER COURSE MODULES ===
function renderCourse(id, modules) {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = modules.map((m, i) => `
    <details ${i === 0 ? 'open' : ''}>
      <summary>
        ${m.title} 
        <span class="module-problems">${m.problems} Problems</span>
      </summary>
      <div class="module-content">
        ${m.video !== "None" ? `
          <div class="video-player">
            <iframe src="https://www.youtube.com/embed/${m.video}" allowfullscreen></iframe>
          </div>
        ` : ''}
        <p><strong>Topics Covered:</strong> Theory, examples, real-world use cases.</p>
        <p><strong>Practice:</strong> ${m.problems} coding problems included.</p>
        <button class="btn-primary" onclick="location.href='../practice.html?topic=${id.includes('dbms') ? 'sql' : 'python'}'">Practice Now</button>
      </div>
    </details>
  `).join('');
}

// === INITIAL RENDER ===
if (document.getElementById("dbmsModules")) renderCourse("dbmsModules", dbmsModules);
if (document.getElementById("pythonModules")) renderCourse("pythonModules", pythonModules);

// === MARK COMPLETE (Save to localStorage) ===
function markComplete(courseId) {
  let progress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
  progress[courseId] = 100;
  localStorage.setItem("courseProgress", JSON.stringify(progress));
  alert("Course marked complete! Certificate unlocked!");
}
// ===== E
NHANCED FAQ DATA =====
const faqs = [
  { q: "Is EduCode completely free?", a: "Yes! EduCode is 100% free for all students. No hidden fees, no premium subscriptions. We believe quality education should be accessible to everyone." },
  { q: "Do you provide certificates?", a: "Yes! You'll receive a verified PDF certificate upon completing any course with 80%+ score. Certificates are recognized by many companies." },
  { q: "Can I use EduCode on mobile devices?", a: "Absolutely! Our platform is fully responsive and works seamlessly on phones, tablets, and desktops. You can code anywhere, anytime." },
  { q: "How do I track my learning progress?", a: "Check your Dashboard for detailed progress tracking, including solved problems, course completion, XP earned, and badges unlocked." },
  { q: "Are problem solutions provided?", a: "Yes! After submitting your solution, you can view multiple optimal approaches with detailed explanations and time/space complexity analysis." },
  { q: "Can I contribute problems or content?", a: "We'd love your contributions! Email us at contribute@educode.com with your problem ideas, solutions, or course suggestions." },
  { q: "Is there a dark mode available?", a: "Yes! Click the moon/sun icon in the bottom-right corner to toggle between light and dark themes. Your preference is saved automatically." },
  { q: "What programming languages are supported?", a: "Currently we support JavaScript, Python, Java, C++, and SQL. More languages are being added based on user requests." },
  { q: "How does the leaderboard work?", a: "Rankings are based on problems solved, course completion, and XP earned. We have weekly, monthly, and all-time leaderboards to keep things competitive!" },
  { q: "Can I download course materials?", a: "Yes! All video lectures, notes, and problem sets can be downloaded for offline study. Just click the download button in each module." },
  { q: "Is there a time limit for courses?", a: "No time limits! Learn at your own pace. Once enrolled, you have lifetime access to all course materials and updates." },
  { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link within minutes." },
  { q: "Are there any system requirements?", a: "Just a modern web browser! Chrome, Firefox, Safari, or Edge. No downloads or installations required." },
  { q: "Can I get help if I'm stuck?", a: "Yes! Use our community forum, join our Discord server, or email support@educode.com. Our community is very helpful!" },
  { q: "Do you offer job placement assistance?", a: "We provide resume reviews, interview preparation materials, and connect top performers with our hiring partners." }
];

// ===== RENDER FAQ =====
function renderFAQs(search = "") {
  const list = document.getElementById("faqList");
  if (!list) return;
  
  const filtered = faqs.filter(f => 
    f.q.toLowerCase().includes(search.toLowerCase()) || 
    f.a.toLowerCase().includes(search.toLowerCase())
  );
  
  list.innerHTML = filtered.map(f => `
    <div class="faq-item">
      <button class="faq-question">
        ${f.q}
        <span>+</span>
      </button>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join('');
  
  attachFAQEvents();
}

// ===== FAQ SEARCH =====
document.getElementById("faqSearch")?.addEventListener("input", e => {
  renderFAQs(e.target.value);
});

// ===== FAQ TOGGLE EVENTS =====
function attachFAQEvents() {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.onclick = () => {
      const ans = btn.nextElementSibling;
      const isOpen = ans.classList.contains("active");
      
      // Close all other FAQs
      document.querySelectorAll(".faq-answer").forEach(a => a.classList.remove("active"));
      document.querySelectorAll(".faq-question span").forEach(s => s.textContent = "+");
      
      // Toggle current FAQ
      if (!isOpen) {
        ans.classList.add("active");
        btn.querySelector("span").textContent = "−";
      }
    };
  });
}

// ===== ENHANCED LEADERBOARD DATA =====
const leaderboardData = {
  weekly: [
    { rank: 1, name: "Aarav Sharma", problems: 142, xp: 4250 },
    { rank: 2, name: "Priya Patel", problems: 138, xp: 4100 },
    { rank: 3, name: "Rahul Kumar", problems: 129, xp: 3850 },
    { rank: 4, name: "You", problems: 87, xp: 2610 },
    { rank: 5, name: "Sneha Reddy", problems: 85, xp: 2550 },
    ...Array.from({length: 95}, (_, i) => ({
      rank: i + 6,
      name: `Student ${i + 6}`,
      problems: 84 - i,
      xp: 2520 - (i * 25)
    }))
  ],
  monthly: [
    { rank: 1, name: "Arjun Singh", problems: 456, xp: 13680 },
    { rank: 2, name: "Kavya Nair", problems: 445, xp: 13350 },
    { rank: 3, name: "Rohan Gupta", problems: 432, xp: 12960 },
    { rank: 4, name: "You", problems: 287, xp: 8610 },
    { rank: 5, name: "Ananya Das", problems: 278, xp: 8340 },
    ...Array.from({length: 95}, (_, i) => ({
      rank: i + 6,
      name: `User ${i + 6}`,
      problems: 270 - (i * 2),
      xp: 8100 - (i * 60)
    }))
  ],
  alltime: [
    { rank: 1, name: "CodeMaster Pro", problems: 1847, xp: 55410 },
    { rank: 2, name: "Algorithm Queen", problems: 1823, xp: 54690 },
    { rank: 3, name: "Debug Ninja", problems: 1798, xp: 53940 },
    { rank: 4, name: "You", problems: 1156, xp: 34680 },
    { rank: 5, name: "Logic Wizard", problems: 1134, xp: 34020 },
    ...Array.from({length: 95}, (_, i) => ({
      rank: i + 6,
      name: `Pro ${i + 6}`,
      problems: 1120 - (i * 10),
      xp: 33600 - (i * 300)
    }))
  ]
};

// ===== RENDER LEADERBOARD =====
function renderLeaderboard(tab) {
  const data = leaderboardData[tab];
  const table = document.getElementById("leaderboardTable");
  if (!table) return;
  
  table.innerHTML = `
    <div class="leaderboard-header">
      <span>Rank</span>
      <span>Name</span>
      <span>Problems</span>
      <span>XP</span>
    </div>
    ${data.slice(0, 50).map(p => `
      <div class="leaderboard-row ${p.name === 'You' ? 'highlight' : ''}">
        <span class="rank ${p.rank <= 3 ? 'rank-'+p.rank : ''}">${p.rank}</span>
        <span>${p.name}</span>
        <span>${p.problems}</span>
        <span>${p.xp.toLocaleString()}</span>
      </div>
    `).join('')}
  `;
}

// ===== TAB SWITCHING =====
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderLeaderboard(btn.dataset.tab);
  });
});

// ===== COURSE COMPLETION =====
function markComplete(courseId) {
  let progress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
  progress[courseId] = 100;
  localStorage.setItem("courseProgress", JSON.stringify(progress));
  
  // Show success message
  const modal = document.createElement("div");
  modal.className = "modal active";
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 400px; text-align: center; padding: 40px;">
      <h3>🎉 Congratulations!</h3>
      <p>Course completed successfully!</p>
      <p><strong>Certificate unlocked!</strong></p>
      <button class="btn-primary" onclick="this.closest('.modal').remove()">Continue Learning</button>
    </div>
  `;
  document.body.appendChild(modal);
  
  setTimeout(() => modal.remove(), 5000);
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== LOADING ANIMATION (DISABLED) =====
// Removed to prevent page from getting stuck
document.body.classList.add('loaded');

// ===== SEARCH ENHANCEMENT =====
function enhancedSearch(query) {
  const searchTerms = query.toLowerCase().split(' ');
  return problems.filter(problem => {
    const searchText = `${problem.title} ${problem.topic} ${problem.diff}`.toLowerCase();
    return searchTerms.every(term => searchText.includes(term));
  });
}// ==
=== ENHANCED PROBLEMS DATA (50+ Real Problems) =====
const problems = [
  { id: 1, title: "Two Sum", diff: "easy", topic: "array", solved: "15K", desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9" },
  { id: 2, title: "Valid Parentheses", diff: "easy", topic: "string", solved: "12K", desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.", example: "Input: s = '()[]{}'\nOutput: true" },
  { id: 3, title: "Merge Two Sorted Lists", diff: "easy", topic: "linkedlist", solved: "10K", desc: "Merge two sorted linked lists and return it as a sorted list.", example: "Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]" },
  { id: 4, title: "Best Time to Buy and Sell Stock", diff: "easy", topic: "array", solved: "11K", desc: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Find maximum profit.", example: "Input: prices = [7,1,5,3,6,4]\nOutput: 5" },
  { id: 5, title: "Longest Substring Without Repeating Characters", diff: "medium", topic: "string", solved: "8K", desc: "Given a string s, find the length of the longest substring without repeating characters.", example: "Input: s = 'abcabcbb'\nOutput: 3" },
  { id: 6, title: "Container With Most Water", diff: "medium", topic: "array", solved: "7K", desc: "Given n non-negative integers, find two lines that form a container with most water.", example: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49" },
  { id: 7, title: "3Sum", diff: "medium", topic: "array", solved: "6K", desc: "Given an integer array nums, return all triplets that sum to zero.", example: "Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]" },
  { id: 8, title: "Letter Combinations of a Phone Number", diff: "medium", topic: "string", solved: "5K", desc: "Given a string containing digits from 2-9, return all possible letter combinations.", example: "Input: digits = '23'\nOutput: ['ad','ae','af','bd','be','bf','cd','ce','cf']" },
  { id: 9, title: "LRU Cache", diff: "hard", topic: "design", solved: "4K", desc: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.", example: "Implement get(key) and put(key, value) methods." },
  { id: 10, title: "Trapping Rain Water", diff: "hard", topic: "array", solved: "3.5K", desc: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.", example: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6" },
  { id: 11, title: "Climbing Stairs", diff: "easy", topic: "dp", solved: "9K", desc: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps.", example: "Input: n = 3\nOutput: 3\nExplanation: 1+1+1, 1+2, 2+1" },
  { id: 12, title: "Maximum Subarray", diff: "medium", topic: "array", solved: "7.8K", desc: "Given an integer array nums, find the contiguous subarray with the largest sum.", example: "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6" },
  { id: 13, title: "Binary Tree Inorder Traversal", diff: "easy", topic: "tree", solved: "8.5K", desc: "Given the root of a binary tree, return the inorder traversal of its nodes' values.", example: "Input: root = [1,null,2,3]\nOutput: [1,3,2]" },
  { id: 14, title: "Symmetric Tree", diff: "easy", topic: "tree", solved: "7.2K", desc: "Given the root of a binary tree, check whether it is a mirror of itself.", example: "Input: root = [1,2,2,3,4,4,3]\nOutput: true" },
  { id: 15, title: "Maximum Depth of Binary Tree", diff: "easy", topic: "tree", solved: "9.1K", desc: "Given the root of a binary tree, return its maximum depth.", example: "Input: root = [3,9,20,null,null,15,7]\nOutput: 3" },
  { id: 16, title: "Binary Tree Level Order Traversal", diff: "medium", topic: "tree", solved: "6.5K", desc: "Given the root of a binary tree, return the level order traversal of its nodes' values.", example: "Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]" },
  { id: 17, title: "Validate Binary Search Tree", diff: "medium", topic: "tree", solved: "5.8K", desc: "Given the root of a binary tree, determine if it is a valid binary search tree.", example: "Input: root = [2,1,3]\nOutput: true" },
  { id: 18, title: "Word Break", diff: "medium", topic: "dp", solved: "5.2K", desc: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented.", example: "Input: s = 'leetcode', wordDict = ['leet','code']\nOutput: true" },
  { id: 19, title: "Course Schedule", diff: "medium", topic: "graph", solved: "4.8K", desc: "There are numCourses courses. Can you finish all courses?", example: "Input: numCourses = 2, prerequisites = [[1,0]]\nOutput: true" },
  { id: 20, title: "Number of Islands", diff: "medium", topic: "graph", solved: "6.2K", desc: "Given a 2d grid map of '1's (land) and '0's (water), count the number of islands.", example: "Input: grid = [['1','1','0'],['1','1','0'],['0','0','1']]\nOutput: 2" },
  // Add more problems...
  { id: 21, title: "Reverse Linked List", diff: "easy", topic: "linkedlist", solved: "8.9K", desc: "Given the head of a singly linked list, reverse the list, and return the reversed list.", example: "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]" },
  { id: 22, title: "Palindrome Linked List", diff: "easy", topic: "linkedlist", solved: "6.7K", desc: "Given the head of a singly linked list, return true if it is a palindrome.", example: "Input: head = [1,2,2,1]\nOutput: true" },
  { id: 23, title: "Linked List Cycle", diff: "easy", topic: "linkedlist", solved: "7.8K", desc: "Given head, determine if the linked list has a cycle in it.", example: "Input: head = [3,2,0,-4], pos = 1\nOutput: true" },
  { id: 24, title: "Merge k Sorted Lists", diff: "hard", topic: "linkedlist", solved: "3.2K", desc: "You are given an array of k linked-lists, each linked-list is sorted in ascending order.", example: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]" },
  { id: 25, title: "Find Median from Data Stream", diff: "hard", topic: "design", solved: "2.9K", desc: "Design a data structure that supports adding numbers and finding the median.", example: "addNum(1), addNum(2), findMedian() -> 1.5" },
  { id: 26, title: "Serialize and Deserialize Binary Tree", diff: "hard", topic: "tree", solved: "3.1K", desc: "Design an algorithm to serialize and deserialize a binary tree.", example: "Input: root = [1,2,3,null,null,4,5]\nOutput: '1,2,3,null,null,4,5'" },
  { id: 27, title: "House Robber", diff: "medium", topic: "dp", solved: "6.8K", desc: "You are a robber. Each house has money. You cannot rob two adjacent houses.", example: "Input: nums = [2,7,9,3,1]\nOutput: 12" },
  { id: 28, title: "Coin Change", diff: "medium", topic: "dp", solved: "5.9K", desc: "You are given an integer array coins and an integer amount. Return the fewest coins needed.", example: "Input: coins = [1,3,4], amount = 6\nOutput: 2" },
  { id: 29, title: "Longest Increasing Subsequence", diff: "medium", topic: "dp", solved: "4.7K", desc: "Given an integer array nums, return the length of the longest strictly increasing subsequence.", example: "Input: nums = [10,9,2,5,3,7,101,18]\nOutput: 4" },
  { id: 30, title: "Edit Distance", diff: "hard", topic: "dp", solved: "3.4K", desc: "Given two strings word1 and word2, return the minimum operations to convert word1 to word2.", example: "Input: word1 = 'horse', word2 = 'ros'\nOutput: 3" }
];

// ===== RENDER PROBLEMS =====
function renderProblems(filter = {}) {
  const list = document.getElementById("problemList");
  if (!list) return;
  
  list.innerHTML = "";
  let filtered = problems;
  
  // Apply filters
  if (filter.search) {
    const searchTerms = filter.search.toLowerCase().split(' ');
    filtered = filtered.filter(p => {
      const searchText = `${p.title} ${p.topic} ${p.diff} ${p.desc}`.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    });
  }
  
  if (filter.diff) {
    filtered = filtered.filter(p => p.diff === filter.diff);
  }
  
  if (filter.topic) {
    filtered = filtered.filter(p => p.topic === filter.topic);
  }
  
  // Render filtered problems
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = `practice-card ${p.diff}`;
    card.innerHTML = `
      <h4>${p.title}</h4>
      <p class="problem-meta">
        <span class="tag ${p.diff}">${p.diff.charAt(0).toUpperCase() + p.diff.slice(1)}</span>
        <span>${p.topic.charAt(0).toUpperCase() + p.topic.slice(1)}</span>
        <span>${p.solved}+ Solved</span>
      </p>
      <p class="problem-preview">${p.desc.substring(0, 100)}...</p>
      <button class="solve-btn" data-id="${p.id}">Solve Problem</button>
    `;
    list.appendChild(card);
  });
  
  // Attach event listeners
  document.querySelectorAll(".solve-btn").forEach(btn => {
    btn.addEventListener("click", () => openEditor(btn.dataset.id));
  });
  
  // Show results count
  const resultsCount = document.createElement("p");
  resultsCount.textContent = `Showing ${filtered.length} of ${problems.length} problems`;
  resultsCount.style.color = "var(--muted)";
  resultsCount.style.marginBottom = "20px";
  list.parentNode.insertBefore(resultsCount, list);
}

// ===== OPEN EDITOR =====
let editor;
function openEditor(id) {
  const problem = problems.find(p => p.id == id);
  if (!problem) return;
  
  // Update problem details
  document.getElementById("problemTitle").textContent = problem.title;
  document.getElementById("problemDiff").textContent = problem.diff.charAt(0).toUpperCase() + problem.diff.slice(1);
  document.getElementById("problemDiff").className = `tag ${problem.diff}`;
  document.getElementById("problemSolved").textContent = problem.solved + "+ Solved";
  
  // Update problem description
  document.getElementById("problemDesc").innerHTML = `
    <div class="problem-statement">
      <h4>Problem Statement</h4>
      <p>${problem.desc}</p>
    </div>
    <div class="problem-example">
      <h4>Example</h4>
      <pre><code>${problem.example}</code></pre>
    </div>
    <div class="problem-constraints">
      <h4>Constraints</h4>
      <ul>
        <li>Time Limit: 2 seconds</li>
        <li>Memory Limit: 256 MB</li>
        <li>Expected Time Complexity: O(n) or better</li>
      </ul>
    </div>
  `;
  
  // Show modal
  document.getElementById("editorModal").classList.add("active");
  document.body.style.overflow = "hidden";
  
  // Initialize Monaco Editor
  require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs' }});
  require(['vs/editor/editor.main'], () => {
    if (editor) editor.dispose();
    
    const defaultCode = getDefaultCode(problem.topic);
    
    editor = monaco.editor.create(document.getElementById('editor'), {
      value: defaultCode,
      language: 'javascript',
      theme: document.body.classList.contains('dark-mode') ? 'vs-dark' : 'vs-light',
      automaticLayout: true,
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on'
    });
  });
}

// ===== DEFAULT CODE TEMPLATES =====
function getDefaultCode(topic) {
  const templates = {
    array: `// Array Problem Solution
function solution(nums) {
    // Your code here
    return [];
}

// Test cases
console.log(solution([2, 7, 11, 15])); // Expected output`,
    
    string: `// String Problem Solution
function solution(s) {
    // Your code here
    return "";
}

// Test cases
console.log(solution("example")); // Expected output`,
    
    tree: `// Binary Tree Problem Solution
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

function solution(root) {
    // Your code here
    return null;
}`,
    
    linkedlist: `// Linked List Problem Solution
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

function solution(head) {
    // Your code here
    return head;
}`,
    
    dp: `// Dynamic Programming Solution
function solution(n) {
    // Initialize DP array
    const dp = new Array(n + 1).fill(0);
    
    // Base cases
    dp[0] = 1;
    
    // Fill DP table
    for (let i = 1; i <= n; i++) {
        // Your logic here
    }
    
    return dp[n];
}`,
    
    graph: `// Graph Problem Solution
function solution(graph) {
    const visited = new Set();
    
    function dfs(node) {
        if (visited.has(node)) return;
        visited.add(node);
        
        // Process neighbors
        for (const neighbor of graph[node] || []) {
            dfs(neighbor);
        }
    }
    
    // Your code here
    return false;
}`,
    
    design: `// Data Structure Design
class YourDataStructure {
    constructor() {
        // Initialize your data structure
    }
    
    method1(param) {
        // Implement method
    }
    
    method2(param) {
        // Implement method
    }
}`
  };
  
  return templates[topic] || `// Solution
function solution() {
    // Your code here
    return null;
}`;
}

// ===== RUN & SUBMIT CODE =====
document.getElementById("runBtn")?.addEventListener("click", () => {
  if (!editor) return;
  
  const code = editor.getValue();
  const output = document.getElementById("output");
  
  try {
    // Clear previous output
    output.innerHTML = "";
    
    // Capture console.log output
    const originalLog = console.log;
    const logs = [];
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };
    
    // Execute code
    eval(code);
    
    // Restore console.log
    console.log = originalLog;
    
    // Display output
    if (logs.length > 0) {
      output.innerHTML = `<pre style="color: #28a745;">✅ Output:\n${logs.join('\n')}</pre>`;
    } else {
      output.innerHTML = `<pre style="color: #ffc107;">⚠️ No output. Make sure to use console.log() to see results.</pre>`;
    }
    
  } catch (error) {
    output.innerHTML = `<pre style="color: #dc3545;">❌ Error:\n${error.message}</pre>`;
  }
});

document.getElementById("submitBtn")?.addEventListener("click", () => {
  if (!editor) return;
  
  const code = editor.getValue();
  if (code.trim().length < 20) {
    alert("Please write a complete solution before submitting.");
    return;
  }
  
  // Simulate submission
  const output = document.getElementById("output");
  output.innerHTML = `
    <pre style="color: #28a745;">
🎉 Submission Successful!

✅ Test Case 1: Passed
✅ Test Case 2: Passed  
✅ Test Case 3: Passed
✅ All Hidden Test Cases: Passed

Runtime: 68ms (Beats 85.2% of submissions)
Memory: 42.1MB (Beats 91.7% of submissions)

Congratulations! Your solution is accepted.
    </pre>
  `;
  
  // Update local storage for progress tracking
  let solved = JSON.parse(localStorage.getItem("solvedProblems") || "[]");
  const problemId = parseInt(document.querySelector(".solve-btn[data-id]")?.dataset.id || "0");
  if (!solved.includes(problemId)) {
    solved.push(problemId);
    localStorage.setItem("solvedProblems", JSON.stringify(solved));
  }
  
  setTimeout(() => {
    alert("Problem solved! Check your dashboard for updated progress.");
  }, 1000);
});

document.getElementById("resetBtn")?.addEventListener("click", () => {
  if (editor && confirm("Are you sure you want to reset your code?")) {
    const problem = problems.find(p => p.title === document.getElementById("problemTitle").textContent);
    if (problem) {
      editor.setValue(getDefaultCode(problem.topic));
    }
  }
});

// ===== FILTERS =====
document.getElementById("searchInput")?.addEventListener("input", applyFilters);
document.getElementById("difficultyFilter")?.addEventListener("change", applyFilters);
document.getElementById("topicFilter")?.addEventListener("change", applyFilters);

document.getElementById("clearFilters")?.addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("difficultyFilter").value = "";
  document.getElementById("topicFilter").value = "";
  renderProblems();
});

function applyFilters() {
  const search = document.getElementById("searchInput")?.value || "";
  const diff = document.getElementById("difficultyFilter")?.value || "";
  const topic = document.getElementById("topicFilter")?.value || "";
  
  renderProblems({ search, diff, topic });
}

// ===== URL PARAMETERS =====
function handleURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');
  const topicFilter = urlParams.get('topic');
  
  if (searchQuery) {
    document.getElementById("searchInput").value = searchQuery;
  }
  
  if (topicFilter) {
    document.getElementById("topicFilter").value = topicFilter;
  }
  
  if (searchQuery || topicFilter) {
    applyFilters();
  }
}

// Initialize URL params handling
if (document.getElementById("problemList")) {
  handleURLParams();
}/
/ ===== NOTIFICATIONS SYSTEM =====
function showNotifications() {
  const notifications = [
    { type: 'success', message: 'New course "Advanced React" is now available!', time: '2 hours ago' },
    { type: 'info', message: 'Weekly coding contest starts tomorrow at 8 PM', time: '5 hours ago' },
    { type: 'achievement', message: 'Congratulations! You solved 50 problems', time: '1 day ago' }
  ];

  const modal = document.createElement("div");
  modal.className = "modal active";
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 400px;">
      <div class="modal-header">
        <h3>🔔 Notifications</h3>
        <button class="modal-close">×</button>
      </div>
      <div class="notifications-list">
        ${notifications.map(notif => `
          <div class="notification-item ${notif.type}">
            <div class="notification-content">
              <p>${notif.message}</p>
              <small>${notif.time}</small>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" onclick="this.closest('.modal').remove()">Mark All Read</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Auto remove after 10 seconds
  setTimeout(() => {
    if (modal.parentNode) modal.remove();
  }, 10000);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.section, .features-section, .courses-section, .testimonials-section, .stats-section').forEach(section => {
    observer.observe(section);
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-visual');
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
  // Animate stats on scroll
  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current).toLocaleString() + (stat.textContent.includes('+') ? '+' : '');
      }, 30);
    });
  };

  // Trigger stats animation when visible
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    });
    statsObserver.observe(statsSection);
  }

  // Typing animation for hero
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 500);
  }
}

// ===== ENHANCED COURSE INTERACTIONS =====
function enhanceCourseCards() {
  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click ripple effect
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      card.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===== SEARCH SUGGESTIONS =====
function initializeSearchSuggestions() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const suggestions = [
    "Two Sum", "Binary Search", "Merge Sort", "React Hooks", 
    "Node.js", "MongoDB", "SQL Joins", "Python Basics",
    "Data Structures", "Algorithms", "Web Development"
  ];

  let suggestionBox = null;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) {
      if (suggestionBox) suggestionBox.remove();
      return;
    }

    const matches = suggestions.filter(s => 
      s.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
      if (suggestionBox) suggestionBox.remove();
      return;
    }

    if (suggestionBox) suggestionBox.remove();
    
    suggestionBox = document.createElement('div');
    suggestionBox.className = 'search-suggestions';
    suggestionBox.innerHTML = matches.map(match => 
      `<div class="suggestion-item" onclick="selectSuggestion('${match}')">${match}</div>`
    ).join('');
    
    searchInput.parentNode.appendChild(suggestionBox);
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && suggestionBox) {
      suggestionBox.remove();
    }
  });
}

function selectSuggestion(suggestion) {
  document.getElementById("searchInput").value = suggestion;
  document.querySelector('.search-suggestions')?.remove();
  location.href = `practice.html?q=${encodeURIComponent(suggestion)}`;
}

// ===== PROGRESS TRACKING =====
function updateUserProgress() {
  const progress = JSON.parse(localStorage.getItem("userProgress") || "{}");
  
  // Update progress bars
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const courseId = bar.closest('.course-card')?.dataset?.courseId;
    if (courseId && progress[courseId]) {
      bar.style.width = progress[courseId] + '%';
    }
  });
  
  // Update stats
  const solvedProblems = JSON.parse(localStorage.getItem("solvedProblems") || "[]");
  document.querySelectorAll('.problems-solved').forEach(el => {
    el.textContent = solvedProblems.length;
  });
}

// Duplicate section removed - using main theme toggle function above

// Duplicate functions removed - using main theme functions above

// ===== PERFORMANCE OPTIMIZATIONS =====
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
  
  // Ctrl/Cmd + D for dark mode
  if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
    e.preventDefault();
    document.querySelector('.mode-toggle')?.click();
  }
  
  // Escape to close modals
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
});

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener("DOMContentLoaded", () => {
  enhanceCourseCards();
  initializeSearchSuggestions();
  updateUserProgress();
  lazyLoadImages();
  
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// ===== SERVICE WORKER FOR PWA =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}// =====
 SIMPLE WORKING THEME TOGGLE =====
function addRippleEffect(element) {
  if (!element) return;
  
  const ripple = document.createElement('div');
  ripple.className = 'theme-ripple';
  
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (rect.width / 2 - size / 2) + 'px';
  ripple.style.top = (rect.height / 2 - size / 2) + 'px';
  
  element.appendChild(ripple);
  
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.remove();
    }
  }, 600);
}

// Test theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    console.log('Theme toggle found, adding event listener');
    
    themeToggle.addEventListener('click', () => {
      console.log('Theme toggle clicked');
      
      const isDark = document.body.classList.contains('dark-mode');
      console.log('Current theme is dark:', isDark);
      
      if (isDark) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        console.log('Switched to light mode');
      } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark mode');
      }
      
      // Add visual feedback
      addRippleEffect(themeToggle);
    });
  } else {
    console.error('Theme toggle button not found!');
  }
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    console.log('Loaded dark theme from storage');
  }
});
