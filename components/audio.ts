/* Shared Web Audio percussion voices.
   The tabla voice is additive: a crisp attack transient plus a stack of
   near-harmonic partials (1:2:3:4:5:6) with higher partials decaying faster —
   which is what gives a real tabla its pitched, ringing "na/tin" character
   instead of a dull blip. */

export function noiseBuffer(ac: AudioContext, dur: number) {
  const len = Math.floor(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

// Near-harmonic modes of a loaded tabla head. Higher modes: quieter + shorter.
const PARTIALS = [
  { r: 1.0, a: 0.5, d: 0.62 },
  { r: 2.0, a: 0.5, d: 0.46 },
  { r: 3.0, a: 0.46, d: 0.3 }, // the 3rd carries much of the "ring"
  { r: 4.01, a: 0.22, d: 0.2 },
  { r: 5.02, a: 0.12, d: 0.14 },
  { r: 6.0, a: 0.06, d: 0.1 },
];

/* ---- Real sample playback (accurate) -----------------------------------
   Drop a real tabla recording at /public/audio/tabla-na.wav and it will be
   used automatically; otherwise we fall back to the synth below. Using your
   own recording is ideal (authentic + rights-clean). */
let tablaBuffer: AudioBuffer | null = null;
let tablaTried = false;

export function loadTabla(ac: AudioContext, url = "/audio/tabla-na.wav") {
  if (tablaBuffer || tablaTried) return;
  tablaTried = true;
  fetch(url)
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error("no sample"))))
    .then((b) => ac.decodeAudioData(b))
    .then((buf) => { tablaBuffer = buf; })
    .catch(() => { /* no sample present — synth fallback stays in use */ });
}

/** Play a tabla stroke — real sample if available, else the synth. */
export function strikeTabla(
  ac: AudioContext,
  dest: AudioNode,
  t: number = ac.currentTime,
  opts: { freq?: number; vel?: number } = {}
) {
  const vel = opts.vel ?? 1;
  if (tablaBuffer) {
    const src = ac.createBufferSource();
    src.buffer = tablaBuffer;
    src.playbackRate.value = opts.freq ? opts.freq / 247 : 1; // pitch variety
    const g = ac.createGain();
    g.gain.value = vel;
    src.connect(g).connect(dest);
    src.start(t);
    return;
  }
  playTabla(ac, dest, t, opts);
}

/** A ringing dayan "na" stroke, tuned to `freq` (synth fallback). */
export function playTabla(
  ac: AudioContext,
  dest: AudioNode,
  t: number = ac.currentTime,
  opts: { freq?: number; vel?: number } = {}
) {
  const f0 = opts.freq ?? 247;
  const vel = opts.vel ?? 1;

  const out = ac.createGain();
  out.gain.value = 0.32 * vel;
  out.connect(dest);

  // attack transient — the finger contact ("tak")
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, 0.03);
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2600;
  bp.Q.value = 0.7;
  const ng = ac.createGain();
  ng.gain.setValueAtTime(0.0001, t);
  ng.gain.exponentialRampToValueAtTime(0.45, t + 0.002);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);
  src.connect(bp).connect(ng).connect(out);
  src.start(t);
  src.stop(t + 0.04);

  // harmonic partials — the pitched, ringing body
  for (const p of PARTIALS) {
    const o = ac.createOscillator();
    o.type = "sine";
    const f = f0 * p.r;
    o.frequency.setValueAtTime(f * 1.015, t); // slight sharp attack…
    o.frequency.exponentialRampToValueAtTime(f, t + 0.03); // …settling to pitch
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(p.a, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + p.d);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + p.d + 0.05);
  }
}
