import jsonServer from 'json-server';
import auth from 'json-server-auth';

const app = jsonServer.create();
const middlewares = jsonServer.defaults();

const router = jsonServer.router('db.json');
app.db = router.db;
app.use(middlewares);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

const rules = auth.rewriter({
  users: 600,
});

app.use(rules);
app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});