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


 //თუ subscription საერთოდ არ აქვს
  if (!user.subscription){
    currentStatus = "no subscription";
    className = "no-subscription";

    //აქვს subscription, მაგრამ ვადა არ აქვს
  } else if (!user.subscription.expiresAt) {
    currentStatus = "expired";
    className = "expired-1";
  }
  else{
    const expiryDate = new Date(user.subscription.expiresAt);
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