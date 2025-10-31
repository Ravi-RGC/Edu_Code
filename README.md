# EduCode - Learn to Code for Free 🚀

A comprehensive educational platform for learning programming with interactive coding challenges, video lectures, and real-time progress tracking.

## 🌟 Features

### 📚 **Comprehensive Courses**
- **Data Structures & Algorithms** - 500+ problems with video explanations
- **Full Stack Web Development** - HTML, CSS, JavaScript, React, Node.js
- **Database Management** - SQL, NoSQL, Indexing, Query Optimization  
- **Python Programming** - From basics to advanced concepts

### 💻 **Interactive Code Editor**
- Monaco Editor integration (VS Code-like experience)
- Real-time syntax highlighting
- Multiple language support (JavaScript, Python, Java, C++)
- Instant code execution and testing

### 🏆 **Gamification & Progress Tracking**
- Global leaderboards (Weekly, Monthly, All-time)
- XP system and achievement badges
- Streak tracking and daily challenges
- Personal dashboard with detailed analytics

### 🎯 **Practice Problems**
- 50+ real coding problems
- Difficulty levels: Easy, Medium, Hard
- Topic-wise categorization
- Advanced search and filtering
- Detailed solutions and explanations

### 🌙 **Modern UI/UX**
- Dark/Light mode toggle
- Fully responsive design
- Smooth animations and transitions
- Accessibility compliant
- Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installations required!

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/educode.git
   cd educode
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` and start learning!

## 📁 Project Structure

```
educode/
├── index.html              # Homepage
├── course.html             # All courses page
├── practice.html           # Practice problems
├── dashboard.html          # User dashboard
├── leaderboard.html        # Global rankings
├── faq.html               # Frequently asked questions
├── courses_dsa.html       # DSA course page
├── courses_webd.html      # Web development course
├── courese_dbms.html      # Database course
├── courses_python.html    # Python course
├── index.css              # Main stylesheet
├── index.js               # JavaScript functionality
├── hero.png              # Hero section image
└── README.md             # Project documentation
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid/Flexbox
- **Vanilla JavaScript** - No frameworks, pure JS
- **Monaco Editor** - VS Code editor experience
- **Google Fonts** - Inter & Playfair Display

### Features
- **Local Storage** - Progress persistence
- **Responsive Design** - Mobile-first approach
- **PWA Ready** - Can be installed as app
- **SEO Optimized** - Meta tags and semantic HTML

## 🎨 Design System

### Color Palette
```css
--bg: #fff5d7          /* Light cream background */
--text: #2b1b14        /* Dark brown text */
--accent: #e85a4f      /* Orange-red accent */
--muted: #7a6c65       /* Muted brown */
```

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)
- **Code**: Monaco, Consolas (Monospace)

### Components
- Cards with hover effects
- Animated progress bars
- Interactive modals
- Responsive navigation
- Dark mode toggle

## 📱 Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 900px  
- **Desktop**: > 900px

## 🔧 Customization

### Adding New Problems
Edit the `problems` array in `index.js`:

```javascript
const problems = [
  {
    id: 31,
    title: "Your Problem Title",
    diff: "medium",
    topic: "array",
    solved: "1.2K",
    desc: "Problem description here...",
    example: "Input/Output example..."
  }
];
```

### Adding New Courses
1. Create new HTML file (e.g., `courses_newcourse.html`)
2. Add course data to `index.js`
3. Update navigation links

### Styling Customization
Modify CSS variables in `index.css`:

```css
:root {
  --accent: #your-color;
  --bg: #your-background;
  /* ... other variables */
}
```

## 🌟 Key Features Explained

### 1. **Interactive Code Editor**
- Powered by Monaco Editor (same as VS Code)
- Syntax highlighting for multiple languages
- Auto-completion and error detection
- Customizable themes (light/dark)

### 2. **Progress Tracking**
- Local storage for persistence
- XP system based on problem difficulty
- Achievement badges for milestones
- Streak tracking for daily activity

### 3. **Responsive Design**
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### 4. **Performance Optimized**
- Lazy loading for images
- Efficient DOM manipulation
- Minimal external dependencies
- Fast loading times

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Update documentation if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monaco Editor** - For the amazing code editor
- **Google Fonts** - For beautiful typography
- **YouTube** - For educational video content
- **Open Source Community** - For inspiration and resources

## 📞 Support

- **Email**: support@educode.com
- **Discord**: [Join our community](https://discord.gg/educode)
- **GitHub Issues**: [Report bugs](https://github.com/yourusername/educode/issues)

## 🚀 Future Roadmap

- [ ] User authentication system
- [ ] Real-time collaboration
- [ ] More programming languages
- [ ] Mobile app (React Native)
- [ ] AI-powered code suggestions
- [ ] Live coding sessions
- [ ] Certification system
- [ ] Job placement portal

---

**Made with ❤️ for students by students**

*Happy Coding! 🎉*