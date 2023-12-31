import Tour from '../models/Tour.js';

// create new tour
export const createTour = async (req,res) => {
   const newTour = new Tour(req.body);
//    console.log(req.body);
   try{
    // saving data in database
      const savedTour = await newTour.save();
      res.status(200).json({
         success:true,
         message:'successfully created',
         data:savedTour
      })

   }catch(err){
    res.status(500).json({
        success:false,
        message:'Failed to create. Try again'
     })
   }
};

// update tour
// create new tour
export const updateTour = async (req,res) => {
    
    const id = req.params.id;

    try{
     const updatedTour = await Tour.findByIdAndUpdate(id,{
        $set : req.body
     },{new:true});

     res.status(200).json({
        success:true,
        message:'successfully updated',
        data:updatedTour,
     })

    } catch{
        res.status(500).json({
            success:false,
            message:'Failed to update. Try again'
        })
    }
 };
// delete
 export const deleteTour = async (req,res) => {

    const id = req.params.id;

    try{
     await Tour.findByIdAndDelete(id);

     res.status(200).json({
        success:true,
        message:'successfully deleted',
     })

    } catch{
        res.status(500).json({
            success:false,
            message:'Failed to delete. Try again'
        })
    }
 };

// getsingletour
 export const getSingleTour = async (req,res) => {

   
    const id = req.params.id;
    try{
     const tour = await Tour.findById(id).populate('reviews');
     res.status(200).json({
        success:true,
        message:'success',
        data:tour,
     })

    } catch(err){
        res.status(404).json({
            success:false,
            message:'Not found'
        })
    }
 };


//  getAll tour
export const getAllTour = async (req,res) => {

    // for pagination
    const page = parseInt(req.query.page);
    // console.log(page);
try{
        const tours = await Tour.find({}).populate('reviews').skip(page*8).limit(8);
        res.status(200).json({
            success:true,
            count:tours.length,
            message:"success",
            data:tours,
        });

    } catch{
        res.status(404).json({
            success:false,
            message:"not found",
        });
    }
 };


//  get tour by search
export const getTourSearch = async(req,res) =>{
  // here 'i' means case sensitive 
  const city = new RegExp(req.query.city, 'i') ; 
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);


  try{
    // gte -> greater than or equal to
      const tours = await Tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate('reviews');
      res.status(200).json({
        success:true,
        message:"success",
        data:tours,
    });

  }catch{
    res.status(404).json({
        success:false,
        message:"not found",
    });
  }
}

//  get featured tour
export const getFeaturedTour = async (req,res) => {

try{
        const tours = await Tour.find({featured:true}).populate('reviews').limit(8);
        res.status(200).json({
            success:true,
            count:tours.length,
            message:"success",
            data:tours,
        });

    } catch{
        res.status(404).json({
            success:false,
            message:"not found",
        });
    }
 };


//  get tour counts
export const getTourCount = async(req,res) => {

    try{
         const tourCount = await Tour.estimatedDocumentCount();
         res.status(200).json({
            success:true,
            data:tourCount
         })
    }catch{

        res.status(500).json({
            success:false,
            message:'failed to fetch'

        });
    }
}
