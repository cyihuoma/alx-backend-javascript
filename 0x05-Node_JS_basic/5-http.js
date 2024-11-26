
const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @returns {Promise<String>} A promise that resolves to the formatted student list.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    return reject(new Error('Cannot load the database'));
  }

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      return reject(new Error('Cannot load the database'));
    }

    const reportParts = [];
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      if (line.trim()) { // Ignore empty lines
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];

        if (!studentGroups[field]) {
          studentGroups[field] = [];
        }
        const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }
    }

    const totalStudents = Object.values(studentGroups).reduce((total, group) => total + group.length, 0);
    reportParts.push(`Number of students: ${totalStudents}`);
    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(`Number of students in ${field}: ${group.length}. List: ${group.map(student => student.firstname).join(', ')}`);
    }
    resolve(reportParts.join('\n'));
  });
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';
      res.setHeader('Content-Type', 'text/plain');
      res.write(responseText);
      res.end(); // End the response
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.write(responseText);
          res.end(); // End the response
        })
        .catch((err) => {
          responseParts.push(err.message);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.statusCode = 500; // Set server error status code
          res.write(responseText);
          res.end(); // End the response
        });
    },
  },
];

app.on('request', (req, res) => {
  const routeHandler = SERVER_ROUTE_HANDLERS.find(handler => handler.route === req.url);
  if (routeHandler) {
    routeHandler.handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found'); // Handle undefined routes
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

// Export the app
module.exports = app;
