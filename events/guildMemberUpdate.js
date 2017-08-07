exports.func = (client, oldMember, newMember) => {
	if(oldMember.nickname != newMember.nickname) {
		oldFormatted = oldMember.nickname ? `\`${oldMember.nickname}\`` : "_(none)_";
		newFormatted = newMember.nickname ? `\`${newMember.nickname}\`` : "_(none)_";

		client.logToGuild(newMember.guild, `:name_badge: ${client.formatUser(newMember.user)} nickname was changed from ${oldFormatted} to ${newFormatted}`);
	}
	if(oldMember.roles != newMember.roles) {
		oldArray = [];
		newArray = [];

		oldMember.roles.reduce((snowflake, role) => {
			if(role.id == role.guild.id) return; // filters out @everyone
			oldArray.push(role.name);
		}, []);

		newMember.roles.reduce((snowflake, role) => {
			if(role.id == role.guild.id) return;
			newArray.push(role.name);
		}, []);

		oldRoles = oldArray.join(', ') || "_(none)_";
		newRoles = newArray.join(', ') || "_(none)_";

		client.logToGuild(newMember.guild, `:lock_with_ink_pen: ${client.formatUser(newMember.user)} roles were changed:\n:b: ${oldRoles}\n:a: ${newRoles}`);
	}
};