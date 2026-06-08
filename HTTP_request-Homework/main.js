
// როცა გვერდი იტვირთება ამოწმებს დამახსოვრებულ მონაცემებს
window.onload = () => {
    const lastType = localStorage.getItem('lastType'); // ვამოწმებთ თუ რამე იყო შენახული;
    if (lastType) fetchData(lastType); //თუ იყო შენახული ვტვირთავთ;
};


async function fetchData(type) {
    localStorage.setItem('lastType', type); //რეფრეშისას იმახსოვრებს ეკრანს;

    const res = await fetch(`https://fakestoreapi.com/${type}`);
    const data = await res.json(); 
    
    const container = document.getElementById('content'); 
    container.innerHTML = ''; 

    // გადაუვლის და დახატავს
    data.forEach(item => {
        let card = document.createElement('div');
        card.className = 'card'; 


        if (type === 'products') {
            card.innerHTML = `
               <img src="${item.image}"> 
               <h3>${item.title}</h3> 
               <p><strong>Price:</strong> $${item.price}</p> `;
        } 

        else if (type === 'users') {
            card.innerHTML = `
               <h3>${item.name.firstname} ${item.name.lastname}</h3> 
               <p><strong>User:</strong> ${item.username}</p>
               <p><strong>Email:</strong> ${item.email}</p> 
               <p><strong>Phone:</strong> ${item.phone}</p> 
               <p><strong>Address:</strong> ${item.address.street}, ${item.address.city}</p> `;
        }

        else if (type === 'carts') {
            const productsList = item.products.map(p => 
                `<li><strong>ID:</strong> ${p.productId},<strong>Quantity:</strong> ${p.quantity}</li>` 
            ).join(''); 

            card.innerHTML = `
               <h3>ID: ${item.id}</h3>
               <p><strong>User ID:</strong> ${item.userId}</p> 
               <p><strong>Date:</strong> ${new Date(item.date).toLocaleDateString()}</p>
               <ul>${productsList}</ul> `;
        }

            container.appendChild(card); 
       });
}