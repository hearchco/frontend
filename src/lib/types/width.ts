export type Width = 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72;

export function randomWidth(): Width {
	const widths: Width[] = [32, 36, 40, 44, 48, 52, 56, 60, 64, 72];
	// return random number from list
	return widths[Math.floor(Math.random() * widths.length)];
}
