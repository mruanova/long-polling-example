const express = require('express');
const app = express();
const port = 3000;

// Simulated data source
let messages = [];
let clients = [];

// Function to simulate adding new messages every 10 seconds
setInterval(() => {
    const newMessage = `Message at ${new Date().toLocaleTimeString()}`;
    messages.push(newMessage);
    console.log('New message:', newMessage);

    // Send new message to all clients waiting for updates
    clients.forEach(res => res.json({ message: newMessage }));
    clients = []; // Clear the clients list after sending the update
}, 10000);

// Endpoint for long polling
app.get('/poll', (req, res) => {
    if (messages.length > 0) {
        res.json({ message: messages.shift() }); // Send the next message if available
    } else {
        clients.push(res); // Add the response object to clients list if no new message
    }
});

app.listen(port, () => {
    console.log(`Long polling server running on http://localhost:${port}`);
});

// static content 
var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
});