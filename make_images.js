const fs = require('fs');
const path = require('path');
// A valid 1x1 transparent PNG
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 'base64');
const images = [
  'public/projects/bharatpath/home.png',
  'public/projects/bharatpath/journey.png',
  'public/projects/bharatpath/sos.png',
  'public/projects/bharatpath/tracking.png',
  'public/projects/politico/home.png',
  'public/projects/politico/politics.png',
  'public/projects/devcopilot/home.png',
  'public/projects/devcopilot/review.png',
];
images.forEach(imgPath => {
  const fullPath = path.join(__dirname, imgPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, png);
});
