const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const collegeData = require('./data/acpc.json');

app.get('/api/colleges', (req, res) => {
  const { year, round, category, course, institute } = req.query;

  const filtered = collegeData.filter(row => {
    return (!year || row.year === year)
      && (!round || row.round.toLowerCase() === round.toLowerCase())
      && (!category || row.category.toLowerCase().includes(category.toLowerCase()))
      && (!course || row.course.toLowerCase().includes(course.toLowerCase()))
      && (!institute || row.institute.toLowerCase().includes(institute.toLowerCase()));
  });

  res.json(filtered);
});

app.listen(port, () => {
  console.log(`ACPC backend API running at http://localhost:${port}`);
});
