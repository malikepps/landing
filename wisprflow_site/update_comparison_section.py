#!/usr/bin/env python3
"""
Update the comparison section from typing speed to Instagram vs Collective reach
"""
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update the main heading from "4x faster than typing" to "Reach your community directly"
content = re.sub(
    r'<div>4x faster</div>',
    '<div>Reach your</div>',
    content
)

content = re.sub(
    r'<div class="heading_text">Â than typing</div>',
    '<div class="heading_text"> community directly</div>',
    content
)

# Update the subheading paragraph
old_paragraph = r'After 150 years of using the same keyboard, voice that actually works is <em>finally</em> here\. When you create, code, and respond faster, you free up time for more\. Speak naturally at the speed you think and let Flow handle the rest\.'
new_paragraph = 'Social media algorithms hide your message from the people who want to hear it. With Collective, every post reaches 100% of your community—no fighting for visibility, no boosted posts, just direct connection.'

content = re.sub(old_paragraph, new_paragraph, content)

# Update the left side (Keyboard -> Instagram, 45 wpm -> 5% reach)
content = re.sub(
    r'<div class="text-size-large">Keyboard</div>',
    '<div class="text-size-large">Instagram</div>',
    content
)

content = re.sub(
    r'<h3>45 wpm</h3>',
    '<h3>5% reach</h3>',
    content
)

# Update the right side (Flow -> Collective, 220 wpm -> 100% reach)
# Find the section with "Flow" label and "220 wpm"
content = re.sub(
    r'(<div class="faster_content">)\s*<div class="text-size-large">Flow</div>\s*<h3>220 wpm</h3>',
    r'\1<div class="text-size-large">Collective</div><h3>100% reach</h3>',
    content
)

# Update button text in this section
# Find "Try Flow" button and change to "Learn More"
content = re.sub(
    r'<div web-demo-text="">Try Flow</div>',
    '<div>Learn More</div>',
    content
)

# Change web-demo-open link to regular link pointing to about.html
content = re.sub(
    r'<a web-demo-open="" cta="" cta_location="4x_faster_section" cta_type="web_demo" href="/demo"',
    '<a cta="" cta_location="reach_section" cta_type="learn_more" href="about.html"',
    content
)

# Update the "Download" button to "Apply to Join"
content = re.sub(
    r'<a app-download="" cta="" cta_location="4x_faster_section" cta_type="download" href="index\.html" class="button w-inline-block"><div>Download for free</div></a>',
    '<a cta="" cta_location="reach_section" cta_type="apply" href="apply.html" class="button w-inline-block"><div>Apply to Join</div></a>',
    content
)

# Write back to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Comparison section updated to Instagram vs Collective!")

