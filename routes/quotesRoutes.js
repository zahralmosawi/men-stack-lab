//Router Setup 
const Quote = require('../models/Quotes')
const router = require('express').Router()

//EXPORT 
module.exports = router


router.get('/writeQuote', (req,res) => {
    res.render('writeQuote.ejs')
}) //now the user can see the page with forms

router.post('/writeQuote', async (req,res) => {
    try{
        await Quote.create(req.body) //save it in MongoDB
        res.redirect('/quotes')
    }catch(error){
        console.log('ERROR', error)
    }
}) //save the data in db and redirect the user to the main page

//READ 
router.get('/', async (req,res)=>{
    try{
        const allQuotes = await Quote.find()
        res.render('all-quotes.ejs', {allQuotes})
    }catch(error){
        console.log("can't find any data", error)
    }
})//find all quotes in the database

router.get('/:quoteId', async (req,res)=>{
    try{
        const foundQuote = await Quote.findById(req.params.quoteId)
        res.render('quote-details.ejs', {foundQuote})
    }catch(error){
        console.log("can't find any data with this id", error)
    }
})//find a specific quote in db, render the user to page with that one quote's info

//DELETE
router.delete('/:id', async (req,res)=>{
    try{
        await Quote.findByIdAndDelete(req.params.id)
        res.redirect('/quotes')
    }catch(error){
        console.log(error)
    }
}) //delete a quote using the id from URL then redirect back to the list

//UPDATE
router.get('/:id/update', async (req,res)=>{
    try{
        const foundQuote = await Quote.findById(req.params.id)
        res.render('quote-update.ejs', {foundQuote})
    }catch(error){
        console.log(error)
    }
}) //find the quote by the id and send it to quote-update where it show a form with pre-filled values to edit

router.put('/:quoteId', async (req,res)=>{
    try{
        await Quote.findByIdAndUpdate(req.params.quoteId, req.body)
        res.redirect('/quotes')
    }catch(error){
        console.log(error)
    }
}) //update the document in db and redirect them back to the main page





