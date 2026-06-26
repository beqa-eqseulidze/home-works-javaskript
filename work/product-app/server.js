import jsonServer from 'json-server';
import auth from 'json-server-auth';

const app = jsonServer.create();
const middlewares = jsonServer.defaults();

const router = jsonServer.router('db.json');
app.db = router.db;
app.use(middlewares);
const rules = auth.rewriter({
    users: 600
});
app.use(rules);
app.use(auth);
app.use(router);

app.listen(3000, () => {
    console.log('JSON Server Auth is running on port 3000');
});