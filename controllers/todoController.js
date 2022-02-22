const { Todo } = require('../models');


module.exports.listAll = async function(req, res) {
    const todo = await Todo.findAll();

    let completeItems = todo.filter(item => item.complete);
    let incompleteItems = todo.filter(item => !item.complete);

    res.render('todo/viewAll', {
        completeItems,
        incompleteItems
    });
};


module.exports.displayAddItem = function(req, res) {
    const item = {
        name: '',
        description: '',
    }
    res.render('todo/newItem', {
        item
    })
};

module.exports.addNewItem = async function(req, res){
    await Todo.create({description: req.body.description});
    res.redirect('/');
};


module.exports.viewEditItem = async function(req, res) {
    const todo = await Todo.findByPk(req.params.id);
    res.render('todo/editItem', {item: todo})
};


module.exports.saveEditItem = async function(req, res) {
    await Todo.update({ description: req.body.description}, {
        where:{
            id: req.params.id,
        }
    })
    res.redirect('/');
};


module.exports.deleteItem = async function(req, res) {
    await Todo.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/');
};


module.exports.makeItemComplete = async function(req, res) {
    await Todo.update({ complete:  true}, {
        where:{
            id: req.params.id,
        }
    })
    res.redirect('/');
};


module.exports.markItemIncomplete = async function(req, res) {
    await Todo.update({ complete:  false}, {
        where:{
            id: req.params.id,
        }
    })
    res.redirect('/');
};


