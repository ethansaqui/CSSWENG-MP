"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const vehicle_1 = require("../../models/vehicle");
const router = express.Router();
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    vehicle_1.Vehicle.find({})
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((data) => {
        res.json(data);
    });
}));
router.get("/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    vehicle_1.Vehicle.find({ id: req.query.id })
        .then((data) => {
        res.json(data);
    });
}));
router.post("/create", (req, res) => {
    vehicle_1.Vehicle.create(req.body, (error, result) => {
        if (error) {
            console.log(error);
        }
        return result;
    });
    res.json(req.body);
    res.end();
});
router.post("/update", (req, res) => {
    vehicle_1.Vehicle.updateOne({ id: req.query.id }, req.body, (err) => {
        if (err) {
            console.log(err);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
        res.end();
    });
});
router.delete("/delete", (req, res) => {
    vehicle_1.Vehicle.deleteOne({ id: req.query.id })
        .then((delRes) => {
        res.end();
    })
        .catch((err) => {
        console.log(err);
        res.end();
    });
    ;
});
router.get("/filter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = makeQuery(req);
    vehicle_1.Vehicle.find({
        licensePlate: query.licensePlate,
        make: query.make,
        model: query.model,
        yearManufactured: query.yearManufactured
    })
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((result) => {
        res.json(result);
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    });
}));
const makeQuery = (req) => {
    return {
        licensePlate: (req.query.licensePlate) ? req.query.licensePlate : "",
        make: (req.query.make) ? req.query.make : "",
        model: (req.query.model) ? req.query.model : "",
        yearManufactured: (req.query.yearManufactured) ? parseInt(req.query.licensePlate) : -1,
    };
};
exports.default = router;
