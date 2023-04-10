const express = require('express');
const { createTodo, allTodo,updateTodo,deleteTodo } = require('../controllers/todosController');

const router = express.Router();


// create the todo || POST
router.route('/create').post(createTodo);
router.route('/get-all').get(allTodo);
router.route('/update/:id').patch(updateTodo)
router.route('/delete/:id').delete(deleteTodo);

module.exports = router;