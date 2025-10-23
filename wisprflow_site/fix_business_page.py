#!/usr/bin/env python3
import re

def fix_business_page():
    """Fix business.html to use local assets and navigation"""
    
    with open('business.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update meta title and description for business focus
    content = re.sub(
        r'<title>Flow for Business \| Wispr Flow</title>',
        '<title>Collective for Business | Business Community Platform</title>',
        content
    )
    
    content = re.sub(
        r'<meta content="Flow makes writing quick and clear with seamless voice dictation\. It is the fastest, smartest way to type with your voice\." name="description"/>',
        '<meta content="Professional community management and engagement platform for business organizations to build, manage and grow their networks." name="description"/>',
        content
    )
    
    content = re.sub(
        r'<meta content="Flow for Business \| Wispr Flow" property="og:title"/>',
        '<meta content="Collective for Business | Business Community Platform" property="og:title"/>',
        content
    )
    
    content = re.sub(
        r'<meta content="Flow for Business \| Wispr Flow" property="twitter:title"/>',
        '<meta content="Collective for Business | Business Community Platform" property="twitter:title"/>',
        content
    )
    
    # Fix canonical URL
    content = re.sub(r'<link href="business\.html" rel="canonical"/>', '<link href="" rel="canonical"/>', content)
    
    # Convert CDN URLs to local asset paths
    content = re.sub(
        r'https://cdn\.prod\.website-files\.com/682f84b3838c89f8ff7667db/',
        'assets/682f84b3838c89f8ff7667db/',
        content
    )
    
    # Convert other CDN references to local
    content = re.sub(
        r'https://cdn\.prod\.website-files\.com/682fa12727f78b943ed45584/',
        'assets/682fa12727f78b943ed45584/',
        content
    )
    
    # Fix navigation brand logo to use local collective logo
    content = re.sub(
        r'<img src="assets/682f84b3838c89f8ff7667db/683215c6f233131a07d8bafc_navbar_logo\.svg"[^>]*class="nav_logo"/>',
        '<img src="collective_logo_black_svg_transparent.svg" loading="eager" alt="Collective Logo" class="nav_logo" style="transform: scale(2); transform-origin: left center;"/>',
        content
    )
    
    # Fix home link in navigation to point to index.html
    content = re.sub(r'<a href="/" ', '<a href="index.html" ', content)
    
    # Update main hero content for business focus
    hero_pattern = r'(<h1[^>]*>)(.*?)(</h1>)'
    business_hero = r'\1<span class="text-color-black20">Scale your business community.</span> Drive growth through connection.\3'
    content = re.sub(hero_pattern, business_hero, content, flags=re.DOTALL)
    
    # Update subheader for business
    subheader_pattern = r'(<p subheader-element="" class="text-size-large text-weight-semibold text-wrap-balance">)(.*?)(</p>)'
    business_subheader = r'\1Professional community management platform for enterprises, agencies, and growing businesses\3'
    content = re.sub(subheader_pattern, business_subheader, content, flags=re.DOTALL)
    
    # Update CTA buttons for business context
    content = re.sub(
        r'Download for free',
        'Get started for your business',
        content
    )
    
    content = re.sub(
        r'Apply to launch your community',
        'Schedule a business demo',
        content
    )
    
    # Update the bottom tagline
    content = re.sub(
        r'Join the collective movement',
        'Join thousands of growing businesses',
        content
    )
    
    # Write the updated content
    with open('business.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Business page rebuilt successfully!")
    print("📝 Updated:")
    print("   - Title and meta descriptions for business focus")
    print("   - Hero content for business community platform")
    print("   - CTAs for business context")
    print("   - Asset paths to use local files")
    print("   - Navigation to use collective logo")

if __name__ == "__main__":
    fix_business_page()