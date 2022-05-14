const HomeController = () => {
	const all = (req, res) => {
		res.json({
			status: 200,
			data: {},
			meta: {},
		});
	};
	return { all };
};

module.exports = HomeController;
