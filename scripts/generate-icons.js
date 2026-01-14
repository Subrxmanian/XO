/**
 * App Icon Generator Script for XO Tic Tac Toe
 * 
 * USAGE:
 * 1. First, install sharp: npm install sharp --save-dev
 * 2. Place your 1024x1024 icon as: assets/image/app-icon.png
 * 3. Run: node scripts/generate-icons.js
 * 
 * This will generate all required icon sizes for Android and iOS
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source icon path
const SOURCE_ICON = path.join(__dirname, '../assets/image/app-icon.png');

// Android icon configurations
const ANDROID_ICONS = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

// iOS icon configurations (based on standard requirements)
const IOS_ICONS = [
  { name: 'Icon-20', size: 20 },
  { name: 'Icon-20@2x', size: 40 },
  { name: 'Icon-20@3x', size: 60 },
  { name: 'Icon-29', size: 29 },
  { name: 'Icon-29@2x', size: 58 },
  { name: 'Icon-29@3x', size: 87 },
  { name: 'Icon-40', size: 40 },
  { name: 'Icon-40@2x', size: 80 },
  { name: 'Icon-40@3x', size: 120 },
  { name: 'Icon-60@2x', size: 120 },
  { name: 'Icon-60@3x', size: 180 },
  { name: 'Icon-76', size: 76 },
  { name: 'Icon-76@2x', size: 152 },
  { name: 'Icon-83.5@2x', size: 167 },
  { name: 'Icon-1024', size: 1024 },
];

// Android base path
const ANDROID_RES_PATH = path.join(__dirname, '../android/app/src/main/res');

// iOS base path
const IOS_ASSETS_PATH = path.join(__dirname, '../ios/xo/Images.xcassets/AppIcon.appiconset');

async function generateAndroidIcons() {
  console.log('\n📱 Generating Android Icons...\n');
  
  for (const config of ANDROID_ICONS) {
    const outputDir = path.join(ANDROID_RES_PATH, config.folder);
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate square icon
    const outputPath = path.join(outputDir, 'ic_launcher.png');
    await sharp(SOURCE_ICON)
      .resize(config.size, config.size)
      .png()
      .toFile(outputPath);
    console.log(`  ✅ ${config.folder}/ic_launcher.png (${config.size}x${config.size})`);
    
    // Generate round icon
    const roundOutputPath = path.join(outputDir, 'ic_launcher_round.png');
    await sharp(SOURCE_ICON)
      .resize(config.size, config.size)
      .png()
      .toFile(roundOutputPath);
    console.log(`  ✅ ${config.folder}/ic_launcher_round.png (${config.size}x${config.size})`);
  }
}

async function generateIOSIcons() {
  console.log('\n🍎 Generating iOS Icons...\n');
  
  // Ensure directory exists
  if (!fs.existsSync(IOS_ASSETS_PATH)) {
    fs.mkdirSync(IOS_ASSETS_PATH, { recursive: true });
  }
  
  for (const config of IOS_ICONS) {
    const outputPath = path.join(IOS_ASSETS_PATH, `${config.name}.png`);
    await sharp(SOURCE_ICON)
      .resize(config.size, config.size)
      .png()
      .toFile(outputPath);
    console.log(`  ✅ ${config.name}.png (${config.size}x${config.size})`);
  }
  
  // Generate Contents.json for iOS
  const contentsJson = {
    images: IOS_ICONS.map(config => ({
      filename: `${config.name}.png`,
      idiom: config.name.includes('60') || config.name.includes('40') && config.size <= 120 ? 'iphone' : 
             config.name.includes('76') || config.name.includes('83') ? 'ipad' : 'universal',
      scale: config.name.includes('@3x') ? '3x' : config.name.includes('@2x') ? '2x' : '1x',
      size: `${config.name.includes('@') ? config.name.split('-')[1].split('@')[0] : config.size}x${config.name.includes('@') ? config.name.split('-')[1].split('@')[0] : config.size}`
    })),
    info: {
      author: 'xcode',
      version: 1
    }
  };
  
  fs.writeFileSync(
    path.join(IOS_ASSETS_PATH, 'Contents.json'),
    JSON.stringify(contentsJson, null, 2)
  );
  console.log('  ✅ Contents.json generated');
}

async function main() {
  console.log('🎨 XO App Icon Generator');
  console.log('========================\n');
  
  // Check if source icon exists
  if (!fs.existsSync(SOURCE_ICON)) {
    console.error('❌ Error: Source icon not found!');
    console.error(`   Please place your 1024x1024 icon at: ${SOURCE_ICON}`);
    console.error('\n📝 Tips for creating your icon:');
    console.error('   1. Use a design tool (Figma, Canva, etc.)');
    console.error('   2. Create a 1024x1024 PNG with gradient background');
    console.error('   3. Add "XO" text in white, bold font');
    console.error('   4. Save as: assets/image/app-icon.png');
    process.exit(1);
  }
  
  try {
    await generateAndroidIcons();
    await generateIOSIcons();
    
    console.log('\n✨ All icons generated successfully!\n');
    console.log('📋 Next steps:');
    console.log('   1. For Android: Rebuild the app with `npx react-native run-android`');
    console.log('   2. For iOS: Open Xcode and rebuild, or run `npx react-native run-ios`');
    console.log('   3. You may need to clear the app cache on your device\n');
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

main();
