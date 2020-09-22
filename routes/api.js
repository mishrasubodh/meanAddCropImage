const fs = require('fs');
const path = require('path');
const express = require('express')
const router = express.Router();
const {
    userSChema,
    loginuser
} = require('../model/user');
var bcrypt = require('bcrypt')
// for registration
router.post('/registration', (req, res) => {

    bcrypt.hash(req.body.password, 8).then((hash) => {
        req.body.password = hash
        let obj = {
            Name: req.body.Name,
            DateofBirth: req.body.DateofBirth,
            Gender: req.body.Gender,
            MobileNumber: req.body.MobileNumber,
            Email: req.body.Email,
            password: hash,

        }
        userSChema.create(obj).then((responce) => {
            if (responce.length < 1) {
                return res.status(401).json({
                    message: ' registration fail'
                });
            } else {
                fs.mkdir(path.join(__dirname, 'uploads'), (err) => {
                    const img = req.body.imagePath;
                    // strip off the data: url prefix to get just the base64-encoded bytes
                    const data = img.replace(/^data:image\/\w+;base64,/, "");
                    const buf = new Buffer.from(data, 'base64');
                    fs.writeFile(`./uploads/images/${responce._id}.png`, buf, err => {
                        if (err) {
                            return res.status(401).json({
                                message: 'Registration SuccessFull but Image not upload',
                                data: responce
                            });
                        }
                        let Data = {
                            Name: responce.Name,
                            DateofBirth: responce.DateofBirth,
                            Gender: responce.Gender,
                            MobileNumber: responce.MobileNumber,
                            Email: responce.Email,
                            imagePath: `${responce._id}.png`
                        }
                        return res.status(200).json({
                            message: 'Registration SuccessFull',
                            data: Data
                        });
                    });
                });

            }

        }).catch(next);
    });

})





//for login user

router.post('/signup', async (req, res) => {
    userSChema.findOne({
        Email: req.body.username
    }).then((responce) => {
        if (responce.length < 1) {
            return res.status(401).json({
                message: ' auth failed'
            });
        }
        bcrypt.compare(req.body.password, responce.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'auth failed'
                });
            }

            let obj = {
                id: responce._id,
                Name: responce.Name,
                Email: responce.Email
            }
            if (result) {
                return res.status(200).json({
                    message: 'auth successful',
                    responce: obj
                });
            }

        });

    })
});

router.post('/login', (req, res, next) => {

    userSChema.findOne(req.body).then((responce) => {
        if (responce != null || undefined) {
            var userdata = responce;
            let = obj = {
                message: "login Successful",
                userdata
            }
            //next(responce)
            res.status(200).send({
                obj
            });
        } else if (responce == null) {
            let = obj = {
                message: "user not found",
            }
            //  next(res)
            //    res.status(200).send(obj); 
        }
    }).catch(next);
});
//for Single data By id 
router.get('/databyid/:id', (req, res, next) => {
    userSChema.findById(req.params.id).then((userSChema) => {
        if (userSChema) {
            res.send(userSChema);
        }

    }).catch(next);
});

//for get all users data
router.get('/allRejisterData', (req, res, next) => {
    userSChema.find().then((response) => {
        res.send(response);
    }).catch(next);
});



//for databy id
router.put('/databyid/:id', (req, res, next) => {

    let data = {
        Name: req.body.Name,
        DateofBirth: req.body.DateofBirth,
        Gender: req.body.Gender,
        MobileNumber: req.body.MobileNumber,
        Email: req.body.Email,

    }
    userSChema.findByIdAndUpdate({
        _id: req.params.id
    }, data).then((user) => {
        if (user) {
            userSChema.findOne({
                _id: req.params.id
            }).then((userSChema) => {
                if (userSChema &&req.body.imagePath ) {
                    fs.mkdir(path.join(__dirname, 'uploads'), (err) => {
                        const img = req.body.imagePath;
                        const data = img.replace(/^data:image\/\w+;base64,/, "");
                        const buf = new Buffer.from(data, 'base64');
                        fs.writeFile(`./uploads/images/${req.body.id}.png`, buf, err => {
                            if (err) {
                                return res.status(401).json({
                                    message: 'Registration SuccessFull but Image not upload',
                                    data: responce
                                });
                            }
                            let Data = {
                                Name: userSChema.Name,
                                DateofBirth: userSChema.DateofBirth,
                                Gender: userSChema.Gender,
                                MobileNumber: userSChema.MobileNumber,
                                Email: userSChema.Email,
                                imagePath: `${userSChema._id}.png`
                            }
                            return res.status(200).json({
                                message: 'Profile update SuccessFull',
                                data: Data
                            });
                        });
                    });

                    // res.send(userSChema);
                }else{
                    let Data = {
                        Name: userSChema.Name,
                        DateofBirth: userSChema.DateofBirth,
                        Gender: userSChema.Gender,
                        MobileNumber: userSChema.MobileNumber,
                        Email: userSChema.Email,
                        imagePath: `${userSChema._id}.png`
                    }
                    return res.status(200).json({
                        message: 'Profile update SuccessFull',
                        data: Data
                    });
                }
                

            }).catch(next);
        } else {
            res.status(402).send(message = 'data not found');
        }

    })
});

//delete databy id
router.delete('/removedata/:id', (req, res, next) => {

    const id = req.body._id
    userSChema.findOneAndDelete(req.body._id).then((user) => {

        if (user !== null) {
            let obj = {
                message: 'data successfuly delete',
                user
            }
            res.status(200).send(obj);
        } else if (user == null) {
            let obj = {
                message: 'data not found',
                // responce
            }
            res.status(200).send(obj);
        }

    }).catch(next)
});

router.post('/searchData', (req, res, next) => {
    userSChema.find({
        $text: {
            $search: req.body.firstName,
            $caseSensitive: false
        }
    }).then((response) => {
        if (response == '') {
            res.status(404).send({
                message: ' Name Is Not Found In DataBase'
            })
        } else {
            res.status(200).send({
                message: 'Name Find Successful',
                response
            })
        }
    }).catch(next);
});

module.exports = router;