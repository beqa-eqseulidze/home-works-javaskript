export type status = "active" | "maintenance" | "offline"

export interface IFeatures {
    supports4K: boolean,
    maxConcurrentScreens: number,
    supportedDevices: devices[]
}

export type devices = "tv" | "mobile" | "desktop";

export interface ISubscription {
    planId: plans,
    tier: tiers;
    price: number;
    billingCycle: billings;
}

export type plans = "sub-basic" | "sub-premium";

export type tiers = "basic" | "premium" | "family";

export type billings = "monthly" | "yearly"

export interface IFeaturedContent {
    title: string,
    contentType: contents,
    metadata: IMeta
    analytics: IAnalytics
}

export type contents = "movie" | "series" | "documentary"

export interface IMeta {
    rating: string,
    genres: genres[],
    duration: IDuration
}

export type genres = "Sci-Fi" | "Drama";

export interface IDuration {
    seasons: number,
    totalEpisodes: number
}

export interface IAnalytics {
    views: number,
    trendingScore: number
}

export interface IPlatform {
    id: string,
    name: string,
    status: status,
    launchYear: number,
    features: IFeatures,
    subscriptionPlans: ISubscription[],
    currentFeaturedContent: IFeaturedContent,
}