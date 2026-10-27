// Advance widths (in em) of Rethink Sans Bold, measured in the browser. Used to size
// headings so a line fills the available width without measuring on the client.
const widths: Record<string, number> = {
  a: 0.555, b: 0.598, c: 0.544, d: 0.598, e: 0.553, f: 0.318, g: 0.527, h: 0.562, i: 0.227, j: 0.228,
  k: 0.523, l: 0.219, m: 0.906, n: 0.562, o: 0.582, p: 0.598, q: 0.599, r: 0.342, s: 0.474, t: 0.351,
  u: 0.562, v: 0.524, w: 0.747, x: 0.472, y: 0.535, z: 0.413,
  A: 0.694, B: 0.623, C: 0.729, D: 0.703, E: 0.562, F: 0.532, G: 0.765, H: 0.698, I: 0.256, J: 0.524,
  K: 0.632, L: 0.535, M: 0.827, N: 0.713, O: 0.797, P: 0.599, Q: 0.802, R: 0.615, S: 0.589, T: 0.582,
  U: 0.673, V: 0.691, W: 0.997, X: 0.641, Y: 0.617, Z: 0.558,
  " ": 0.23, ".": 0.226, ",": 0.23, ";": 0.266, ":": 0.242, "!": 0.286, "?": 0.527, "’": 0.264, "'": 0.241,
  "&": 0.713, "-": 0.433, "—": 0.868,
};

/** Width of `text` in em when set in Rethink Sans Bold with the given letter-spacing (em). */
export function headingWidthEm(text: string, tracking = 0) {
  return [...text].reduce((sum, char) => sum + (widths[char] ?? 0.58) + tracking, 0);
}
