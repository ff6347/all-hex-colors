const r = [];
const g = [];
const b = [];

for (
	let r0 = 0, r1 = 0, g0 = 0, g1 = 0, b0 = 0, b1 = 0;
	r0 < 16;
	r0++, r1++, g0++, g1++, b0++, b1++
) {
	r.push([r0, r1]);
	g.push([g0, g1]);
	b.push([b0, b1]);
}

const transformToHex = ([a, b]) => [a.toString(16), b.toString(16)];
const rHex = r.map(transformToHex);
const gHex = g.map(transformToHex);
const bHex = b.map(transformToHex);

const rAll = [];
const gAll = [];
const bAll = [];
for (let i = 0; i < 16; i++) {
	for (let j = 0; j < 16; j++) {
		rAll.push(`${rHex[j][0]}${rHex[i][1]}`);
		gAll.push(`${gHex[j][0]}${gHex[i][1]}`);
		bAll.push(`${bHex[j][0]}${bHex[i][1]}`);
	}
}
const allColors = [];
for (let i = 0; i < 256; i++) {
	for (let j = 0; j < 256; j++) {
		for (let k = 0; k < 256; k++) {
			let hex = `${rAll[i]}${gAll[j]}${bAll[k]}`;
			allColors.push(hex);
		}
	}
}

console.log(JSON.stringify(allColors)); // [object Array] (16777216)

