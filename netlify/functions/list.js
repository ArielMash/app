const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../data/submissions.json');

exports.handler = async () => {
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
};
