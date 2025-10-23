#!/usr/bin/env python3
"""
Script to simplify the navigation in index.html to just Home, Apply, About
"""
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the entire navigation menu section (from opening nav tag to closing nav tag)
# We need to replace everything between <nav role="navigation"...> and </nav>
#with just simple links

# Find the navigation section
nav_start_pattern = r'<nav role="navigation"[^>]*class="nav_menu v2 w-nav-menu">'
nav_end_pattern = r'</nav>'

# Create the new simple navigation HTML
new_nav = '''<nav role="navigation" id="w-node-_7957dad2-de7a-14a6-130e-6e11898d1052-63dfdea9" class="nav_menu v2 w-nav-menu">
<div class="nav_menu-wrapper grid v2">
<div class="nav-link-wrap"><a href="index.html" aria-current="page" class="nav_menu-link w-inline-block w--current"><div>Home</div></a></div>
<div class="nav-link-wrap"><a href="apply.html" class="nav_menu-link w-inline-block"><div>Apply</div></a></div>
<div class="nav-link-wrap"><a href="about.html" class="nav_menu-link w-inline-block"><div>About</div></a></div>
</div>
</nav>'''

# Use regex to find and replace the navigation section
# Find the start of nav
nav_start_match = re.search(nav_start_pattern, content)
if nav_start_match:
    nav_start_pos = nav_start_match.start()
    # Find the corresponding closing </nav> tag (the first one after the start)
    nav_end_pos = content.find('</nav>', nav_start_pos)
    if nav_end_pos != -1:
        nav_end_pos += len('</nav>')
        # Replace the section
        content = content[:nav_start_pos] + new_nav + content[nav_end_pos:]
        print("Navigation section replaced successfully")
    else:
        print("Could not find closing </nav> tag")
else:
    print("Could not find navigation start tag")

# Write back to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")

