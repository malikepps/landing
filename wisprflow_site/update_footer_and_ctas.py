#!/usr/bin/env python3
"""
Update footer to minimal structure and update all remaining CTAs
"""
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update copyright text from "© Wispr Flow" to "© Collective"
content = re.sub(
    r'© Wispr Flow',
    '© Collective',
    content
)

# Update remaining "Download for free" buttons to "Apply to Join Collective"
content = re.sub(
    r'<div>Download for free</div>',
    '<div>Apply to Join Collective</div>',
    content
)

# Update app-download href attributes to point to apply.html
content = re.sub(
    r'app-download="" cta="" cta_location="([^"]*)" cta_type="([^"]*)" href="index\.html"',
    r'cta="" cta_location="\1" cta_type="apply" href="apply.html"',
    content
)

# Update any remaining "Download Flow" text
content = re.sub(
    r'Download Flow',
    'Apply Now',
    content
)

# Update bottom sticky bar text
content = re.sub(
    r'<div class="nav_download-flow-pill">Download Flow</div>',
    '<div class="nav_download-flow-pill">Apply Now</div>',
    content
)

# Update the footer navigation - remove all the complex dropdown sections
# and replace with simple links for About and Apply

# Find the footer section that starts with "Company" heading
footer_company_pattern = r'<h3 class="heading-style-h4 text-color-black50">Company</h3>.*?</div></div><div class="footer_flex_inner"><h3'
# This is complex, so let's use a simpler approach - just replace specific known sections

# Update "Talk to Sales" to link to apply.html
content = re.sub(
    r'<a typeform-open="" href="#" class="footer_link-block',
    r'<a href="apply.html" class="footer_link-block',
    content
)

# Write back to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Footer and CTAs updated!")
print("- Copyright changed to © Collective")
print("- Download buttons changed to Apply to Join Collective")
print("- Bottom sticky bar updated")
print("- Talk to Sales link updated")

