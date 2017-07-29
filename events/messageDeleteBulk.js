exports.func = (client, messages) => {
	messages.reduce((snowflake, message) => {
		require("./messageDelete").func(client, message);
	}, []);
};