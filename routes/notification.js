const router = require("express").Router();

const Notification = require("../models/falcutyNotification");
const auth = require("../middlewares/checkLogin");

router.get("/", auth, async (req, res) => {
    try{
        const page = req.query.page;
        const notifications = await Notification.find().sort({createdAt: -1});
        if(page > 0){
            const result = await notifications.slice(0, page);
            console.log(result);
            res.status(200).json({code: 1, notifications: result});
        }
        res.status(200).json({code: 1, notifications});
    } catch(err){
        res.status(200).json({code: 0});
    }
    
})

router.get("/:slug", auth, async (req, res) => {
    const notification = await Notification.findOne({slug: req.params.slug});
    if(!notification) res.status(200).json({code: 404});
    res.status(200).json({code: 1, notification});
})

router.get("/falcuty/:id", auth, async(req, res) => {
    try{
        const notifications = await Notification.find({userId: req.params.id});
        if(!notifications){
            res.status(200).json({code: 404});
        }
        res.status(200).json({code: 1, notifications});
    } catch(error){
        res.status(200).json({code: 404});
    }
    
})

module.exports = router;