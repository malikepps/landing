# Company Website Template

This is a customizable website template based on wisprflow.ai, ready for development and deployment.

## 🚀 Quick Start

### Local Development

1. **Start the development server:**
   ```bash
   python3 -m http.server 3000
   ```

2. **Open your browser:**
   ```
   http://localhost:3000
   ```

3. **Make your edits:**
   - Edit HTML files directly
   - Modify CSS in `assets/682f84b3838c89f8ff7667db/css/`
   - Update images in `assets/` folders
   - Refresh browser to see changes

## 📁 Project Structure

```
wisprflow_site/
├── index.html              # Homepage
├── use-cases.html          # Use cases page
├── workflows.html          # Workflows page  
├── leaders.html           # Leaders page
├── support.html           # Support page
├── privacy.html           # Privacy page
├── post/
│   └── technical-challenges.html
├── assets/                # All website assets
│   ├── 682f84b3838c89f8ff7667db/  # Main assets
│   │   ├── css/          # Stylesheets
│   │   ├── js/           # JavaScript files
│   │   └── ...           # Images, fonts, etc.
│   └── ...
├── fix_links.py           # Script to fix broken links
└── README.md             # This file
```

## 🔧 Development Workflow

### Phase 1: Setup Version Control

1. **Initialize Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: wisprflow template"
   ```

2. **Create GitHub repository:**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it something like `company-website` or `landing-page`
   - Don't initialize with README (we already have one)

3. **Connect to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Phase 2: Deploy to Vercel

1. **Install Vercel CLI (optional):**
   ```bash
   npm i -g vercel
   ```

2. **Deploy via GitHub integration:**
   - Go to [Vercel](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Other
     - Build Command: (leave empty)
     - Output Directory: (leave empty)
     - Install Command: (leave empty)

3. **Deploy:**
   - Click "Deploy"
   - Your site will be live at `https://your-project-name.vercel.app`

### Phase 3: Custom Domain (Optional)

1. **Add custom domain in Vercel:**
   - Go to your project in Vercel dashboard
   - Click "Settings" → "Domains"
   - Add your domain name
   - Update your DNS records as instructed

## ✏️ Customization Guide

### 1. Content Updates

**Update company information:**
- Search and replace "Wispr Flow" with your company name
- Update meta tags in `<head>` sections
- Modify page titles and descriptions

**Key files to edit:**
- `index.html` - Homepage content
- All HTML files - Navigation menus
- `assets/*/css/` - Styling and branding

### 2. Branding

**Logo replacement:**
- Replace logo files in `assets/682f84b3838c89f8ff7667db/`
- Update logo references in HTML files
- Favicon: `684b3be32acf9b372f54d041_ws-favi.png`

**Color scheme:**
- Main CSS file: `assets/682f84b3838c89f8ff7667db/css/flowsite-dev.webflow.shared.7a89c9ea3.min.css`
- Search for color values and replace with your brand colors

### 3. Images & Media

**Replace placeholder content:**
- Hero images in `assets/682f84b3838c89f8ff7667db/`
- Team photos, product screenshots
- Video files in root directory

## 🔄 Deployment Workflow

### Development → Staging → Production

1. **Local development:**
   ```bash
   # Make your changes
   python3 -m http.server 3000
   # Test locally at http://localhost:3000
   ```

2. **Commit changes:**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```

3. **Automatic deployment:**
   - Vercel will automatically deploy when you push to main
   - Check deployment status in Vercel dashboard
   - Preview changes at your live URL

### Branch-based Development (Recommended)

```bash
# Create feature branch
git checkout -b feature/new-homepage

# Make changes and commit
git add .
git commit -m "Update homepage design"

# Push feature branch
git push origin feature/new-homepage

# Create pull request on GitHub
# Merge when ready
```

## 🛠️ Utilities

### Fix Broken Links
If you add new pages or move files, run:
```bash
python3 fix_links.py
```

### Start Development Server
```bash
python3 -m http.server 3000
```

### Check for Issues
- Test all navigation links
- Verify images load correctly
- Check mobile responsiveness
- Test on different browsers

## 📋 Pre-launch Checklist

- [ ] Update all company information
- [ ] Replace logos and branding
- [ ] Test all navigation links
- [ ] Verify contact information
- [ ] Check mobile responsiveness
- [ ] Test page load speeds
- [ ] Update meta tags for SEO
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Test contact forms
- [ ] Verify SSL certificate

## 🚨 Troubleshooting

**Links not working?**
- Run `python3 fix_links.py`
- Check for typos in href attributes

**Images not loading?**
- Verify image paths in assets folder
- Check file names match exactly (case-sensitive)

**Styling issues?**
- Clear browser cache
- Check CSS file paths
- Verify no missing dependencies

**Deployment failing?**
- Check Vercel build logs
- Ensure no sensitive files in repository
- Verify all paths are relative, not absolute

## 📞 Support

If you encounter issues:
1. Check this README first
2. Search for solutions in the code comments
3. Review the original wisprflow.ai site for reference
4. Test in a clean browser session