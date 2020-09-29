const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const { findByIdAndRemove } = require('../model/Car');
const Car = require('../model/Car');

router.post('/',[
    check('carname','enter the car nameor model').not().isEmpty(),
    check('capacity','enter the car capacity').not().isEmpty(),
    check('city','enter the city car available').not().isEmpty(),
    check('rent','enter the car rent').not().isEmpty(),
    ],async(req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
      
        try {
            
         const car = new Car({
             carname:req.body.carname,
             capacity:req.body.capacity,
             city:req.body.city,
             rent:req.body.rent,
         })

        await car.save();

         res.send(car);

        } catch (error) {
            console.log(error);
            res.status(400).send('error in the server')
        }


    }
    );
    router.get('/',async(req,res)=>{
        try {
            const car = await Car.find(req.body);

            if (!car) {
                res.send('car not available ')
            }
              res.send(car);
            
        } catch (error) {
            console.log(error);
            
            res.status(400).send('error in the server')
        }
    })

    
    router.get('/:id',async(req,res)=>{
        try {
            let car = await Car.findById(req.params.id);
           
           
            if (!car) {
                res.send('car not available ')
            }
             res.send(car);
            
        } catch (error) {
            console.log(error);
            
            res.status(400).send('error in the server')
        }
    })


    router.post('/book/:id',[
        check('name','enter the user name').not().isEmpty(),
        check('phone','enter the phone no').not().isEmpty(),
       check('dateon','enter the date to rent').not().isEmpty(),
       check('dateoff','enter the date to rentoff').not().isEmpty(),
        ],async(req,res)=>{
    
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
          
            try {

                
            let car = await Car.findById(req.params.id);
                
             const book={
                 name:req.body.name,
                 phone:req.body.phone,
                 dateon:req.body.dateon,
                 dateoff:req.body.dateoff,
             }
                car.booking.unshift(book);
                await car.save();
             res.send(car);
    
              
    
    
            } catch (error) {
                console.log(error);
                res.status(400).send('error in the server')
            }
    
    
        }
        );


        router.delete('/:id',async(req,res)=>{
             

            try {
                
            let car = await Car.findById(req.params.id);
            

            if (!car) {
                res.send('car not available ')
            }


            if (car.booking.length>0) {
                
                res.status(400).send('car already book cannot delete')
            }else{
            await Car.findByIdAndRemove(req.params.id); 
            res.send('car deleted')
            }
            } catch (error) {
                
                console.log(error);
                res.status(400).send('error in the server')
            }


        })



        router.delete('/:id/:book_id',async(req,res)=>{
             

            try {
                
            let car = await Car.findById(req.params.id);
            

            if (!car) {
                res.send('car not available ')
            }

            car.booking = car.booking.filter(
                book=>book.id!==req.params.book_id
              );

              await car.save();
              res.send(car)
            
            } catch (error) {
                
                console.log(error);
                res.status(400).send('error in the server')
            }


        })



    module.exports=router;
