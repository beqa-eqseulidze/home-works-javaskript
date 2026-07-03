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

export type SupportedDevices = "tv"| "mobile"| "desktop"
export type Genres = "Sci-Fi"| "Drama"
export type Status =  "active" | "maintenance" | "offline"
export type ContentType = "movie" | "series" | "documentary"
export type Tier = "basic" | "premium" | "family"
export type BillingCycle = "monthly" | "yearly"

export interface IFeatures{
    supports4k: boolean,
    maxConcurrentScreens: number,
    supportedDevices: SupportedDevices[]
}
export interface IsubscriptionPlans {
    planId: string,
    tier: Tier,
    price: number,
    billingCycle:BillingCycle
}
export interface IcurrentFeaturedContent {
    title: string,
    contentType:ContentType,
    metadata: IMetadata,
    analytics:IAnalytics
}
export interface IMetadata {
    rating: string,
    genres: Genres[],
    duration:IDuration
}
export interface IDuration{
    seasons:number,
    totalEpisodes:number
}
export interface  IAnalytics {
    views:number,
    trendingScore:number
}
export interface IstreamingPlatformConfig{
   id:string,
   name:string,
   status:Status,
   launchYear:number,
   features:IFeatures, 
   subscriptionPlans:IsubscriptionPlans[],
   currentFeaturedContent:IcurrentFeaturedContent
}

