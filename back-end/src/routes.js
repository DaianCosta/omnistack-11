const express = require("express");
const ongController = require("./controllers/OngController");
const incidentController = require("./controllers/IncidentController");
const profileController = require("./controllers/ProfileController");
const sessionController = require("./controllers/SessionController");
const { celebrate, Joi, Segments } = require("celebrate");

const routes = express.Router();

routes.post("/session", sessionController.create);

routes.get("/ongs", ongController.index);
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  ongController.create
);

routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number()
    }
  }),
  incidentController.index
);
routes.post("/incidents", incidentController.create);
routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    }
  }),
  incidentController.delete
);
routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  profileController.index
);

module.exports = routes;
