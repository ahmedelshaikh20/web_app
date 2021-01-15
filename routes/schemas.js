const Joi = require('joi');
const { join } = require('path');
const schemas = {
  signBody: Joi.object().keys({
    month: Joi.string()
      .min(1)
      .max(2)
      .pattern(/^[0-9]+$/)
      .valid('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')
      .required(),
    day: Joi.string()
      .min(1)
      .max(2)
      .valid(
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
      )
      .pattern(/^[0-9]+$/)
      .message('Day should be string of 2 number less than or equal 30')
      .required(),
    hour: Joi.string()
      .length(5)
      .pattern(/^([0-9]\d):([0-9]\d)$/)
      .message('Hour should be in this format HH:MM')
      .required(),
    id: Joi.string().required(),
  }),
  updatesalary: Joi.object().keys({
    salary: Joi.number().required(),
    id: Joi.string().required(),
  }),
};
module.exports = schemas;
