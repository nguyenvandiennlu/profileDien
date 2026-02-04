const activities = [];
const MAX_LOGS = 50;

/**
 * Add an activity log
 * @param {string} type - 'MESSAGE' | 'VOICE' | 'STATUS'
 * @param {string} description - Readable description
 */
const addLog = (type, description) => {
    const log = {
        id: Date.now().toString(),
        type,
        description,
        timestamp: new Date().toISOString()
    };

    activities.unshift(log); // Add to top
    if (activities.length > MAX_LOGS) activities.pop(); // Keep size limited
};

/**
 * Initialize tracker listeners
 * @param {import('discord.js').Client} client 
 */
export const initTracker = (client) => {
    const TARGET_ID = process.env.TARGET_USER_ID || process.env.USER_ID_TARGET;

    if (!TARGET_ID) {
        console.warn("⚠️ No TARGET_USER_ID or USER_ID_TARGET defined in .env. Tracking disabled.");
        return;
    }

    console.log(`👀 Tracking activities for User ID: ${TARGET_ID}`);

    // Track Messages
    client.on('messageCreate', (message) => {
        console.log(`Debug: Message from ${message.author.id} (${message.author.tag})`);
        if (message.author.id === TARGET_ID) {
            console.log("✅ Custom Log: Target user sent a message");
            addLog('MESSAGE', `Sent a message in #${message.channel.name}: "${message.content.substring(0, 30)}${message.content.length > 30 ? '...' : ''}"`);
        }
    });

    // Track Voice State
    client.on('voiceStateUpdate', (oldState, newState) => {
        const member = newState.member;
        if (member) {
            console.log(`Debug: Voice update for ${member.id} (${member.user.tag})`);
            if (member.id === TARGET_ID) {
                console.log("✅ Custom Log: Target user voice update");
                if (!oldState.channelId && newState.channelId) {
                    addLog('VOICE', `Joined voice channel: ${newState.channel.name}`);
                } else if (oldState.channelId && !newState.channelId) {
                    addLog('VOICE', `Left voice channel: ${oldState.channel.name}`);
                } else if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
                    addLog('VOICE', `Moved to voice channel: ${newState.channel.name}`);
                }
            }
        }
    });

    // Track Presence (Status/Game)
    client.on('presenceUpdate', (oldPresence, newPresence) => {
        console.log(`Debug: Presence update for ${newPresence.userId}`);
        if (newPresence.userId === TARGET_ID) {
            console.log("✅ Custom Log: Target user presence update");
            // Status change
            if (oldPresence?.status !== newPresence.status) {
                addLog('STATUS', `Changed status to: ${newPresence.status}`);
            }

            // Activity change (Game/Spotify)
            const newActivity = newPresence.activities[0];
            const oldActivity = oldPresence?.activities[0];

            if (newActivity && newActivity.name !== oldActivity?.name) {
                addLog('STATUS', `Started doing: ${newActivity.name} ${newActivity.details ? `(${newActivity.details})` : ''}`);
            }
        }
    });
};

export const getActivities = () => activities;
