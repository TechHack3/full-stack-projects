const express = require('express');
const fs=require('fs');

let movies=JSON.parse(fs.readFileSync('./movies.json'));

exports.checkID=(req,res,next,value)=>{
    //Finding movie matching ID parameter
    let movie= movies.find((el)=>{
        return el.id === value*1;
    })  
    if(!movie)
    {
       return res.status(404).json({
            status:"fail",
            message:`Movie with id ${value} is not found`
        })
    }
    next();
}

exports.validateBody=(req,res,next)=>{
    if(!req.body.name || !req.body.releaseYear)
    {
        return res.status(404).json({
            status: 'fail',
            message: 'Not a valid movie Data'
        });
    }
    next();
}
//ROUTE HANDLE FUNCTIONS
exports.getAllMovies = (req,res)=>{
    res.status(200).json({
        status:"success",
        count:movies.length,
        data:{
            movies:movies
        }
    });
}

exports.getMovie = (req,res)=>{
    // console.log(req.params);
    const id = req.params.id * 1; //(to convert string into numeric type)
    let movie= movies.find((el)=>{
        return el.id === id;
    })  
    res.status(200).json({
        status:"success",
        data:{
            movies:movie
        }
    });
}

exports.createMovie = (req,res)=>
{
   const newID=movies[movies.length-1].id+1;
   const newMovie=Object.assign({id:newID},req.body);
   movies.push(newMovie);

   fs.writeFile('./movies.json',JSON.stringify(movies),(err)=>{
    res.status(201).json({
        status:"success",
        data:{
            movie:newMovie
        }
    })
   });
}

exports.updateMovie = (req,res)=>{
    let id = req.params.id * 1;
    let movieToUpdate = movies.find((el)=>{
        return el.id === id;
    })
    let index= movies.indexOf(movieToUpdate);
    let updatedMovieObject = Object.assign(movieToUpdate,req.body);

    movies[index]=movieToUpdate;

    fs.writeFile('./movies.json',JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:"success",
            data:{
                movie:movieToUpdate
            }
        })
       });
}

exports.deleteMovie=(req,res)=>{
    const id = req.params.id * 1;
    const movieToDelete = movies.find((el)=>{
        return el.id === id;
    })
    const index=movies.indexOf(movieToDelete);
    movies.splice(index,1);

    fs.writeFile('./movies.json',JSON.stringify(movies),(err)=>
    {
        res.status(204).json({
            status:"success",
            data:{
                movie:null
            }
        })
    })
}