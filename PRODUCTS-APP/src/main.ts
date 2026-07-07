//  const btn=document.querySelector('button');
//  btn?.addEventListener('click',test)

//  async function test() {
//   const req = await fetch("http://localhost:3000/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // Tells the server we are sending JSON
//     },
//     body: JSON.stringify({
//       email: "olivier@mail.com",
//       password: "bestPassw0rd",
//     }),
//   });
//   const res=await req.json();
//   console.log(res)
// }

// async function registerTestUser() {
//   const req = await fetch("http://localhost:3000/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: "olivier@mail.com",
//       password: "bestPassw0rd",
//     }),
//   });
//   const res = await req.json();
//   console.log("Registration Response:", res);
// }

export type userStatus = "inactive" | "active";
export enum UserType{
  admin=1,
  user=2,
  guest=3
}

export interface IUser{
  name: string;
  age: number;  
  userType: UserType;
  isMarried?: boolean;
  status: userStatus;
  phone: string;
}

let user1: IUser;
let user2: IUser;

user1 = {
  name: "giorgi",
  age: 26,
  userType:1,
  isMarried: true,
  status: "inactive",
  phone: "123456789",
};

user2 = {
  name: "giorgi",
  age: 26,
  userType: 3,
  isMarried: true,
  status: "inactive",
  phone: "123456789",
};

if(user1.userType==UserType.admin){
//  lksdaalfkds
}
else if(user1.userType==UserType.user){
 //  lksdaalfkds
}
else if(user1.userType==UserType.guest){
   //  lksdaalfkds
}


const user :IPerson = {
  id: 101,
  username: "alex_dev",
  active: true,
  profile: {
    firstName: "Alex",
    lastName: "Smith",
    age: 28
  },  
  contact: {
    email: "alex@example.com",
    address: {
      street: "123 Code Lane",
      city: "Tech City",
      zipCode: "94016"
    }
  },
  roles: ["admin", "editor", "superAdmin"]
};

export type Roles='admin' | 'editor' | 'superAdmin'

export interface IPersonProfile{
  firstName:string,
  lastName:string,
  age:number
}

export interface IAddress{
  street:string,
  city:string,
  zipCode:string
}

export interface IContact{
  email:string,
  address:IAddress
}

export interface IPerson{
  id:number,
  username:string,
  active:boolean,
  profile:IPersonProfile,
  contact:IContact,
  roles:Roles[]
}

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