const router = require('express').Router();
const Blog = require('../models/Blog');



// Your routing code goes here
router.get("/", async (req, res) => {
    try {
        let page = req.query.page;
        let topicName = req.query.search;
        if (page <= 0) {
            return res.status(401).json({
                status: "failure",
                message: "invalid page number"
            });
        }
        const blogPosts = await Blog.find({ topic: topicName }).limit(5).skip((page - 1) * 5);

        if (blogPosts.length <= 0) {
            return res.status(404).json({
                status: "failure",
                message: "no post available with that topic or enter lesser page number"
            });
        }
        res.status(200).json({
            status: "sucess",
            result: blogPosts
        });

    } catch {
        return res.status(404).json({
            status: "failure",
            message: "not found"
        })
    }
});

router.post('/', async (req, res) => {
    const data = await Blog.create({
        topic: req.body.topic,
        description: req.body.description,
        posted_at: req.body.posted_at,
        posted_by: req.body.posted_by
    });
    res.status(200).json({
        data
    })
})

router.put("/:id", async (req, res) => {
    try {
        const update = await Blog.updateOne({ _id: req.params.id }, {
            topic: req.body.topic,
            description: req.body.description,
            posted_at: req.body.posted_at,
            posted_by: req.body.posted_by
        });
        const result = await Blog.findOne({ _id: req.params.id })
        res.status(200).json({
            status: "success",
            result
        })
    } catch {
        res.status(404).json({
            status: "failure",
            message: "no blog found with that id"
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Blog.deleteOne({ _id: req.params.id });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({
                status: "failure",
                message: "no blog found with that id"
            })
        }
        res.status(200).json({
            status: "success",
            deleted
        })
    } catch {
        res.status(404).json({
            status: "failure",
            message: "no blog found with that id"
        })
    }
})

module.exports = router;