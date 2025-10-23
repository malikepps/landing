#!/usr/bin/env python3
import os
import re

# Navigation link mappings
nav_fixes = [
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="developers.html" class="dropdown-link w-inline-block"', 'developers'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="creators.html" class="dropdown-link w-inline-block"', 'creators'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="customer-support.html" class="dropdown-link w-inline-block"', 'customer_support'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="students.html" class="dropdown-link w-inline-block"', 'students'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="lawyers.html" class="dropdown-link w-inline-block"', 'lawyers'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="accessibility.html" class="dropdown-link w-inline-block"', 'accessibility'),
    ('href="index.html" class="nav_menu-link w-inline-block"', 'href="pricing.html" class="nav_menu-link w-inline-block"', 'pricing'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="blog.html" class="dropdown-link w-inline-block"', 'blog'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="company.html" class="dropdown-link w-inline-block"', 'company'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="careers.html" class="dropdown-link w-inline-block"', 'careers'),
    ('href="index.html" class="dropdown-link w-inline-block"', 'href="about.html" class="dropdown-link w-inline-block"', 'media'),
    ('href="index.html" class="nav_menu-link research w-inline-block"', 'href="research.html" class="nav_menu-link research w-inline-block"', 'research'),
    ('href="index.html" class="nav_menu-link w-inline-block"', 'href="business.html" class="nav_menu-link w-inline-block"', 'teams'),
]

# More specific navigation fixes using nav-link attributes
specific_fixes = [
    (r'<a nav-link="developers" href="index\.html"', '<a nav-link="developers" href="developers.html"'),
    (r'<a nav-link="creators" href="index\.html"', '<a nav-link="creators" href="creators.html"'),
    (r'<a nav-link="customer_support" href="index\.html"', '<a nav-link="customer_support" href="customer-support.html"'),
    (r'<a nav-link="students" href="index\.html"', '<a nav-link="students" href="students.html"'),
    (r'<a nav-link="lawyers" href="index\.html"', '<a nav-link="lawyers" href="lawyers.html"'),
    (r'<a nav-link="accessibility" href="index\.html"', '<a nav-link="accessibility" href="accessibility.html"'),
    (r'<a nav-link="pricing" href="index\.html"', '<a nav-link="pricing" href="pricing.html"'),
    (r'<a nav-link="blog" href="index\.html"', '<a nav-link="blog" href="blog.html"'),
    (r'<a nav-link="company" href="index\.html"', '<a nav-link="company" href="company.html"'),
    (r'<a nav-link="careers" href="index\.html"', '<a nav-link="careers" href="careers.html"'),
    (r'<a nav-link="media" href="index\.html"', '<a nav-link="media" href="about.html"'),
    (r'<a nav-link="research" href="index\.html"', '<a nav-link="research" href="research.html"'),
    (r'<a nav-link="teams" href="index\.html"', '<a nav-link="teams" href="business.html"'),
    (r'<a nav-link="gaurav_case_study" href="index\.html"', '<a nav-link="gaurav_case_study" href="about.html"'),
    (r'<a nav-link="greg_case_study" href="index\.html"', '<a nav-link="greg_case_study" href="about.html"'),
    (r'<a nav-link="anthony_case_study" href="index\.html"', '<a nav-link="anthony_case_study" href="about.html"'),
]

def fix_navigation_in_file(filepath):
    """Fix navigation links in a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes_made = 0
        
        # Apply specific regex fixes
        for pattern, replacement in specific_fixes:
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                changes_made += 1
                content = new_content
        
        # Apply mobile download button fixes
        content = re.sub(r'href="index\.html" class="nav_mobile-btn w-button">Apply to launch your community', 
                        'href="about.html" class="nav_mobile-btn w-button">Apply to launch your community', content)
        
        # Apply main CTA button fixes  
        content = re.sub(r'href="index\.html" class="button w-inline-block"><div>Apply to launch your community</div>', 
                        'href="about.html" class="button w-inline-block"><div>Apply to launch your community</div>', content)
        content = re.sub(r'href="index\.html" class="nav_big-button button.*?"><div>Apply to launch your community</div>', 
                        'href="about.html" class="nav_big-button button w-node-c3e00823-9abf-42db-4599-adf2322aefc8-63dfdea9 w-inline-block"><div>Apply to launch your community</div>', content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed navigation in {filepath} ({changes_made} changes)")
            return True
        else:
            print(f"ℹ️  No changes needed in {filepath}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False

def main():
    """Fix navigation links in all HTML files"""
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    print(f"🔧 Fixing navigation links in {len(html_files)} HTML files...")
    
    fixed_count = 0
    for html_file in html_files:
        if fix_navigation_in_file(html_file):
            fixed_count += 1
    
    print(f"\n🎉 Navigation fix complete! Fixed {fixed_count} files.")

if __name__ == "__main__":
    main()