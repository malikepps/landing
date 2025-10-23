#!/usr/bin/env python3
"""
Remove the use-cases tabs section with 20+ user types
"""
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and remove the entire section_use-cases section
section_start = '<section class="section_use-cases min-height-desktop-50rem">'
section_start_pos = content.find(section_start)

if section_start_pos != -1:
    # Find the matching closing </section> tag
    pos = section_start_pos + len(section_start)
    section_depth = 1
    
    while pos < len(content) and section_depth > 0:
        if content[pos:pos+8] == '<section':
            section_depth += 1
            pos += 8
        elif content[pos:pos+10] == '</section>':
            section_depth -= 1
            if section_depth == 0:
                # Found the matching closing tag
                section_end_pos = pos + 10
                # Remove the entire section
                content = content[:section_start_pos] + content[section_end_pos:]
                print("Use cases section removed successfully!")
                break
            pos += 10
        else:
            pos += 1
else:
    print("Could not find section_use-cases")

# Write back to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")

