const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../data/submissions.json');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const existing = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];
  existing.push({
    name: body.name,
    phone: body.phone,
    email: body.email,
    time: new Date().toISOString()
  });
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
