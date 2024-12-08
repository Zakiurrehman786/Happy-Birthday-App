const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "5mb" })); // Increase limit for image data

app.post("/upload", (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).send("No image provided");
  }

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zaki.urrehman787@gmail.com",
      pass: "qbyh fkxo wmza auav",
    },
  });

  // Email setup
  const mailOptions = {
    from: "zaki.urrehman787@gmail.com",
    to: "recipient-email@gmail.com",
    subject: "Happy Birthday Photo",
    text: "A photo was captured for the Happy Birthday page.",
    attachments: [
      {
        filename: "photo.png",
        content: image.split(",")[1], // Remove "data:image/png;base64,"
        encoding: "base64",
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent:", info.response);
    res.send("Photo uploaded and email sent!");
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
