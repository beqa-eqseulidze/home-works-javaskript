// ======================= home work ===========
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

// DOM-ის ელემენტები
const tbody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

const today = new Date();

//მომხმარებლის სტატუსი, ვადა და გამოწერა
function getUserStatus(user) {
    if (!user.subscription) {
        return {
            text: "No Subscription",
            class: "none",
            expires: "N/A"
        };
    }

    const exp = user.subscription.expiresAt
        ? new Date(user.subscription.expiresAt)
        : null;

    if (!exp) {
        return {
            text: "Invalid",
            class: "invalid",
            expires: "Missing"
        };
    }

    if (exp < today) {
        return {
            text: "Expired",
            class: "expired",
            expires: exp.toLocaleDateString()
        };
    }

    return {
        text: "Active",
        class: "active",
        expires: exp.toLocaleDateString()
    };
}

//table ის რენდერი
function render(data) {
    tbody.innerHTML = "";

    data.forEach(user => {
        const status = getUserStatus(user);

        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td class="${status.class}">${status.text}</td>
      <td>${status.expires}</td>
    `;

        tbody.appendChild(row);
    });
}

// ძებნა + ფილტრაცია
function filterUsers() {
    const searchValue = searchInput.value.toLowerCase();
    const filterValue = statusFilter.value;

    const filtered = users.filter(user => {
        const status = getUserStatus(user);

        const matchesSearch = user.name.toLowerCase().includes(searchValue);

        const matchesFilter =
            filterValue === "all" || status.class === filterValue;

        return matchesSearch && matchesFilter;
    });

    render(filtered);
}

// event listenerები
searchInput.addEventListener("input", filterUsers);
statusFilter.addEventListener("change", filterUsers);

//პირველი ჩატვირთვა
render(users);