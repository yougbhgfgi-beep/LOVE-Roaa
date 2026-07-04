import { Jimp } from 'jimp'

function heartX(t, s) { return Math.round(s * 16 * Math.pow(Math.sin(t), 3)) }
function heartY(t, s) { return Math.round(s * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))) }

function createHeartImage(size) {
  const s = size / 30
  const cx = size / 2
  const cy = size / 2 - size * 0.1
  const data = Buffer.alloc(size * size * 4)
  // background
  for (let i = 0; i < size * size; i++) {
    data[i*4] = 13; data[i*4+1] = 5; data[i*4+2] = 8; data[i*4+3] = 255
  }
  // heart fill
  for (let t = 0; t <= 2 * Math.PI; t += 0.005) {
    const hx = heartX(t, s)
    const hy = heartY(t, s)
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const px = Math.round(cx + hx + dx)
        const py = Math.round(cy - hy + dy)
        if (px >= 0 && px < size && py >= 0 && py < size) {
          const idx = (py * size + px) * 4
          data[idx] = 244; data[idx+1] = 63; data[idx+2] = 94; data[idx+3] = 255
        }
      }
    }
  }
  return Jimp.fromBitmap({ width: size, height: size, data })
}

await createHeartImage(192).write('public/icon-192x192.png')
await createHeartImage(512).write('public/icon-512x512.png')
console.log('Done')
