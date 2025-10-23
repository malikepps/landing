#!/usr/bin/env python3
"""
Remove the client logos marquee section
"""
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and remove the entire section_home-clients section
# Pattern: from <section class="section_home-clients"> to </section>
# We need to be careful to get the right closing tag

# Find the start of the section
section_start = '<section class="section_home-clients">'
section_start_pos = content.find(section_start)

if section_start_pos != -1:
    # Find the matching closing </section> tag
    # Count opening and closing section tags to find the right one
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
                print("Client logos section removed successfully!")
                break
            pos += 10
        else:
            pos += 1
else:
    print("Could not find section_home-clients")

# Write back to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")

