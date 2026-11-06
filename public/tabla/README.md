# Tabla clips — drop-in guide

The Tabla section (`components/measured/Tabla.tsx`, data in `data.ts` → `tabla.clips`)
plays these clips on hover. Drop web-optimized MP4s here with these exact names:

| File                       | Video                        | TikTok views |
| -------------------------- | ---------------------------- | ------------ |
| `apna-bana-le.mp4`         | Arijit "Apna Bana Le" tabla  | 6.9K         |
| `ride-with-the-mob.mp4`    | "Ride with the MOB" dhol     | 2.8K         |
| `mera-dhol-na-sun.mp4`     | @saveree "Mera Dhol Na Sun"  | 2.6K         |
| `ap-dhillon.mp4`           | AP Dhillon new album tabla   | 1.7K         |

Optional posters (first frame): same name with `.jpg` (e.g. `apna-bana-le.jpg`).
If omitted they can be generated from each MP4.

## Recommended encode (muted, ~6-8s loop, portrait, small)

```
ffmpeg -i input.mov -an -vf "scale=720:-2,crop=720:1280" -t 8 \
  -c:v libx264 -crf 24 -preset slow -movflags +faststart apna-bana-le.mp4

# optional poster
ffmpeg -i apna-bana-le.mp4 -frames:v 1 -q:v 3 apna-bana-le.jpg
```

To feature different videos, edit `tabla.clips` in `components/measured/data.ts`.
