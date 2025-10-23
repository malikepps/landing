#!/usr/bin/env python3
"""
Update the platform/app integrations section to focus on community
"""
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the three platform chips (iOS, Mac, Windows) with one web-based chip
# Pattern: find the entire chips-div section
old_chips = r'<div data-wf--integrations-light-color--variant="base" class="home_integrations_chips-div"><div class="home_integrations_chip"><img src="assets/682f84b3838c89f8ff7667db/6832323f127062351dc681c7_apple_symobl\.svg" loading="lazy" alt="" class="home_integrations_chip-logo apple"/><div class="text-color-alternate text-weight-bold">iOS</div></div><div class="home_integrations_chip"><img src="assets/682f84b3838c89f8ff7667db/6832323f127062351dc681c7_apple_symobl\.svg" loading="lazy" alt="" class="home_integrations_chip-logo apple"/><div class="text-color-alternate text-weight-bold">Mac</div></div><div class="home_integrations_chip"><img src="assets/682f84b3838c89f8ff7667db/6832323fbe339316d0a134c8_windows_symbol\.svg\.svg" loading="lazy" alt="" class="home_integrations_chip-logo"/><div class="text-color-alternate text-weight-bold">Windows</div></div></div>'

new_chips = '<div data-wf--integrations-light-color--variant="base" class="home_integrations_chips-div"><div class="home_integrations_chip"><div class="text-color-alternate text-weight-bold">100% web based — works on any device</div></div></div>'

content = content.replace(old_chips, new_chips)

# Update the heading from "Write faster in all your apps, on any device" to "Built for community, not algorithms"
content = content.replace(
    '<h2 class="text-color-secondary">Write faster in all your apps, on any device</h2>',
    '<h2 class="text-color-secondary">Built for community, not algorithms</h2>'
)

# Update the paragraph
content = content.replace(
    '<p class="text-size-large">Seamless speech-to-text in every application on your iPhone or computer.</p>',
    '<p class="text-size-large">Bring your people together in a space designed for connection, not clicks. No algorithms deciding who sees what—just direct communication with your community.</p>'
)

# Update the button from "Watch in action" to "Learn More" and link to about.html
content = re.sub(
    r'<div cta_type="watch_in_action" cta="" cta_location="homepage" class="button is-secondary"><div>Watch in action</div></div>',
    '<div cta_type="learn_more" cta="" cta_location="community_section" class="button is-secondary"><div>Learn More</div></div>',
    content
)

# Update the lightbox link to point to about.html instead of #
content = re.sub(
    r'<a href="#" class="w-inline-block w-lightbox">',
    '<a href="about.html" class="w-inline-block">',
    content
)

# Write back to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Platform section updated to community focus!")

