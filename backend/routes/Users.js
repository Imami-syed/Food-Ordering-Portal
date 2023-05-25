var express = require("express");
// const Buyer = require("../models/Buyer");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Vendor = require("../models/Vendor");
const Buyer = require("../models/Buyer");
const Food = require("../models/Food");
const Order = require("../models/Order");
const { response } = require("express");
const Users = require("../models/Users");
const Fav = require("../models/Fav")
// const { ContactSupportOutlined } = require("@material-ui/icons");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});
router.post("/myorders", function (req, res) {
    const vendorid = req.body.email;
    Order.find({ vendorid }).then(user => {
        if (!user) {
            console.log(err);
        } else {
            res.json(user);
        }
    })
});

router.post("/myordersbuyer", function (req, res) {
    const buyerid = req.body.email;
    Order.find({ buyerid }).then(user => {
        if (!user) {
            console.log(err);
        } else {
            res.json(user);
        }
    })
});

router.get("/buyer", function (req, res) {
    Buyer.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});
router.get("/vfood", function (req, res) {
    Food.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});
router.post("/food", (req, res) => {
    const email = req.body.email;
    console.log(email)
    Food.find({ email }).then(user => {
        if (!user) {
            console.log(error)
        }
        else {
            res.status(200).json(user)
        }
    })
});
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        age: req.body.age
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/addfood", (req, res) => {
    const newfood = new Food({
        name: req.body.name,
        price: req.body.price,
        date: req.body.date,
        rating: req.body.rating,
        vornv: req.body.vornv,
        email: req.body.email,
        canteenname: req.body.canteenname,
    });

    newfood.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/registerbuyer", (req, res) => {
    console.log(req.body);
    const newbuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        age: req.body.age,
        contact_number: req.body.contact_number,
        Batch_name: req.body.Batch_name,
        Password: req.body.Password,
    });

    newbuyer.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/registervendor", (req, res) => {
    const newVendor = new Vendor({
        Manager_name: req.body.Manager_name,
        email: req.body.email,
        date: req.body.date,
        contact_number: req.body.contact_number,
        Shop_name: req.body.Shop_name,
        open_time: req.body.open_time,
        close_time: req.body.close_time,
        Password: req.body.Password,
    });

    newVendor.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/login", (req, res) => {

    const email = req.body.email;
    const Password = req.body.Password;
    let verify = {
        nsa: "",
        Login_type: "",
        email: ""
    }

    Buyer.findOne({ email, Password }).then(user => {
        if (!user) {
            Vendor.findOne({ email, Password }).then(user => {
                if (!user) {
                    verify.nsa = 0
                    verify.Login_type = "Invalid Credentials !"
                    verify.email = email
                    const m = { nsa: "0" }
                    res.send(m)
                }
                else {
                    verify.nsa = 1
                    verify.Login_type = "vendor"
                    verify.email = email
                    const m = { nsa: "1", Element: user }
                    res.send(m)
                }
            });
        }
        else {
            verify.nsa = 2
            verify.Login_type = "buyer"
            verify.email = email
            const m = { nsa: "2", Element: user }
            res.send(m)
        }
    });
});
router.post("/buyerpage/:email", async (req, res) => {

    const email = req.params.email;
    // console.log(email)
    Buyer.findOne({ email }).then(user => {
        if (!user) {
            res.status(400)
        }
        else {
            res.status(200).json(user)
        }
    });
});
router.post("/vendorpage/:email", async (req, res) => {

    const email = req.params.email;
    // console.log(email)
    Vendor.findOne({ email }).then(user => {
        if (!user) {
            res.status(400)
        }
        else {
            res.status(200).json(user)
        }
    });
});
router.post("/editbuyer", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const buyernew = ({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        age: req.body.age,
        contact_number: req.body.contact_number,
        Batch_name: req.body.Batch_name,
        // Password: req.body.Password,
    });
    Buyer.findOne({ email }).then(user => {
        if (!user) {
            res.status(400).send(err);
        }
        else {
            user.name = buyernew.name,
                user.email = buyernew.email,
                // user.date=buyernew.date
                user.age = buyernew.age,
                user.contact_number = buyernew.contact_number,
                user.Batch_name = buyernew.contact_number,
                // user.Password=buyernew.Password
                user.save();
            res.status(200).json(user)
        }
    });
});
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Food.findByIdAndRemove(id).exec();
    res.status(200).send("Item Deleted");
})
router.post("/editvendor", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const buyernew = ({
        Manager_name: req.body.Manager_name,
        email: req.body.email,
        Shop_name: req.body.Shop_name,
        date: req.body.date,
        age: req.body.age,
        contact_number: req.body.contact_number,
        open_time: req.body.open_time,
        close_time: req.body.close_time,
        // Password: req.body.Password,
    });
    Vendor.findOne({ email }).then(user => {
        if (!user) {
            res.status(400).send(err);
        }
        else {
            user.Manager_name = buyernew.Manager_name,
                user.email = buyernew.email,
                // user.date=buyernew.date
                user.contact_number = buyernew.contact_number,
                user.open_time = buyernew.open_time,
                user.close_time = buyernew.close_time,
                user.Shop_name = buyernew.Shop_name,
                // user.Password=buyernew.Password
                user.save();
            res.status(200).json(user)
        }
    });
});
router.put("/update", async (req, res) => {
    const id = req.body.id
    // const newName = req.body.name
    // const newPrice = req.body.price
    // const newVornv = req.body.vornv
    const newFood = ({
        name: req.body.name,
        price: req.body.price,
        vornv: req.body.vornv,
    });
    try {
        await Users.findById(id, (error, user) => {
            user.name = newFood.name,
                user.price = newFood.price,
                user.vornv = newFood.vornv
            // user.name=newName,
            // user.price=newPrice,
            // user.vornv=newVornv 
            user.save();
            // res.status(200).json(user)
        })
    } catch (err) {
        console.log(err)
    }
})
router.post("/borders", (req, res) => {
    // console.log(req.body)
    const newUser = new Order({
        qty: req.body.qty,
        vendorid: req.body.vendorid,
        date: req.body.date,
        buyerid: req.body.buyerid,
        itemname: req.body.itemname,
        price: req.body.price,
        // orderstatus: req.body.orderstatus,
        shop_name: req.body.shop_name,
        food_id: req.body.foodid
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);

        });
    console.log()

})
router.post("/findorders", (req, res) => {
    const id = req.body.id;
    Order.findById(id).then(user => {
        res.status(200).json(user);
        // console.log(user.vendorid)
    })
        .catch(err => {
            res.status(400).send(err);
        });
})

