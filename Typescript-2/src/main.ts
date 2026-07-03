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
    },
  ],
  currentFeaturedContent: {
    title: "Echoes of Time",
    contentType: "series", // options: movie, series, documentary
    metadata: {
      rating: "PG-13",
      genres: ["Sci-Fi", "Drama"],
      duration: {
        seasons: 3,
        totalEpisodes: 24,
      },
    },
    analytics: {
      views: 1540230,
      trendingScore: 94.5,
    },
  },
};

//================================================================================================
//===================================================================

export interface IAnalytics {
  views: number;
  trendingScore: number;
}

export interface IDuration {
  seasons: number;
  totalEpisodes: number;
}

export type Genrestype = "Sci-Fi" | "Drama";

export interface IMetadata {
  rating: string;
  genres: Genrestype[];
  duration: IDuration;
}

export type TypeOfContent = "series" | "documentari";

export interface IFeaturedContent {
  title: string;
  contentType: TypeOfContent;
  metadata: IMetadata;
  analytics: IAnalytics;
}


export type billingType = "yearly" | "monthly";
export type tierType = "basic" | "premium";
export type planIdType = "sub-basic" | "sub-premium";

export interface ISubscription {
  planId: planIdType[];
  tier: tierType[];
  price: number;
  billingCycle: billingType[];
}



export type supportDeviceType = "tv" | "mobile" | "desktop";

export interface IFeatures {
  supports4K: boolean;
  maxConcurrentScreens: number;
  supportedDevices: supportDeviceType[];
}


export type statusType = "active" | "offline";

export interface IPerson {
  id: string;
  name: string;
  status: statusType[];
  launchYear: number;
  features: IFeatures;
  subscriptionPlans: ISubscription;
  currentFeaturedContent: IFeaturedContent;
}
