const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// SVGコンテンツ（ファイルから読み込むか、直接定義）
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="spadeGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="256" cy="256" r="250" fill="#1a1a1a" stroke="url(#spadeGradient)" stroke-width="12"/>
  
  <!-- Spade shape -->
  <path d="M256 80 C180 140, 100 200, 100 280 C100 360, 160 400, 220 400 C240 400, 250 390, 250 370 C250 350, 240 340, 220 340 C200 340, 180 320, 180 280 C180 240, 220 200, 256 160 C292 200, 332 240, 332 280 C332 320, 312 340, 292 340 C272 340, 262 350, 262 370 C262 390, 272 400, 292 400 C352 400, 412 360, 412 280 C412 200, 332 140, 256 80 Z" fill="url(#spadeGradient)"/>
  
  <!-- Stem -->
  <rect x="236" y="340" width="40" height="90" fill="url(#spadeGradient)"/>
</svg>`;

async function generateIcons() {
  const sizes = [16, 32, 48, 64, 96, 128, 144, 152, 192, 256, 384, 512];
  const publicDir = path.join(__dirname, '..', 'public');
  
  console.log('Generating spade icons...');
  
  // sharpがインストールされているか確認
  try {
    // 各サイズのアイコンを生成
    for (const size of sizes) {
      const outputPath = path.join(publicDir, `spade-${size}x${size}.png`);
      
      await sharp(Buffer.from(svgContent))
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${size}x${size} icon`);
    }
    
    // favicon.ico用の複数サイズを含むICOファイルを生成
    // 注：sharpはICO形式を直接サポートしていないため、16x16のPNGをfavicon.pngとして保存
    await sharp(Buffer.from(svgContent))
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));
    
    console.log('✓ Generated favicon.png');
    
    // Apple touch icon
    await sharp(Buffer.from(svgContent))
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    console.log('✓ Generated apple-touch-icon.png');
    
    // Android Chrome用
    await sharp(Buffer.from(svgContent))
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    
    await sharp(Buffer.from(svgContent))
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    
    console.log('✓ Generated Android Chrome icons');
    
  } catch (error) {
    console.error('Error generating icons:', error);
    console.log('\nNote: This script requires the "sharp" package.');
    console.log('Install it with: npm install sharp');
  }
}

generateIcons();