#!/usr/bin/env python3
import os
import re

def fix_about_dropdown_in_file(filepath):
    """Make About dropdown clickable in a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix the About dropdown to be clickable
        pattern = r'<div class="dropdown1_toggle v2 w-dropdown-toggle"><div>About</div>'
        replacement = '<a href="about.html" class="dropdown1_toggle v2 w-dropdown-toggle w-inline-block"><div>About</div>'
        content = re.sub(pattern, replacement, content)
        
        # Fix the closing tag structure 
        pattern2 = r'<div class="dropdown1_border-radius"></div></div></div><nav class="dropdown-list-v2 w-dropdown-list">'
        replacement2 = '<div class="dropdown1_border-radius"></div></div></a><nav class="dropdown-list-v2 w-dropdown-list">'
        content = re.sub(pattern2, replacement2, content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed About dropdown in {filepath}")
            return True
        else:
            print(f"ℹ️  No About dropdown found in {filepath}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False

def main():
    """Fix About dropdown in all HTML files"""
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']  # Skip index.html as we already fixed it
    
    print(f"🔧 Fixing About dropdown in {len(html_files)} HTML files...")
    
    fixed_count = 0
    for html_file in html_files:
        if fix_about_dropdown_in_file(html_file):
            fixed_count += 1
    
    print(f"\n🎉 About dropdown fix complete! Fixed {fixed_count} files.")

if __name__ == "__main__":
    main()