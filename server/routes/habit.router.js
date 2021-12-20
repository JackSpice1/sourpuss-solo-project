const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "habit" ORDER BY id`;

  pool.query(queryText).then((results)=>{
    res.send(results.rows);
  }).catch((err)=>{
    console.log('error with habit GET:', err);
    res.sendStatus(500);
  })
});

//POST route
router.post('/', (req, res) => {
  const queryText = `INSERT INTO "habit" ("title", "description", "timer", "focus_level")
  VALUES ($1, $2, $3, $4) RETURNING id`;
  values = [ req.body.title,
             req.body.description,
             req.body.timer, 
             req.body.focus_level]; 

  pool.query(queryText, values)
  .then((results)=>{
    res.send(results.rows[0]);
  }).catch((err)=>{
    console.log('POST habit failed:', err);
    res.sendStatus(500);
  })
});

module.exports = router;
