import jsonServer from 'json-server';
import auth from 'json-server-auth';

const app = jsonServer.create();
const middlewares = jsonServer.defaults();

// 1. ხელით დავამატოთ CORS-ის ჰედერები, რომ ბრაუზერმა ფრონტენდი არ დაბლოკოს
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // ნებას რთავს ნებისმიერ ფრონტენდს
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  // OPTIONS მოთხოვნებზე (რომელსაც ბრაუზერი ავტომატურად აგზავნის შესამოწმებლად) ეგრევე ვუპასუხოთ OK
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const router = jsonServer.router('db.json');
app.db = router.db;

// 2. ჯერ გაეშვას თავსებადი მედლვეარები
app.use(middlewares);

// 3. ავტორიზაციის წესები
const rules = auth.rewriter({
  users: 600, 
});
app.use(rules);
app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log('JSON Server Auth is running on port 3000');
});