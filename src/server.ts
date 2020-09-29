import express from 'express';

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  res.json({OK: 'true'});
})

app.listen(3001, () => {
  console.log('Server started on port 3001');
})