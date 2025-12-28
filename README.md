# ひらがな Practice - Katakana Learning Web App

A beautiful, interactive web application for learning and practicing Japanese katakana characters through drawing.

## Features

- ✏️ **Interactive Drawing Canvas** - Draw characters with mouse (desktop) or touch (mobile)
- 🔢 **Stroke Order Indicators** - Numbered arrows show the correct stroke sequence
- 🎯 **Auto-Progression** - Automatically moves to next character when you've drawn enough
- ✓ **Success Detection** - Shows checkmark when drawing is complete
- 📱 **No-Scroll Layout** - Perfectly fits on any screen without scrolling
- 🎨 **5 Beautiful Themes** - Sunset, Ocean, Forest, Lavender, and Cherry Blossom
- 🌙 **Dark Mode** - Toggle between light and dark modes with persistent settings
- 💾 **LocalStorage Memory** - Theme and dark mode preferences saved locally
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📊 **Progress Tracking** - Clickable progress bar to jump to any character
- 🔤 **Complete Katakana Set** - All 71 characters including dakuten (゛) and handakuten (゜)
- 🎯 **Reference Overlay** - Faded character guide to help you draw correctly
- ⌨️ **Keyboard Shortcuts** - Arrow keys to navigate, 'C' to clear
- 📱 **Mobile-Optimized Order** - Characters arranged like Japanese mobile keyboard (a,e,i,o,u pattern)

## How to Use

1. **Draw** - Use your mouse or finger to draw the displayed katakana character
2. **Follow Stroke Order** - Numbered arrows show the correct stroke sequence
3. **Auto-Progress** - When you've drawn enough, a checkmark appears and it auto-advances
4. **Clear** - Click the "Clear" button to erase and try again
5. **Navigate** - Use "Next" and "Previous" buttons to move between characters
6. **Jump to Character** - Click anywhere on the progress bar to skip to that character
7. **Change Theme** - Click the 🎨 button to choose from 5 beautiful color schemes
8. **Toggle Dark Mode** - Click the 🌙/☀️ button to switch between light and dark modes
9. **Toggle Stroke Order** - Use the checkbox to show/hide stroke order guides

## Keyboard Shortcuts

- `→` (Right Arrow) - Next character
- `←` (Left Arrow) - Previous character
- `C` - Clear canvas

## Deployment to GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Upload `index.html` and `app.js` to the repository
3. Go to Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name/`

### Option 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Katakana practice app"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/katakana.git

# Push to GitHub
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Option 3: Quick Deploy Script

```bash
# Create and run this script
chmod +x deploy.sh
./deploy.sh
```

## Themes

Choose from 5 beautiful color schemes:
- 🌅 **Sunset** - Warm oranges and pinks
- 🌊 **Ocean** - Cool cyans and blues
- 🌲 **Forest** - Fresh greens and teals
- 💜 **Lavender** - Purple and pink gradients (default)
- 🌸 **Cherry** - Soft rose and fuchsia tones

Each theme has both light and dark mode variants. Your preferences are automatically saved to localStorage and persist across sessions.

## Technologies Used

- **HTML5 Canvas** - For drawing functionality
- **Vanilla JavaScript** - No frameworks, pure JS
- **Tailwind CSS** - Modern, responsive styling via CDN
- **Google Fonts** - Noto Sans JP for authentic Japanese typography
- **LocalStorage API** - For persistent theme preferences

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Development

Simply open `index.html` in your web browser. No build process or server required!

```bash
# Or use a simple HTTP server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## License

Free to use for educational purposes.

## Contributing

Feel free to fork and improve! Suggestions welcome.

---

Made with ❤️ for Japanese language learners
