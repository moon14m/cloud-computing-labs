// Step 1: Import the built-in Node.js modules
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

// Step 2: Locate the data file (backend/data/issues.json)
const DATA_FILE = path.join(__dirname, '..', 'data', 'issues.json');

// Step 3: Read all issues from the JSON file
async function readIssues() {
  try {
    const text = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(text);
  } catch (error) {
    // If the file doesn't exist yet, return an empty list instead of crashing
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

// Step 4: Save the entire issues array back to the file (Private helper function)
async function writeIssues(issues) {
  await fs.writeFile(DATA_FILE, JSON.stringify(issues, null, 2));
}

// Step 5: Create a new issue with client inputs and server-generated fields
async function createIssue(input) {
  const issues = await readIssues();
  
  const issue = {
    id: randomUUID(),               // Server-generated unique ID
    title: input.title.trim(),       // Trimmed client string
    description: input.description.trim(),
    priority: input.priority,
    status: 'Open',                 // Initial server-controlled status
    createdAt: new Date().toISOString() // Server-controlled timestamp
  };

  issues.push(issue);
  await writeIssues(issues);
  return issue;
}

// Step 6: Change the status of an existing issue
async function updateIssueStatus(id, status) {
  const issues = await readIssues();
  const issue = issues.find((item) => item.id === id);
  
  if (!issue) return null; // Return null if the issue ID isn't found

  issue.status = status;
  await writeIssues(issues);
  return issue;
}

// Step 7: Export the public functions for the routes layer to use
module.exports = {
  readIssues,
  createIssue,
  updateIssueStatus
};