var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
    app.post('/orders', (req, res) => {
        const order = {order: req.body};
        db.collection('orders').insert(order, (err, result)=>{
            if(err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/orders/:id', (req,res)=>{
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('orders').findOne(details, (err, item) =>{
            if (err) {
                res.send({'error':'An error has occurred'});
              } else {
                res.send(item);
              }  
        });
    });

    app.get('/orders', (req,res)=>{
      db.collection('orders').find({}).toArray((err,result) =>{
          if(err){
            res.send({'error':'An error has occurred'});
          } else {
              res.send(result);
          }
      });
    });

    app.get('/status', (req,res)=>{
       res.send({"applicationName":"The Nimble Sloth Warehouse","applicationStatus":"OK"});
    });

    app.put('/orders/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const order = { order: req.body };
        db.collection('orders').update(details, order, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(note);
          } 
        });
      });

    app.delete('/orders/:id', (req,res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        db.collection('orders').remove(details, (err,item) => {
            if(err) {
                res.send({'error':'An error has occured'});
            } else {
                res.send('Order ' + id +' deleted!');
            }
        });
    });
};