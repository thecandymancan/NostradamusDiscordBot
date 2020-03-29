const Logger = require('@elian-wonhalf/pretty-logger');
const Config = require('../../config.json');
const Guild = require('../guild');
const CommandCategory = require('../command-category');

/**
 * @param {Message} message
 */
module.exports = {
    aliases: [''],
    category: CommandCategory.ADMINISTRATION,
    process: async (message, args) => {
        const member = await Guild.getMemberFromMessage(message);

        if (Guild.isMemberMod(member)) {
            const panicOverWords = ['off', 'over'];
            const enabled = args.length < 1 || panicOverWords.indexOf(args[0]) < 0;
            const officialMemberRole = Guild.discordGuild.roles.cache.get(Config.roles.officialMember);

            Logger.warning((enabled ? 'Entering' : 'Leaving') + ' server panic mode');
            let permissions = officialMemberRole.permissions;

            if (enabled) {
                permissions = permissions.remove('SEND_MESSAGES');
            } else {
                permissions = permissions.add('SEND_MESSAGES');
            }

            officialMemberRole.setPermissions(permissions);
            Logger.warning((enabled ? 'Entered' : 'Left') + ' server panic mode');
        }
    }
};
