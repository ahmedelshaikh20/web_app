const Joi = require('@hapi/joi');


//VALIDATE REQUESTS
const validateReplacement = (data)=>{
  const schema =Joi.object({
    courseId: Joi
      .string()
      .required()
      ,
      day: Joi
      .string()
      .required()
      .valid('Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Saturday')
      ,
      dateOfLeave: Joi
      .string()
      .required()
      .pattern(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[/](0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])$/)
      ,
      reason: Joi
      .string()
      ,
      slot:Joi.string().required().valid('First', 'Second', 'Third', 'Fourth','Fifth')

  });

return schema.validate(data);
};


const validateSlotLinking = (data)=>{
const schema =Joi.object({
    day: Joi
    .string()
    .required(),
    courseId:  Joi
    .string()
    .required(),
    slot:Joi.string().required().valid('First', 'Second', 'Third', 'Fourth','Fifth')



});}
const validateChangeDayOff = (data)=>{
  const schema =Joi.object({
    
    dayWanted: Joi
      .string()
      .required()
      .valid('Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday'),
    dayToBeReplaced: Joi
      .string()
      .required()
      .valid('Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday'),
   reason:Joi
   .string()


      
  });

return schema.validate(data);
};


const validateLeave = (data)=>{

    const schema =Joi.object({
      leaveType: Joi
      .string()
      .required()
      .valid('MLeave','Compensation','SLeave','Annual Leave','ALeave')
      ,
      dayToBeReplaced: Joi
      .string()
      .valid('Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday')
      ,
      reason:Joi.string(),
      dateOfLeave:Joi.string().required().pattern(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[/](0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])$/)
  

    });
    return schema.validate(data);
};

const validateCancel = (data)=>{

  const schema =Joi.object({
    id: Joi
    .number()
    .required()


  });
  return schema.validate(data);
};

const validateViewSubmittedRequests = (data)=>{

  const schema =Joi.object({
    filter: Joi
    .string()
    .valid('Pending','Accepted','Rejected')
      ,
 

    

  });
  return schema.validate(data);
};

module.exports.validateViewSubmittedRequests=validateViewSubmittedRequests;
module.exports.validateCancel=validateCancel;
module.exports.validateLeave=validateLeave;
module.exports.validateChangeDayOff=validateChangeDayOff;

module.exports.validateSlotLinking=validateSlotLinking;
module.exports.validateReplacement=validateReplacement;