const users = [
  {
    id: 1,
    name: "Elena",
    subscription: {
      status: "active",
      expiresAt: "2026-06-15T10:00:00Z"
    }
  },
  {
    id: 2,
    name: "Marcus",
    subscription: null,
  },
  {
    id: 3,
    name: "Suki",
    subscription: {
      status: "expired",
      expiresAt: "2024-01-10T14:30:00Z"
    }
  },
  {
    id: 4,
    name: "Oliver",
    subscription: {
      status: "active"
    }
  }
];



const tbody = document.querySelector("#usersTable tbody");
const today = new Date();


users.forEach(user => {

  let currentStatus = "";
  let className = "";



  // საერთოდ არ აქვს subscription
  if (!user.subscription){
    currentStatus = "no subscription";
    className = "no-subscription";

  //გამოწერილია მაგრამ ვადა გასულია
  } else if (!user.subscription.expiresAt) {
    currentStatus = "no data";
    className = "no-data";

  }
  
  else{
    const expiryDate = new Date(user.subscription.expiresAt);
    //ვადებისს შემოწმმება//
    if (expiryDate < today) {
      currentStatus = "expired";
      className = "expired";
    } else {
      currentStatus = "active";
      className = "active";
    }
  }

  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${user.id}</td>
  <td>${user.name}</td>
  <td>${user.subscription ? user.subscription.status : "n/a"}</td>
  <td>${user.subscription ? user.subscription.expiresAt : "n/a"}</td>
  <td class="${className}">${currentStatus}</td>
`;

  tbody.appendChild(row);
});