router.post("/statusset", (req, res) => {
    const id = req.body.id;
    const update = req.body.status
    Order.findByIdAndUpdate(id).then(user => {

        user.orderstatus = update;
        user.save();
        res.status(200).json(user);
        // console.log(user.vendorid)
    })
        .catch(err => {
            res.status(400).send(err);
        });
})

router.post("/addwallet", (req, res) => {
    const id = req.body.id;
    const update = req.body.wall;
    const aa =req.body.aa;
    console.log(req.body);
    Buyer.findByIdAndUpdate(id).then(user => {
        user.wallet = parseInt (update) + parseInt (aa);
        user.save();
        res.status(200).json(user);
        // console.log(user.vendorid)
    })
        .catch(err => {
            res.status(400).send(err);
        });
})

router.post("/subwallet", (req, res) => {
    const id = req.body.id;
    const update = req.body.wall;
    const aa =req.body.aa;
    console.log(req.body);
    Buyer.findByIdAndUpdate(id).then(user => {
        user.wallet = (parseInt (update) - parseInt (aa));
        user.save();
        res.status(200).json(user);
        // console.log(user.vendorid)
    })
        .catch(err => {
            res.status(400).send(err);
        });
})

router.post("/gettingvendoremail", (req, res) => {
    const id = req.body.id;
    Food.findById(id).then(user => {
        res.status(200).json(user);
        // console.log(user)
    })
        .catch(err => {
            res.status(400).send(err);
        });
})
router.post("/vendor_details", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    Vendor.findOne({ email }).then(user => {
        if (!user) {
            res.status(500);
        }
        else {
            console.log(user)
            res.status(200).json(user.Shop_name);
        }
    })
})
router.post("/gettingfavourite", (req, res) => {
    const bemail = req.body.email;
    Fav.find({ bemail }, function (err, users) {
        if (error) {
            console.log(error);
        } else {
            res.json(users);
        }
    })
})
router.post("/addfav", (req, res) => {
    let food = req.body.food;
    let vemail = req.body.vemail;
    let bemail = req.body.bemail;
    const newFav = new Fav({
        bemail: req.body.bemail,
        vemail: req.body.vemail,
        food: req.body.food
    });
    Fav.findOne({ bemail, vemail, food }).then(user => {
        if (!user) {
            newFav.save()
                .then(muser => {
                    res.status(200).json(muser);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            res.send("Wrong inputs")
        }
    })

})
// router.post("/gettingcanteenname", (req, res ) =>{
//     console.log("canteenname")
//     console.log(req.body)
//     const email=req.body.email;
//     Vendor.findOne({email}).then(user => {
//         res.status(200).json(user.email);
//         console.log(user)
//     })
//     .catch(err => {
//         res.status(400).send(err);
//     });
// })
// router.post("/addqty", async (req, res) =>{
//     const newqty=req.body.newqty;
//     const id=req.body.id;
//     try{
//         await Order.findById(id, (error, user) =>{
//             user.qty=newqty,
//             user.save();
//          });
//     }
//     catch(err) {
//         console.log(err);
//     }
//     res.send("quantity added!");
// })
module.exports = router;
