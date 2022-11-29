const router = require("express").Router();
const BookedSession = require("../Models/BookedSession");

// new conv
router.post("/", async (req, res) => {
  const newBookedSession = new BookedSession({
    members: [req.body.senderId, req.body.receiverId],
    time: req.body.time,
    date: req.body.date
  });

  try {
    const savedBookedSession = await newBookedSession.save();
    res.status(200).json(savedBookedSession);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv of a user
router.get("/:userId", async (req, res) => {
  try {
    const bookedSession = await BookedSession.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(bookedSession);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const bookedSession = await BookedSession.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(bookedSession)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;