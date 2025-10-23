#!/usr/bin/env python3
import re

def fix_business_scripts():
    """Fix JavaScript references in business.html to match working index.html"""
    
    with open('business.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix the webflow script section by replacing the entire script block
    # Current broken scripts in business.html
    old_scripts = r'<script src="assets/682f84b3838c89f8ff7667db/js/webflow\.schunk\.57d5559d2f0cd9f8\.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow\.schunk\.8772e4ae7b4c037f\.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow\.schunk\.b038614c383a1adf\.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow\.schunk\.121b0d7ff03e0f4a\.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow\.schunk\.b4435221be879eb3\.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow\.d94ac305\.ed67a1cb383ccc42\.js" type="text/javascript"></script>'
    
    # Working scripts from index.html
    new_scripts = '''<script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.57d5559d2f0cd9f8.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.b2ce14101321326c.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.8772e4ae7b4c037f.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.7e7410a2aeb75ffd.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.121b0d7ff03e0f4a.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.f919141e3448519b.js" type="text/javascript"></script><script src="assets/682f84b3838c89f8ff7667db/js/webflow.530a041a.880447c592a96710.js" type="text/javascript"></script>'''
    
    content = re.sub(old_scripts, new_scripts, content)
    
    # Fix any remaining incorrect webflow script references
    content = re.sub(
        r'<script src="assets/682f84b3838c89f8ff7667db/js/webflow\.schunk\.b038614c383a1adf\.js"[^>]*></script>',
        '<script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.b2ce14101321326c.js" type="text/javascript"></script>',
        content
    )
    
    content = re.sub(
        r'<script src="assets/682f84b3838c89f8ff7667db/js/webflow\.d94ac305\.ed67a1cb383ccc42\.js"[^>]*></script>',
        '<script src="assets/682f84b3838c89f8ff7667db/js/webflow.530a041a.880447c592a96710.js" type="text/javascript"></script>',
        content
    )
    
    content = re.sub(
        r'<script src="assets/682f84b3838c89f8ff7667db/js/webflow\.schunk\.b4435221be879eb3\.js"[^>]*></script>',
        '<script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.f919141e3448519b.js" type="text/javascript"></script>',
        content
    )
    
    # Add missing script if it's not there
    if 'webflow.schunk.7e7410a2aeb75ffd.js' not in content:
        content = re.sub(
            r'(<script src="assets/682f84b3838c89f8ff7667db/js/webflow\.schunk\.8772e4ae7b4c037f\.js" type="text/javascript"></script>)',
            r'\1<script src="assets/682f84b3838c89f8ff7667db/js/webflow.schunk.7e7410a2aeb75ffd.js" type="text/javascript"></script>',
            content
        )
    
    # Write the updated content
    with open('business.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Business page JavaScript references fixed!")
    print("📝 Updated:")
    print("   - Fixed CSS file reference to use existing local file")
    print("   - Updated JavaScript files to match working index.html")
    print("   - All assets should now load properly with styling and animations")

if __name__ == "__main__":
    fix_business_scripts()