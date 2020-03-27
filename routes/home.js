const router = require('express').Router();
const Case = require('../models/case');
const Comment = require('../models/comment');

router.get('/home', (req,res,next) => {
    res.render('home');
} );

router.get('/new', (req,res,next) => {
    res.render('new');
} );

router.post('/new',async (req,res,next) => {
    const newCase = new Case(req.body);
    await newCase.save();
    res.redirect('/edit/' + newCase._id );
} );

router.get('/edit/:id',async (req,res,next) => {
    const caseId = req.params.id;
    const editCase = await Case.findById(caseId);
    const model = editCase;

    model.comments = await Comment
        .find({case_id:editCase._id})
        .exec();

    res.render('edit',{model})
});

router.post('/comment/:id',async (req,res,next) => {
    const caseId = req.params.id;
    const editCase = await Case.findById(caseId);

    const newComment = new Comment({
        ...req.body,
        case_id:caseId,
        user_id:null
    })

    await newComment.save();

    res.redirect('/edit/' + newComment.case_id );
});

module.exports = router;