#!/usr/bin/env python3
"""
Clean up remaining dropdown menu elements after the simplified nav
"""
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the section after </nav></div> that still contains dropdown menus
# and remove everything until the <div class="nav_mobile-cta">

# Pattern: find everything between </nav></div> (after our simplified nav) and <div class="nav_mobile-cta">
pattern = r'(</nav></div>)(.*?)(<div class="nav_mobile-cta">)'

# Replace with just the opening and closing tags, removing everything in between
def replacer(match):
    return match.group(1) + match.group(3)

content = re.sub(pattern, replacer, content, flags=re.DOTALL)

# Write back to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up remaining dropdown menus!")

