 const database = require("../model/db");

 const {nanoid} = require("nanoid");


 exports.getSingleEvent = function (request, response)  {
     const {
         id
     } = request.params;

     const event = database.get("events").find({
         id: id
     }).value();

     let result = {
         success: false
     };

     if (event) {
         result.success = true;
         result.event = event;
     }

     response.json(result);
 };

 exports.postTickets = function (request, response) {
     const {
         eventId
     } = request.body;
     const event = database.get("events").find({
         id: eventId
     }).value();

     let result = {
         success: false
     };

     if (event) {
         let ticketId = nanoid();
         if ((event.total - event.bought) > 0) {
             database.get("tickets").push({
                 id: ticketId,
                 eventId,
             }).write();
             database.get("events").find({
                 id: eventId
             }).assign({
                 bought: event.bought + 1
             }).write();
             result.success = true;
         } else {
             result.success = false;
         }
         result.id = ticketId;
     }

     response.json(result);
 };

 exports.getTickets = function (request, response)  {
     const {
         id
     } = request.params;
     const ticket = database.get("tickets").find({
         id: id
     }).value();

     let result = {
         success: false
     };

     if (ticket) {
         result.success = true;
         result.ticket = ticket;
     }

     response.json(result);
 };

 exports.getEvents = function (request, response) {
     const events = database.get("events").value();
     let result = {
         success: false
     };
     if (events) {
         result.success = true;
         result.events = events;
     }
     response.json(result);
 }

 exports.buy = function (request, response) {
     const {
         id
     } = request.body;

     let result = {
         success: false
     };

     const event = database.get("events").find({
         id: id
     }).value();
     console.log(event);
     if (event) {
         result.success = true;
         result.event = event;
     }

     response.json(result);
 }