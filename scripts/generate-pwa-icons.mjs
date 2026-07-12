import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SOURCE = "public/brasao-ceara.svg";
const BACKGROUND = "#121212";
const CREST_RATIO = 0.62;

mkdirSync("public/icons", { recursive: true });

for (const size of SIZES) {
  const crestSize = Math.round(size * CREST_RATIO);
  const crest = await sharp(SOURCE, { density: 300 })
    .resize(crestSize, crestSize, { fit: "inside" })
    .png()
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: BACKGROUND },
  })
    .composite([{ input: crest, gravity: "center" }])
    .png()
    .toFile(`public/icons/icon-${size}x${size}.png`);

  console.log(`icon-${size}x${size}.png`);
}
