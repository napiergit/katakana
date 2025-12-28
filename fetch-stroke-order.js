// Script to fetch accurate stroke order data from KanjiVG
// Run with: node fetch-stroke-order.js

const https = require('https');
const fs = require('fs');

// All hiragana characters we need with their Unicode code points
const katakanaChars = [
    // Vowels
    { char: 'ア', code: '030a2' },
    { char: 'イ', code: '030a4' },
    { char: 'ウ', code: '030a6' },
    { char: 'エ', code: '030a8' },
    { char: 'オ', code: '030aa' },

    // K row
    { char: 'カ', code: '030ab' },
    { char: 'キ', code: '030ad' },
    { char: 'ク', code: '030af' },
    { char: 'ケ', code: '030b1' },
    { char: 'コ', code: '030b3' },

    // G row (dakuten)
    { char: 'ガ', code: '030ac' },
    { char: 'ギ', code: '030ae' },
    { char: 'グ', code: '030b0' },
    { char: 'ゲ', code: '030b2' },
    { char: 'ゴ', code: '030b4' },

    // S row
    { char: 'サ', code: '030b5' },
    { char: 'シ', code: '030b7' },
    { char: 'ス', code: '030b9' },
    { char: 'セ', code: '030bb' },
    { char: 'ソ', code: '030bd' },

    // Z row (dakuten)
    { char: 'ザ', code: '030b6' },
    { char: 'ジ', code: '030b8' },
    { char: 'ズ', code: '030ba' },
    { char: 'ゼ', code: '030bc' },
    { char: 'ゾ', code: '030be' },

    // T row
    { char: 'タ', code: '030bf' },
    { char: 'チ', code: '030c1' },
    { char: 'ツ', code: '030c4' },
    { char: 'テ', code: '030c6' },
    { char: 'ト', code: '030c8' },

    // D row (dakuten)
    { char: 'ダ', code: '030c0' },
    { char: 'ヂ', code: '030c2' },
    { char: 'ヅ', code: '030c5' },
    { char: 'デ', code: '030c7' },
    { char: 'ド', code: '030c9' },

    // N row
    { char: 'ナ', code: '030ca' },
    { char: 'ニ', code: '030cb' },
    { char: 'ヌ', code: '030cc' },
    { char: 'ネ', code: '030cd' },
    { char: 'ノ', code: '030ce' },

    // H row
    { char: 'ハ', code: '030cf' },
    { char: 'ヒ', code: '030d2' },
    { char: 'フ', code: '030d5' },
    { char: 'ヘ', code: '030d8' },
    { char: 'ホ', code: '030db' },

    // B row (dakuten)
    { char: 'バ', code: '030d0' },
    { char: 'ビ', code: '030d3' },
    { char: 'ブ', code: '030d6' },
    { char: 'ベ', code: '030d9' },
    { char: 'ボ', code: '030dc' },

    // P row (handakuten)
    { char: 'パ', code: '030d1' },
    { char: 'ピ', code: '030d4' },
    { char: 'プ', code: '030d7' },
    { char: 'ペ', code: '030da' },
    { char: 'ポ', code: '030dd' },

    // M row
    { char: 'マ', code: '030de' },
    { char: 'ミ', code: '030df' },
    { char: 'ム', code: '030e0' },
    { char: 'メ', code: '030e1' },
    { char: 'モ', code: '030e2' },

    // Y row
    { char: 'ヤ', code: '030e4' },
    { char: 'ユ', code: '030e6' },
    { char: 'ヨ', code: '030e8' },

    // R row
    { char: 'ラ', code: '030e9' },
    { char: 'リ', code: '030ea' },
    { char: 'ル', code: '030eb' },
    { char: 'レ', code: '030ec' },
    { char: 'ロ', code: '030ed' },

    // W row
    { char: 'ワ', code: '030ef' },
    { char: 'ヲ', code: '030f2' },

    // N
    { char: 'ン', code: '030f3' }
];

// Function to fetch SVG from KanjiVG
function fetchSVG(code) {
    return new Promise((resolve, reject) => {
        const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${code}.svg`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

// Function to parse SVG and extract stroke paths
function parseStrokes(svg, char) {
    const strokes = [];
    const pathRegex = /<path[^>]*id="[^"]*-s(\d+)"[^>]*d="([^"]+)"/g;

    let match;
    while ((match = pathRegex.exec(svg)) !== null) {
        const strokeNum = parseInt(match[1]);
        const pathData = match[2];

        // Scale from KanjiVG's 109x109 viewBox to our 0-100 scale
        const scaledPath = scalePathData(pathData, 109, 100);

        strokes.push({
            num: strokeNum,
            path: scaledPath,
            type: 'curve'
        });
    }

    return strokes;
}

// Function to scale SVG path data
function scalePathData(pathData, fromSize, toSize) {
    const scale = toSize / fromSize;

    // Scale all numbers in the path
    return pathData.replace(/-?\d+\.?\d*/g, (match) => {
        const num = parseFloat(match);
        return (num * scale).toFixed(2);
    });
}

// Main function
async function main() {
    console.log('🚀 Fetching stroke order data from KanjiVG...\n');

    const strokeOrderData = {};
    let successCount = 0;
    let failCount = 0;

    for (const { char, code } of katakanaChars) {
        try {
            process.stdout.write(`Fetching ${char} (${code})... `);
            const svg = await fetchSVG(code);
            const strokes = parseStrokes(svg, char);

            if (strokes.length > 0) {
                strokeOrderData[char] = strokes;
                console.log(`✓ (${strokes.length} strokes)`);
                successCount++;
            } else {
                console.log('✗ No strokes found');
                failCount++;
            }

            // Small delay to be nice to GitHub
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.log(`✗ Error: ${error.message}`);
            failCount++;
        }
    }

    console.log(`\n📊 Results: ${successCount} succeeded, ${failCount} failed\n`);

    // Generate the JavaScript file
    const output = `// Stroke order data for katakana characters
// Auto-generated from KanjiVG (https://github.com/KanjiVG/kanjivg)
// Licensed under Creative Commons Attribution-Share Alike 3.0
// 
// KanjiVG Copyright (C) 2009-2012 Ulrich Apel
// This stroke order data is based on KanjiVG and is used under CC BY-SA 3.0
// See: https://kanjivg.tagaini.net/

const strokeOrderData = ${JSON.stringify(strokeOrderData, null, 4)};
`;

    fs.writeFileSync('stroke-order.js', output);
    console.log('✅ Generated stroke-order.js with accurate data!');
    console.log('\n📝 Attribution added to file header as required by CC BY-SA 3.0 license');
}

main().catch(console.error);
