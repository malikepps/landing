#!/usr/bin/env python3
import requests
import os
import re
from pathlib import Path
from bs4 import BeautifulSoup
import urllib.parse

def download_file(url, local_path):
    """Download a file from URL to local path"""
    try:
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()
        
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✅ Downloaded: {local_path}")
        return True
    except Exception as e:
        print(f"❌ Failed to download {url}: {e}")
        return False

def scan_and_download_assets():
    """Scan all HTML files and download missing assets"""
    
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    assets_to_download = set()
    
    print(f"📄 Scanning {len(html_files)} HTML files for assets...")
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            
            # Find all asset references
            for element in soup.find_all(['img', 'link', 'script']):
                src = element.get('src') or element.get('href') or element.get('data-src')
                if src and src.startswith('assets/'):
                    assets_to_download.add(src)
            
            # Find assets in style attributes and CSS
            for element in soup.find_all(attrs={'style': True}):
                style = element.get('style', '')
                matches = re.findall(r'url\(["\']?(assets/[^"\')\s]+)["\']?\)', style)
                for match in matches:
                    assets_to_download.add(match)
            
            # Find assets using regex patterns
            asset_patterns = [
                r'assets/[^"\s)]+\.(jpg|jpeg|png|gif|svg|webp|avif|css|js|woff|woff2|lottie|riv)',
                r'data-src="(assets/[^"]+)"',
                r'src="(assets/[^"]+)"',
                r'href="(assets/[^"]+)"'
            ]
            
            for pattern in asset_patterns:
                matches = re.findall(pattern, content, re.IGNORECASE)
                for match in matches:
                    if isinstance(match, tuple):
                        asset_path = match[0] if match[0].startswith('assets/') else f"assets/{match[0]}"
                        assets_to_download.add(asset_path)
                    else:
                        full_matches = re.findall(f'assets/[^"\s)]*{re.escape(match)}', content, re.IGNORECASE)
                        for full_match in full_matches:
                            assets_to_download.add(full_match)
        
        except Exception as e:
            print(f"❌ Error scanning {html_file}: {e}")
    
    print(f"🔍 Found {len(assets_to_download)} unique assets to check...")
    
    # Download missing assets
    downloaded = 0
    for asset_path in assets_to_download:
        # Check if file already exists
        if os.path.exists(asset_path):
            continue
            
        # Construct the CDN URL
        if asset_path.startswith('assets/682f84b3838c89f8ff7667db/'):
            cdn_url = f"https://cdn.prod.website-files.com/{asset_path}"
        elif asset_path.startswith('assets/'):
            cdn_url = f"https://cdn.prod.website-files.com/{asset_path}"
        else:
            continue
        
        if download_file(cdn_url, asset_path):
            downloaded += 1
    
    print(f"\n✅ Downloaded {downloaded} new assets!")
    return downloaded

if __name__ == "__main__":
    print("🎯 Scanning all pages for missing assets...")
    downloaded = scan_and_download_assets()
    print(f"\n🎉 Asset download complete! Downloaded {downloaded} files.")