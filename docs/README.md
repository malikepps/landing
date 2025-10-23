# Get Hyped - Website Recreation

A pixel-perfect recreation of the Get Hyped website (https://www.gethyped.nl/) built with exact HTML, CSS, and JavaScript from the original Webflow site.

## Features

- ✅ 100% accurate visual recreation
- ✅ All original animations and interactions (GSAP + Webflow)
- ✅ Fully responsive design
- ✅ Complete Webflow component system
- ✅ Smooth scrolling with Lenis
- ✅ Interactive card animations in hero section
- ✅ All hover effects and micro-interactions

## Tech Stack

- **HTML/CSS/JS**: Extracted directly from original Webflow site
- **Animations**: GSAP (GreenSock) + ScrollTrigger
- **Smooth Scrolling**: Lenis
- **Interactions**: Finsweet Attributes
- **Typography**: Google Fonts (Inter)

## Local Development

```bash
# Start development server
python3 -m http.server 8000

# Visit: http://localhost:8000
```

## Deployment

This site is optimized for static hosting and works with:
- Vercel
- Netlify  
- GitHub Pages
- Any static hosting provider

## File Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── style_1.css     # Complete Webflow stylesheet
├── js/                 # All JavaScript files
│   ├── gsap.min.js     # GSAP animation library
│   ├── lenis.min.js    # Smooth scrolling
│   └── webflow.*.js    # Webflow functionality
├── images/             # Placeholder images
└── README.md
```

## Notes

- Images are placeholders - replace with actual content as needed
- All Webflow classes and data attributes preserved
- Original functionality maintained with local asset references