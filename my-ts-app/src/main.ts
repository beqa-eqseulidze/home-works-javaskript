import type { IPlatform } from './interface'

const streamingPlatformConfig: IPlatform = {
  id: "platform-prod-01",
  name: "StreamVerse",
  status: "active", // options: active, maintenance, offline
  launchYear: 2024,
  features: {
    supports4K: true,
    maxConcurrentScreens: 4,
    supportedDevices: ["tv", "mobile", "desktop"],
  },
  subscriptionPlans: [
    {
      planId: "sub-basic",
      tier: "basic", // options: basic, premium, family
      price: 9.99,
      billingCycle: "monthly",
    },
    {
      planId: "sub-premium",
      tier: "premium",
      price: 99.99,
      billingCycle: "yearly",
    }
  ],
  currentFeaturedContent: {
    title: "Echoes of Time",
    contentType: "series", // options: movie, series, documentary
    metadata: {
      rating: "PG-13",
      genres: ["Sci-Fi", "Drama"],
      duration: {
        seasons: 3,
        totalEpisodes: 24
      }
    },
    analytics: {
      views: 1540230,
      trendingScore: 94.5
    }
  }
};