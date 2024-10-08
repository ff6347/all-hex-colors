//@ts-check
// const canvas = document.getElementById('colorCanvas');
// const ctx = canvas.getContext('2d');

// const squareSize = 10; // 1x1 pixel squares
// const canvasSize = 4096; // 4096x4096 canvas

// canvas.width = canvasSize;
// canvas.height = canvasSize;

document.addEventListener('DOMContentLoaded', () => {
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
			rAll.push(`${rHex[i][0]}${rHex[j][1]}`);
			gAll.push(`${gHex[i][0]}${gHex[j][1]}`);
			bAll.push(`${bHex[i][0]}${bHex[j][1]}`);
		}
	}
	const allColors = [];
	for (let i = 0; i < 256; i++) {
		for (let j = 0; j < 256; j++) {
			for (let k = 0; k < 256; k++) {
				let hex = `${rAll[k]}${gAll[j]}${bAll[i]}`;
				allColors.push(hex);
			}
		}
	}

	// console.log(allColors); // [object Array] (16777216)
	let currentColorIndex = 0;
	let lastUpdateTime = 0;
	let isPageVisible = true;

	function updateBackgroundColor(timestamp) {
		if (isPageVisible && timestamp - lastUpdateTime >= 100) {
			const box = document.querySelector('.box');
			const color = document.getElementById('color');
			const counter = document.getElementById('counter');

			if (box && color && counter) {
				box.style.backgroundColor = `#${allColors[currentColorIndex]}`;
				color.textContent = `#${allColors[currentColorIndex]}`;
				counter.textContent = `${currentColorIndex}/${allColors.length}`;
				currentColorIndex = (currentColorIndex + 1) % allColors.length;
				lastUpdateTime = timestamp;
			} else {
				console.error('No .box, #color, or #counter found');
			}
		}
		requestAnimationFrame(updateBackgroundColor);
	}

	// Add visibility change event listener
	document.addEventListener('visibilitychange', function () {
		isPageVisible = !document.hidden;
	});

	// Start the animation
	requestAnimationFrame(updateBackgroundColor);

	const darkModeToggle = document.getElementById('darkModeToggle');
	if (darkModeToggle) {
		console.error('No dark mode toggle found');

		const body = document.body;

		// Function to set the theme
		function setTheme(isDark) {
			if (isDark) {
				document.documentElement.style.setProperty(
					'--background-color',
					'black',
				);
				document.documentElement.style.setProperty('--text-color', 'white');
				document.documentElement.style.setProperty('--box-background', '#333');
			} else {
				document.documentElement.style.setProperty(
					'--background-color',
					'white',
				);
				document.documentElement.style.setProperty('--text-color', 'black');
				document.documentElement.style.setProperty('--box-background', 'white');
			}
		}

		// Check system preference
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			darkModeToggle.checked = true;
			setTheme(true);
		}

		// Listen for changes in system preference
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (e) => {
				darkModeToggle.checked = e.matches;
				setTheme(e.matches);
			});

		// Toggle theme when checkbox is clicked
		darkModeToggle.addEventListener('change', () => {
			setTheme(darkModeToggle.checked);
		});
	}
});
