const connexion = require("../../connexions/db");
var express = require("express");
var curriculumRoutes = express.Router();
const mysql = require("mysql");

//All information of curriculum vitae

curriculumRoutes.post("/all-curriculum-vitae-information", (req, res, next) => {
  console.log("email", req.body.email);
  const formData = req.body.email;
  connexion.query(
    `SELECT * FROM curriculum_vitae AS cuv
    JOIN user AS usr ON usr.user_id=cuv.user_id 
    JOIN languages AS lan ON lan.language_id=cuv.language_id
    JOIN language_level AS lle ON lle.language_level_id=lan.language_level_id
    JOIN skills AS ski ON ski.skill_id = cuv.skill_id
    JOIN skill_level AS sle ON sle.skill_level_id=ski.skill_level_id
    JOIN education AS edc ON edc.education_id = cuv.education_id
    JOIN education_level AS edl ON edl.education_level_id=edc.education_level_id
    JOIN work_experience AS wke ON wke.work_experience_id = cuv.work_experience_id
    JOIN work_references AS wkr ON wkr.work_references_id = cuv.work_references_id 
    WHERE usr.email="${formData}"`,
    (err, results) => {
      if (err) {
        ("all tables", err);
        res.status(500).send("error to create order");
      } else {
        console.log("cv", results)
        res.json(results);
      }
    }
  );
});

//skills

curriculumRoutes.get("/skill-level", (req, res, next) => {
  connexion.query(`SELECT * FROM skill_level`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-skills", (req, res, next) => {
  const formData = req.body;
  connexion.query(
    `INSERT INTO skills (skill_name, skill_level_id) VALUES ('${
      formData.skill_name
    }','${formData.skill_level_id}')`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//languages

curriculumRoutes.get("/language-level", (req, res, next) => {
  connexion.query(`SELECT * FROM language_level`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-languages", (req, res, next) => {
  const formData = req.body;
  connexion.query(
    `INSERT INTO languages (language_name, language_level_id) VALUES ('${
      formData.language_name
    }','${formData.language_level_id}')`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//education

curriculumRoutes.get("/education-level", (req, res, next) => {
  connexion.query(`SELECT * FROM education_level`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-education", (req, res, next) => {
  const formData = req.body;
  let queries = "";
  formData.forEach(function(item) {
    queries += mysql.format(`(${item.education_level_id}, ${
      item.title_name_edc
    }, '${item.year_start_edc}', '${item.year_end_edc}', 
        '${item.university}', '${item.city_edc}', '${item.country_edc}', '${
      item.description_edc
    }'
        ),`);
  });
  let querie = queries.substring(0, queries.length - 1);
  connexion.query(
    `INSERT INTO education (education_level_id, title_name_edc, year_start_edc, year_end_edc, university, city_edc, country_edc, description_edc) VALUES ${querie}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//work experience

curriculumRoutes.get("/work-experience", (req, res, next) => {
  connexion.query(`SELECT * FROM work_experience`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-work-experience", (req, res, next) => {
  const formData = req.body;
  let queries = "";
  formData.forEach(function(item) {
    queries += mysql.format(`(${item.title_name_wke},'${
      item.year_start_wke
    }', '${item.year_end_wke}', 
        '${item.company_name}', '${item.city_wke}', '${item.country_wke}','${
      item.description_wke
    }'
        ),`);
  });
  let querie = queries.substring(0, queries.length - 1);
  connexion.query(
    `INSERT INTO work_experience (title_name_wke, year_start_wke, year_end_wke, company_name, city_wke, country_wke, description_wke) VALUES ${querie}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

//Work references

curriculumRoutes.get("/work-references", (req, res, next) => {
  connexion.query(`SELECT * FROM work_references`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  });
});

curriculumRoutes.post("/add-work-references", (req, res, next) => {
  const formData = req.body;
  let queries = "";
  formData.forEach(function(item) {
    queries += mysql.format(`(${item.reference_person},'${
      item.company_name_ref
    }', '${item.email_ref}', 
        '${item.phone_ref}'
        ),`);
  });
  let querie = queries.substring(0, queries.length - 1);
  connexion.query(
    `INSERT INTO work_references (reference_person, company_name_ref, email_ref, phone_ref) VALUES ${querie}`,
    (err, results) => {
      if (err) {
        res.status(500).send("error to create order");
      } else {
        res.json(results);
      }
    }
  );
});

/*curriculumRoutes.post('/add-curriculum-vitae', (req, res, next) => {
  connexion.query(`INSERT INTO work_references (user_id, language_id, skill_id, education_id, work_experience_id, work_references_id) VALUES ('${}', '${}', '${}','${}', '${}', '${}')`, (err, results) => {
    if (err) {
      res.status(500).send("error to create order");
    } else {
      res.json(results);
    }
  })
});*/

module.exports = curriculumRoutes;
