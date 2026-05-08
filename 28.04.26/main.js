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

const tableBody = document.getElementById("tableBody");

function getStatus(subscription) {
    if (!subscription) {
        return { label: "No Subscription", class: "no-sub" };
    }

    if (!subscription.expiresAt) {
        return { label: "Unknown", class: "unknown" };
    }

    const now = new Date();
    const expireDate = new Date(subscription.expiresAt);

    if (expireDate < now) {
        return { label: "Expired", class: "expired" };
    }

    return { label: "Active", class: "active" };
}

function formatDate(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
}

function renderTable() {
    tableBody.innerHTML = "";

    users.forEach(user => {
        const status = getStatus(user.subscription);

        const row = `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td class="status ${status.class}">${status.label}</td>
        <td>${formatDate(user.subscription?.expiresAt)}</td>
      </tr>
    `;

        tableBody.innerHTML += row;
    });
}

renderTable();