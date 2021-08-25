"use strict";

const express = require("express");
const router = express.Router();

const permissions = require("../middleware/acl.js");
const bearerAuth = require("../middleware/bearer.js");

const { marvelMovie } = require("../models/index");

router.get("/marvel", bearerAuth, getAll);
router.get("/marvel/:id", bearerAuth, getOne);

router.post("/marvel", bearerAuth, permissions("create"), create);
router.put("/marvel/:id", bearerAuth, permissions("update"), update);
router.patch("/marvel/:id", bearerAuth, permissions("update"), update);
router.delete("/marvel/:id", bearerAuth, permissions("delete"), handleDelete);

async function getAll(req, res) {
  let allRecords = await marvelMovie.get();
  res.status(200).json(allRecords);
}

async function getOne(req, res) {
  const id = req.params.id;

  let theRecord = await marvelMovie.get(id);

  res.status(200).json(theRecord);
}

async function create(req, res) {
  let obj = req.body;

  let newRecord = await marvelMovie.create(obj);

  res.status(201).json(newRecord);
}

async function update(req, res) {
  const id = req.params.id;
  const obj = req.body;

  let updatedRecord = await marvelMovie.update(id, obj);

  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await marvelMovie.delete(id);

  res.status(200).json(deletedRecord);
}

module.exports = router;