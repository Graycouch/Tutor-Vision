const User = require("../Models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                });
            res.status(200).json("Your account has been updated!")
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can only update your account!");
    }
}
);

// Delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Your account has been deleted!")
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can only delete your account!");
    }
}
);

// Get User
router.get("/", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.query.userId });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// Get All User
router.get("/all", async (req, res) => {
    User.find({}, function (err, users) {
        if (err) {
            res.status(500).json(err);
        }
        res.json(users);
    })
}
);

module.exports = router;