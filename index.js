const express = require("express");
const app = express();

const OneSignal = require("onesignal-node");
const client = new OneSignal.Client(
  "8c0b6607-8093-4fd0-9167-3583c7180740",
  "NjcyYTBhMWEtMzZkOS00MWIxLThjMjUtY2QwNTliNTA5MjI2"
);

app.get("/", (req, res) => {
  res.send("TwoSignal!");
});

app.post("/createNotifications", async (req, res) => {
  const notification = {
    contents: {
      en: "Two Signal",
    },
    included_segments: ["All"],
    content_available: true,
    small_icon: "ic_notification_icon",
    data: {
      PushTitle: "Teste 5",
    },
  };
  try {
    const response = await client.createNotification(notification);
    console.log(response.body.id);
  } catch (e) {
    if (e instanceof OneSignal.HTTPError) {
      console.log(e.statusCode);
      console.log(e.body);
    }
  }
});

app.get("/viewDevices", async (req, res) => {
  const response = await client.viewDevices({ limit: 200, offset: 0 });
  console.log(response.body);
});

app.get("/viewNotifications", async (req, res) => {
  const response = await client.viewNotifications({
    limit: 1,
    offset: 0,
  });
  console.log(response.body);
});

app.post("/addDevice", async (req, res) => {
  const response = await client.addDevice({
    device_type: "1",
    identifier: "teste",
  });
  console.log(response.body);
});

app.put("/editDevice", async (req, res) => {
  const response = await client.editDevice(
    "d0fe9bdb-db1a-4efe-b481-4bead798471d",
    { identifier: "Teste2" }
  );
  console.log(response.body);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
