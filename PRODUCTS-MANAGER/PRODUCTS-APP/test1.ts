
// დავალება 1-ის პასუხი
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

// დავალება 2-ის პასუხი
export type St = "active" | "maintenance" | "offline"
export type SuppprtedCurrencies = "USD" | "EUR" |"GEL"
export type TTier = "basic" | "premium" | "enterprise"
export type BillingCycle1 = "monthly" | "yearly"
export type ContentType1 = "product" | "collection"
| "promotion"
export type Genres1 = "Electronics" | "Tech"


export interface IeComercePlatformConfig {
    id: string,
    name: string,
    status: St,
    launchYear: number,
    features: IFeatures,
    subscriptionPlans: IsubscriptionPlans[],
    currentFeaturedContent: IcurrentFeaturedContent
}
export interface IFeatures{
    supportsCrypto: true,
    maxInternationalZones: number,
    supportedCurrencies: SuppprtedCurrencies[]

}
export interface IsubscriptionPlans {
    planId: string,
    ttier: TTier[],
    price: number,
    billingCycle: BillingCycle1,
}
export interface IcurrentFeaturedContent {
    title: string,
    contentType1: ContentType1,
    metadata: IMetadata,
    duration: Iduration,
    analytics: Ianalytics
}
export interface IMetadata {
    rating: string,
    genres1: Genres1[]
}
export interface Iduration {
    seasons: number,
    totalEpisodes: number
}
export interface Ianalytics {
    views: number,
    trendingScore: number
}






// დავალება 3-ის პასუხი
export type Stt = "active" | " maintenance" | "offline"
export type SupportedDevices1 = "tv"| "mobile"| "desktop"
export type PlanId = "cloud-free" | "cloud-premium"
export type Tier2 = "basic" | "premium"
export type BillingCycle2= "monthly" | "yearly"
export type Genres2 = "Security" | "Hardware"


export interface ISmartHomeHubConfig{
    id: string,
    name: string,
    status: Stt,
    launchYear: number,
    features: IFeatures,
    subscriptionPlans: ISubscriptionPlans[],
    currentFeaturedContent:ICurrentFeaturedContent,
    analytics: IAnalytics
}

export interface IFeatures{
    support4k: boolean,
    maxConcurrentScreens: number,
    supportedDevices1: SupportedDevices1[]
}
export interface ISubscriptionPlans {
    planId: PlanId,
    tier2: Tier2,
    price:number,
    billingCycle2:BillingCycle2
}
export interface ICurrentFeaturedContent{
    title: string,
    contentType: string,
    metadata: IMetadata

}
export interface IMetadata {
    rating: string,
    genres2: Genres2[],
    duration: IDuration
}
export interface IDuration{
    seasons: number,
    totalEpisodes: number
}
export interface IAnalytics {
    views: number,
    trendingScore: number
}
// დავალება 4-ის პასუხი
export type Features = ""
export interface ILearningPlatformConfig{
    id: string,
    name: string,
    status: Stt,
    launchYear: number,
    features: IFeatures,
    subscriptionPlans: ISubscriptionPlans[],
    currentFeaturedContent: ICurrentFeaturedContent,
    analytics: IAnalytics
}
export interface IFeatures{
    supports4k: boolean,
    maxConcurrentScreens: number,
    supportedDevices: SupportedDevices[]
}
export interface ISubscriptionPlans {
    planId1: string,
    tier: TR,
    price: number,
    billingCycle: string
}