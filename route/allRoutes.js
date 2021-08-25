const path = require("path");
 const staff = require("../middleware/auth");

const {Router} = require('express');
const router = new Router();
const eventController = require("../controller/eventController");
const authController = require("../controller/authController");

// HTML FILES
router.get("/buy/:id", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend/buy.html"));
});

router.get("/tickets/:id", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend/tickets.html"));
});

router.get("/staff/login", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend/staff.html"));
});

router.get("/staff/verify", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend/verify.html"));
});


// EVENTS

router.get("/api/events", eventController.getEvents);

router.post("/api/buy", eventController.buy);

router.get("/api/events/:id",eventController.getSingleEvent);

router.post("/api/tickets", eventController.postTickets);

router.get("/api/tickets/:id", eventController.getTickets);

// STAFF
router.get('/api/staff/loggedin', staff, authController.loggedIn)

router.post("/api/staff/login", authController.login);

router.post("/api/staff/verify", staff, authController.verify);


module.exports = router