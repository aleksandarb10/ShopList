import express, {Router, Response} from "express";
import {check, validationResult} from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import mongoose from "mongoose";

import auth from "../../middleware/auth";
import List from "../../models/List"; 
import IList from "../../interfaces/List"
import Request from "../../types/Request";
import User from "../../models/User";
import IUser from "../../interfaces/User"

const router: Router = Router();

// @route   Put api/list
// @desc    Update list
// @access  Private
router.put(
    "/:id", auth, async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ errors: errors.array() });
      }
      const ListID = req.params.id;


      try {
        const list: IList  = await List.findById(ListID)

        if (!list) {
          return res.status(HttpStatusCodes.BAD_REQUEST).json({
            errors: [
              {
                msg: "List dont exist",
              },
            ],
          });
        }
        else{

            if (req.body.ListName && !req.body.Products) {

                list.ListName= req.body.ListName;

                const listUpdate = await List.findByIdAndUpdate(ListID, {$set:list}, {new:true} ); //Ne valja
                return res.json("List updated");
             }
            
            else if (!req.body.ListName && req.body.Products) {
                list.Products = req.body.Products;
                const listUpdate = await User.findByIdAndUpdate(ListID,{$set:list}, {new: true});
                return res.json("List updated");
            }
            else if (req.body.ListName && req.body.Products) {
                list.ListName = req.body.ListName
                list.Products = req.body.Products;

                const listUpdate = await User.findByIdAndUpdate(ListID, {$set:list}, {new: true});
                return res.json("List updated");
            } else 
            {
                return res.json("List not updated! Check parameters!");
            }
  
        }
      } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
      }
    }
  );
// @route   POST api/list
// @desc    Create or update user's list
// @access  Private

router.post(
"/",
[
    auth,
    check("ListName","List name is required").not().isEmpty(),
    check("Products","List of products is required").not().isEmpty(),
],
async(req:Request, res: Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({errors:errors.array()});
    }
    const {ListName, Products} = req.body;

    const UserId = req.userId;
    const userid = req.params.UserId;

    const ListFields = {

        
        ListName,
        UserID: UserId,
        Products
    }
    try{
        let user : IUser = await User.findOne({userid});
        if(!user)
        {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({

                errors:[
                    {
                       msg: "User not registered"
                    }
                ],
            });
        }

        const list = new List(ListFields);

        await list.save();

        res.json(list);

    }catch(err)
    {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
    
});


// @route   GET api/list
// @desc    Get all Lists
// @access  Public

router.get("/all", auth, async (req:Request, res:Response) => {
    try{
        const lists = await List.find();
        res.json(lists);

    }catch(err)
    {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
});

// @route   GET api/list/userlist
// @desc    Get all Lists from same user
// @access  Public

router.get("/userlist", auth, async (req:Request, res:Response) => {

    const UserID = req.params.UserId;
    try{
        const lists = await List.find({UserID});
        res.json(lists);

    }catch(err)
    {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
});


// @route   GET api/list/:id
// @desc    Get product list by id
// @access  Private

router.get(
    "/:id", auth, async (req:Request, res:Response)=>{
        try{

           const listID = req.params.id;

           const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

           if (!isValidId) {
            res.json("Id not valid");
           }

            const list : IList = await List.findById(req.params.id);

            if(!list)
            {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    error: [
                        {
                            msg:"There is no Product list",
                        },
                    ],
                });
            }
            res.json(list);
        }catch(err)
        {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server error");       
        }
    });

// @route   DELETE api/list
// @desc    Delete List
// @access  Private

router.delete("/:id", auth, async (req:Request, res:Response) => {

    try{

        const listID = req.params.id;

        await List.findOneAndRemove({listID});

        res.json("List removed");

    }catch(err){
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server error");

    }
    
});
    

export default router;