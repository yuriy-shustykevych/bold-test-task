import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let currentValue = 3.7; // Initial hardcoded value
let votes = []; // To store votes

app.post('/api/rating', (req, res) => {
  const { value, voteId } = req.body;

  // Check for invalid conditions
  if (value < 4 || voteId !== null) {
    return res.status(418).json({
      code: 418,
      voteId: null,
      value: null,
    });
  }

  const newVoteId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  votes.push(value);
  currentValue = votes.reduce((acc, cur) => acc + cur, 0) / votes.length;

  res.json({
    code: 200,
    voteId: newVoteId,
    value: currentValue,
  });
});

app.get('/api/rating', (req, res) => {
  res.json({
    value: currentValue,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
