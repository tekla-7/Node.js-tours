const fs = require('fs');
const Tour = require('./../models/tourModel');
const { stringify } = require('querystring');



// exports.checkID = (req, res, next, val) => {
//     console.log('tour id is: '+val);

//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     next()
// }

exports.getAllTours = async (req, res) => {
    try {
        //BUILD QUERY
        //1 filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        //2 advanced filtering

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|it)\b/g, match => `$${match}`);
        let query = Tour.find(JSON.parse(queryStr))


        //2 sort  127.0.0.1:3000/api/v1/tours?sort=    price,ratingsAverage
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy)
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')

        }

        //3 filed limiting 127.0.0.1:3000/api/v1/tours?fields=name,ratingsAverage
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v') //- means excluding only this __v field
        }
 
        //4 pagination   127.0.0.1:3000/api/v1/tours?page=2&limit=10
        const page = req.query.page*1||1;
        const limit=req.query.limit*1||100;
        const skip=(page-1)*limit;
        query=query.skip(skip).limit(limit)

        if(req.query.page){
            const numTours=await Tour.countDocuments()
        }

        //EXCUTE QUERY
        const tours = await query;
        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            requestedAT: req.requestTime,
            results: tours.length,
            data: {
                tours: tours
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.getTout = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                tour: tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            requestedAT: req.requestTime,
            data: {
                tours: newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: "Invalid data sent!"
        })
    }
}
exports.updateTour = async (req, res) => {
    /// 
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //return new document
            runValidators: true  //use validators
        })

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            messege: err
        })
    }


}
exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            messege: err
        })
    }
}