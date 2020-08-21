const articleSchema = require('../models/articleModel')
const slugify = require('slugify')

const createArticle = (req, res) => {
    const articlePost = new articleSchema({
        title: req.body.title,
        article: req.body.article,
        slug: slugify(req.body.title)
    });
    articlePost.save().then(() => {
        console.log('article posted')
        res.status(200).json({ message: 'article added' })
    }).catch((err) => {
        res.status(400).json({ message: err })
    })

}

const getAllArticle = async (req, res) => {
    try {
        const getAll = await articleSchema.find()
        res.status(200).json({ results: getAll })
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

const getArticle = async (req, res) => {
    try {
        const articleDetail = await articleSchema.findOne({ slug: req.params.slug })
        res.status(200).json({ results: articleDetail })
    } catch (err) {
        res.status(404).json({ message: 'article not found' })
    }
}

const updateArticle = async (req, res) => {
    try {
        await articleSchema.updateOne({ slug: req.params.slug }, {
            title: req.body.title,
            slug: slugify(req.body.title),
            article: req.body.article,
        })
        res.status(200).json({ message: `article updated` })
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

const deleteArticle = async (req, res) => {
    const articleDelete = await articleSchema.findByIdAndDelete({ _id: req.params.id })
    if (articleDelete) {
        res.status(200).json({ message: `article deleted` })
    } else {
        res.status(400).json({ message: `article not deleted` })
    }
}

module.exports = { createArticle, getAllArticle, getArticle, updateArticle, deleteArticle }