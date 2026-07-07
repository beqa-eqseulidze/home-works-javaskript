// დავალება 1

const streamingPlatformConfig = {
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

// დავალება 2
const eCommercePlatformConfig = {
  id: "shop-prod-01",
  name: "GlobalCart",
  status: "maintenance", // options: active, maintenance, offline
  launchYear: 2022,
  features: {
    supportsCrypto: true,
    maxInternationalZones: 5,
    supportedCurrencies: ["USD", "EUR", "GEL"],
  },
  subscriptionPlans: [
    {
      planId: "merchant-basic",
      ttier: "basic", // options: basic, premium, enterprise
      price: 29.99,
      billingCycle: "monthly",
    },
    {
      planId: "merchant-enterprise",
      tier: "enterprise",
      price: 299.99,
      billingCycle: "yearly",
    }
  ],
  currentFeaturedContent: {
    title: "Wireless Ergonomic Mouse",
    contentType: "product", // options: product, collection, promotion
    metadata: {
      rating: "PG-13", // აქ უბრალოდ სტრუქტურის იდენტურობისთვის (მაგ: SKU ან კატეგორია)
      genres1: ["Electronics", "Tech"], // იგივე როლი აქვს რაც ჟანრებს
      duration: {
        seasons: 1, // ვთქვათ, საგარანტიო წლები
        totalEpisodes: 12 // ხელმისაწვდომი ფერები/ვარიაციები
      }
    },
    analytics: {
      views: 89400,
      trendingScore: 88.2
    }
  }
};

// დავალება 3
const smartHomeHubConfig = {
  id: "hub-prod-88",
  name: "HomePulse AI",
  status: "active", // options: active, maintenance, offline
  launchYear: 2025,
  features: {
    supports4K: false, // მაგალითად, კამერის ნაკადისთვის
    maxConcurrentScreens: 8, // მაქსიმალური მიერთებული მოწყობილობები
    supportedDevices1: ["hub", "mobile", "tablet"],
  },
  subscriptionPlans: [
    {
      planId: "cloud-free",
      tier: "basic", // options: basic, premium, family
      price: 0.00,
      billingCycle2: "monthly",
    },
    {
      planId: "cloud-premium",
      tier: "premium",
      price: 49.99,
      billingCycle: "yearly",
    }
  ],
  currentFeaturedContent: {
    title: "Living Room Motion Sensor",
    contentType: "movie", // სტრუქტურის თავსებადობისთვის (მაგ: მოწყობილობის ტიპი)
    metadata: {
      rating: "G",
      genres: ["Security", "Hardware"],
      duration: {
        seasons: 2, // ვერსია
        totalEpisodes: 1 // აქტიური სენსორების რაოდენობა შიგნით
      }
    },
    analytics: {
      views: 12500,
      trendingScore: 91.0
    }
  }
};

// დავალება 4
const learningPlatformConfig = {
  id: "edu-prod-10",
  name: "EduSphere",
  status: "active", // options: active, maintenance, offline
  launchYear: 2023,
  features: {
    supports4K: true, // ვიდეო ლექციების ხარისხი
    maxConcurrentScreens: 2, // ერთ იუზერზე ეკრანების რაოდენობა
    supportedDevices: ["desktop", "mobile", "tablet"],
  },
  subscriptionPlans: [
    {
      planId: "edu-monthly",
      tier: "basic", // options: basic, premium, family
      price: 19.99,
      billingCycle: "monthly",
    },
    {
      planId: "edu-yearly",
      tier: "premium",
      price: 149.99,
      billingCycle: "yearly",
    }
  ],
  currentFeaturedContent: {
    title: "Mastering TypeScript & Architecture",
    contentType: "series", // options: movie, series, documentary (აქ კურსის ტიპი)
    metadata: {
      rating: "PG",
      genres: ["Programming", "Software Architecture"],
      duration: {
        seasons: 5, // მოდულების რაოდენობა
        totalEpisodes: 45 // სულ ლექციები
      }
    },
    analytics: {
      views: 340200,
      trendingScore: 98.7
    }
  }
};