exports.func = (client, oldMember, newMember) => {
	if(oldMember.nickname != newMember.nickname) {
		oldFormatted = oldMember.nickname ? `\`${oldMember.nickname}\`` : "_(none)_";
		newFormatted = newMember.nickname ? `\`${newMember.nickname}\`` : "_(none)_";

		client.logToGuild(newMember.guild, `:name_badge: ${client.formatUser(newMember.user)} nickname was changed from ${oldFormatted} to ${newFormatted}`);
	}
};