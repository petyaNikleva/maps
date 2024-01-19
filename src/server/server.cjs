/*eslint no-undef: "error"*/
/*eslint-env node*/

const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 4000;

app.use(cors());

const dataFilePath = path.join(__dirname, 'data.json');

let jsonData;

async function readDataFile() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    jsonData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    process.exit(1);
  }
}

app.use(async (req, res, next) => {
  if (!jsonData) {
    await readDataFile();
  }
  next();
});

// Endpoint to get all data
app.get('/api/data', (req, res) => {
  res.json(jsonData);
});

// Endpoint to get data by line
app.get('/api/data/:line', (req, res) => {
  const line = req.params.line;
  const lineData = jsonData.find(item => item.line === line);

  if (lineData) {
    res.json(lineData);
  } else {
    res.status(404).json({ message: 'Line not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});