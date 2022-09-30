const router = require('express').Router();
const {createBook,getBook,updateBook,deleteBook} = require("../controler/books");
const { body } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");

// Route 1 : /api/books/createBook : login required
router.post('/createBook',fetchuser,[
    body('name','Book Name must be 2 characters').isLength({ min: 2 }),
    body('imgUrl','Enter a valid Image Url').isLength({ min: 3 }),
    body('author','Name must be 3 characters').isLength({ min: 3 }),
    body('pages','Minimum 10 pages in a book').isLength({ min: 2 }),
    body('price','Price must be 1 characters').isLength({ min: 1 })
 ], (req,res) =>{
      createBook(req,res);
});

// Route 2 : /api/books/getBook  : login required
router.get("/getBook",fetchuser,(req,res) =>{
   getBook(req,res);
});

// Route 3 : /api/books/updateBook   : login required
router.put("/updateBook/:id",fetchuser ,(req,res) =>{
    updateBook(req,res);
});

// Route 4 : /api/books/deleteeBook  : login required
router.delete("/deleteBook/:id", fetchuser,(req,res) =>{
    deleteBook(req,res);
})


module.exports = router;