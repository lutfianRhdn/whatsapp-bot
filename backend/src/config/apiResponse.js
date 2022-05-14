const apiResponse = async (response, request, functions) => {
	try {
		const { res, meta } = await functions();
		response.json({
			status: 200,
			data: res,
			metadata: meta,
		});
	} catch (error) {
		response.json({
			status: error.status,
			message: error.message,
			metadata: {},
		});
	}
};
module.exports = apiResponse;
