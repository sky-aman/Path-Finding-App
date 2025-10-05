const manhattanDistance = (to, from) => {
	const [x1, y1] = to;
	const [x2, y2] = from;
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

export default manhattanDistance;
