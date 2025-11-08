#!/usr/bin/env node

/**
 * Blog Image Helper Script
 * 
 * This script helps you add images to your blog with proper naming and organization.
 * 
 * Usage:
 * node scripts/add-blog-image.js path/to/image.jpg "descriptive-name"
 */

const fs = require('fs');
const path = require('path');

function addBlogImage(sourcePath, imageName) {
  // Validate inputs
  if (!sourcePath || !imageName) {
    console.error('Usage: node scripts/add-blog-image.js <source-path> <image-name>');
    console.error('Example: node scripts/add-blog-image.js ~/Desktop/screenshot.png "chrome-extension-popup"');
    process.exit(1);
  }

  // Check if source file exists
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source file "${sourcePath}" does not exist.`);
    process.exit(1);
  }

  // Get file extension
  const ext = path.extname(sourcePath);
  const cleanName = imageName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
  
  // Create destination path
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
  
  const destDir = path.join(process.cwd(), 'public', 'images', 'blog', currentYear.toString(), currentMonth);
  const destPath = path.join(destDir, `${cleanName}${ext}`);

  // Create directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
  }

  // Copy file
  try {
    fs.copyFileSync(sourcePath, destPath);
    
    // Generate markdown snippets
    const relativePath = `/images/blog/${currentYear}/${currentMonth}/${cleanName}${ext}`;
    
    console.log('✅ Image added successfully!');
    console.log(`📁 Location: ${destPath}`);
    console.log(`🔗 URL: ${relativePath}`);
    console.log('\n📝 Markdown snippets:');
    console.log('\n1. Basic image:');
    console.log(`![${cleanName.replace(/-/g, ' ')}](${relativePath})`);
    console.log('\n2. Image with caption:');
    console.log(`<figure>`);
    console.log(`  <img src="${relativePath}" alt="${cleanName.replace(/-/g, ' ')}" />`);
    console.log(`  <figcaption>Your caption here</figcaption>`);
    console.log(`</figure>`);
    console.log('\n3. Aligned images:');
    console.log(`<img src="${relativePath}" alt="${cleanName.replace(/-/g, ' ')}" class="img-left" />`);
    console.log(`<img src="${relativePath}" alt="${cleanName.replace(/-/g, ' ')}" class="img-center" />`);
    console.log(`<img src="${relativePath}" alt="${cleanName.replace(/-/g, ' ')}" class="img-right" />`);
    console.log(`<img src="${relativePath}" alt="${cleanName.replace(/-/g, ' ')}" class="img-full" />`);
    
  } catch (error) {
    console.error(`Error copying file: ${error.message}`);
    process.exit(1);
  }
}

// Get command line arguments
const [,, sourcePath, imageName] = process.argv;
addBlogImage(sourcePath, imageName);