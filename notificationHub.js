const express = require("express");

const app = express();

var azure = require("azure-sb");

const cors = require("cors");

const hubName = "ennotification";

const connectionString =
  "Endpoint=sb://unique.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=uMepu8G4W/DS9L+EMvDQ669yp4wa7xAR22eOCJPRR/4=G";

const webpush = require("web-push");

let vapidkeys = {
  publicKey: 'BGQKlHQUPtpdKdeTOFqaVC2cUX9MvxJo0ZYNPFEY_TX1wKoPpIZK6BqCXEWyUd4XjYxfpnK5aL9CG25yFtJjJx8',
  privateKey: 'PEyCvBNQNUYSYXQD0Qh7NlRnUjv06iAuF4xZ6kL1TGI'
}

// console.log(vapidkeys);
// const corsOptions = {

//     origin: 'http://localhost:4200',

//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

//     credentials: false, // If you need to include credentials (e.g., cookies)

//   };

//   app.use(cors(corsOptions));

app.use(express.json());


app.post("/subscribe", async (req, res) => {
  const subscription = req.body.subscription;

  const notificationHubService = azure.createNotificationHubService(
    hubName,
    connectionString
  );

  try {
    // Send a push notification to the subscribed client

    const payload = {
      data: {
        message: "Hello from your Node.js server!",
      },
    };

    notificationHubService.send(
      null, // Send to all tags

      payload,

      (error) => {
        if (!error) {
          res.status(200).send("Notification sent successfully.");
        } else {
          console.error("Error sending push notification:", error);

          res.status(500).send("Failed to send push notifications check.");
        }
      }
    );
  } catch (error) {
    console.error("Error subscribing to push notifications:", error);

    res.status(500).send("Failed to subscribe to push notifications.");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
