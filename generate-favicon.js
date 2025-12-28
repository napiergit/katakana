const fs = require('fs');
const { createCanvas } = require('canvas');

const width = 512;
const height = 512;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient (same as OG image but simpler)
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#a855f7');
gradient.addColorStop(1, '#3b82f6');
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
ctx.fill();

// Character
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 350px Arial, sans-serif'; // Large font for the single character
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
// Proper vertical alignment adjustment for 'ア'
ctx.fillText('ア', width / 2, height / 2 + 25);

// Save to file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('favicon.png', buffer);
console.log('✅ favicon.png created successfully!');
