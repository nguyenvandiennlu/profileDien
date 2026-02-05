import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Client, GatewayIntentBits } from "discord.js";
import { initTracker, getActivities } from "./bot/tracker.js";

dotenv.config();

console.log("Current working directory:", process.cwd());
console.log(
  "Token loaded:",
  process.env.DISCORD_TOKEN
    ? "YES (Starts with " + process.env.DISCORD_TOKEN.substring(0, 5) + "...)"
    : "NO",
);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Discord Bot Setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Discord Bot Logged in as ${client.user.tag}`);
  initTracker(client);
});

client.on("error", (error) => {
  console.error("❌ Discord Client Error:", error);
});

client.on("warn", (warning) => {
  console.warn("⚠️ Discord Client Warning:", warning);
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Profile-7Flat Backend" });
});

app.get("/api/activities", async (req, res) => {
  try {
    const TARGET_ID = process.env.TARGET_USER_ID || process.env.USER_ID_TARGET;

    if (!TARGET_ID) {
      return res.json([]);
    }

    if (!client.isReady()) {
      return res.json([]);
    }

    // Get guild member to access presence
    const guilds = client.guilds.cache;
    let activities = [];

    // Try to find the user in any guild to get their presence
    for (const guild of guilds.values()) {
      try {
        const member = await guild.members.fetch(TARGET_ID);
        const presence = guild.presences.cache.get(TARGET_ID);

        if (presence?.activities) {
          activities = presence.activities.map((activity, index) => ({
            id: `${activity.name}-${activity.type}-${Date.now()}-${index}`,
            type: getActivityType(activity.type),
            description: formatActivityDescription(activity),
            timestamp: activity.timestamps?.start || new Date().toISOString(),
          }));
          break;
        }
      } catch (err) {
        continue;
      }
    }

    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.json([]);
  }
});

// Helper function to get activity type
function getActivityType(discordType) {
  switch (discordType) {
    case 0:
      return "PLAYING"; // Game
    case 1:
      return "STREAMING";
    case 2:
      return "LISTENING"; // Spotify
    case 3:
      return "WATCHING";
    case 4:
      return "CUSTOM"; // Custom status
    case 5:
      return "COMPETING";
    default:
      return "STATUS";
  }
}

// Helper function to format activity description
function formatActivityDescription(activity) {
  if (activity.type === 0) {
    // Game/VS Code
    let desc = `Playing ${activity.name}`;
    if (activity.details) desc += ` - ${activity.details}`;
    if (activity.state) desc += ` (${activity.state})`;
    return desc;
  } else if (activity.type === 2) {
    // Spotify
    return `Listening to ${activity.details || activity.name}${activity.state ? ` by ${activity.state}` : ""}`;
  } else if (activity.type === 4) {
    // Custom status
    return activity.state || activity.name || "Custom Status";
  }
  return activity.name;
}

// Get Discord user info (avatar, username, etc.)
app.get("/api/user-info", async (req, res) => {
  try {
    const TARGET_ID = process.env.TARGET_USER_ID || process.env.USER_ID_TARGET;

    if (!TARGET_ID) {
      return res.status(400).json({ error: "No target user ID configured" });
    }

    if (!client.isReady()) {
      return res.status(503).json({ error: "Discord bot not ready" });
    }

    const user = await client.users.fetch(TARGET_ID);

    // Get guild member to access presence
    const guilds = client.guilds.cache;
    let presence = null;

    // Try to find the user in any guild to get their presence
    for (const guild of guilds.values()) {
      try {
        const member = await guild.members.fetch(TARGET_ID);
        if (member && member.presence) {
          presence = member.presence;
          break;
        }
      } catch (err) {
        // User might not be in this guild, continue
        continue;
      }
    }

    const userInfo = {
      id: user.id,
      username: user.username,
      displayName: user.displayName || user.username,
      avatar: user.displayAvatarURL({ dynamic: true, size: 256 }),
      tag: user.tag,
      createdAt: user.createdAt,
      status: presence?.status || "offline",
      activities:
        presence?.activities?.map((activity, index) => ({
          id: `${activity.name}-${activity.type}-${Date.now()}-${index}`,
          name: activity.name,
          type: activity.type,
          details: activity.details,
          state: activity.state,
          timestamps: activity.timestamps,
          assets: activity.assets
            ? {
                largeImage: activity.assets.largeImageURL
                  ? activity.assets.largeImageURL()
                  : null,
                smallImage: activity.assets.smallImageURL
                  ? activity.assets.smallImageURL()
                  : null,
                largeText: activity.assets.largeText,
                smallText: activity.assets.smallText,
              }
            : null,
        })) || [],
    };

    res.json(userInfo);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Login Bot if token is present
  if (process.env.DISCORD_TOKEN) {
    console.log("🔄 Attempting to login Discord bot...");
    client
      .login(process.env.DISCORD_TOKEN)
      .then(() => console.log("✅ Discord login successful!"))
      .catch((err) => {
        console.error("❌ Discord Login Failed:", err);
        console.error("Error details:", err.message);
      });
  } else {
    console.warn("⚠️ No DISCORD_TOKEN found in .env");
  }
});
