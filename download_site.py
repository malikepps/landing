#!/usr/bin/env python3
import os
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import time
from pathlib import Path

def download_website(url, max_depth=3):
    visited_urls = set()
    to_visit = [(url, 0)]
    base_domain = urlparse(url).netloc
    
    # Create output directory
    output_dir = Path("wisprflow_site")
    output_dir.mkdir(exist_ok=True)
    
    while to_visit:
        current_url, depth = to_visit.pop(0)
        
        if current_url in visited_urls or depth > max_depth:
            continue
            
        visited_urls.add(current_url)
        print(f"Downloading: {current_url} (depth: {depth})")
        
        try:
            response = requests.get(current_url, headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            })
            response.raise_for_status()
            
            # Parse URL to create file path
            parsed_url = urlparse(current_url)
            path = parsed_url.path.strip('/')
            if not path:
                path = 'index'
            if not path.endswith('.html'):
                path += '.html'
                
            # Create directory structure
            file_path = output_dir / path
            file_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save HTML content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(response.text)
            
            # Parse HTML for links and assets
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all links
            for link in soup.find_all('a', href=True):
                href = link['href']
                absolute_url = urljoin(current_url, href)
                parsed_link = urlparse(absolute_url)
                
                # Only follow links within the same domain
                if parsed_link.netloc == base_domain and absolute_url not in visited_urls:
                    to_visit.append((absolute_url, depth + 1))
            
            # Download CSS, JS, images
            for tag, attr in [('link', 'href'), ('script', 'src'), ('img', 'src')]:
                for element in soup.find_all(tag, {attr: True}):
                    asset_url = urljoin(current_url, element[attr])
                    download_asset(asset_url, output_dir)
                    
            time.sleep(1)  # Be polite
            
        except Exception as e:
            print(f"Error downloading {current_url}: {e}")

def download_asset(url, output_dir):
    try:
        response = requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        response.raise_for_status()
        
        # Create file path
        parsed_url = urlparse(url)
        path = parsed_url.path.strip('/')
        if path:
            file_path = output_dir / 'assets' / path
            file_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(file_path, 'wb') as f:
                f.write(response.content)
                
    except Exception as e:
        print(f"Error downloading asset {url}: {e}")

if __name__ == "__main__":
    download_website("https://wisprflow.ai/")