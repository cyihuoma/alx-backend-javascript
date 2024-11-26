
process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (chunk) => {
  // Trim the input to remove any extra newlines
  const name = chunk.toString().trim();
  process.stdout.write(`Your name is: ${name}\n`);
  
  // Close the input stream after getting the name
  process.stdin.end();
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
