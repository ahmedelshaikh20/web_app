const Joi = require("@hapi/joi");
const { JSONCookie } = require("cookie-parser");

//Register validation for HR
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    userType: Joi.string().required(),
    officeLocation: Joi.string(),
    salary: Joi.number(),
    personalDetails: Joi.string(),
    faculty: Joi.string(),
    daysOff: Joi.array(),
    departement: Joi.string(),
    gender: Joi.string().required(),
  });

  return schema.validate(data);
};

const deleteStaffvalidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });

  return schema.validate(data);
};

const updateStaffvalidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    daysOff: Joi.array(),
    officeLocation: Joi.string(),
    courses: Joi.array(),
    faculty: Joi.string(),
    userType: Joi.string(),
    password: Joi.string(),
    departement: Joi.string(),
    salary: Joi.number(),
    coursesCoordinated: Joi.array(),
    personalDetails: Joi.string(),
    schedule: Joi.array(),
    annualLeaves: Joi.number(),
    missingHours: Joi.number(),
    missingDays: Joi.number(),
    extraHours: Joi.number(),
    notification: Joi.array(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const resetValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });
  return schema.validate(data);
};

const updateProfileValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string(),
    newPassword: Joi.string(),
    personalDetails: Joi.string(),
    email: Joi.string().email(),
  });
  return schema.validate(data);
};

const addLocationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),

    maxCapacity: Joi.number().required(),
  });
  return schema.validate(data);
};

const updateLocationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string(),
    maxCapacity: Joi.number(),
    currentCapacity: Joi.number(),
  });
  return schema.validate(data);
};
const deleteLocationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

const addFacultyValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

const updateFacultyValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    newName: Joi.string().required(),
  });
  return schema.validate(data);
};

const deleteFacultyValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

const addDepartmentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    faculty: Joi.string().required(),
  });
  return schema.validate(data);
};

const updateDepartmentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    newName: Joi.string().required(),
  });
  return schema.validate(data);
};

const deleteDepartmentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

const addCourseValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    id: Joi.string().required(),
    departement: Joi.string().required(),
  });
  return schema.validate(data);
};

const updateCourseValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    departement: Joi.string().required(),
  });
  return schema.validate(data);
};

const deleteCourseValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    departement: Joi.string().required(),
  });
  return schema.validate(data);
};

const assignCourseValidation = (req, res, next) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    insutructorId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    console.log("error", message);
    res.status(422).json({ error: message });
  }
};

const hodDeleteCourseValidation = (req, res, next) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    insutructorId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    console.log("error", message);
    res.status(422).json({ error: message });
  }
};

const courseCoverageValidation = (data) => {
  const schema = Joi.object({});
  return schema.validate(data);
};

const viewCourseStaffValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(data);
};

const assignToSlotValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),

    course: Joi.string().required(),

    // location: Joi
    // .string()
    // .required(),

    // day: Joi
    // .string()
    // .required(),

    // slot: Joi
    // .string()
    // .required()
  });
  return schema.validate(data);
};

const deleteSlotAssignmentValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),

    day: Joi.string().required(),

    slot: Joi.string().required(),
  });
  return schema.validate(data);
};

const assignCourseCoordinatorValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),

    course: Joi.string().required(),
  });
  return schema.validate(data);
};

const removeAssignedMemberValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),

    course: Joi.string().required(),
  });
  return schema.validate(data);
};

const updateSlotAssignmentValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),

    day: Joi.string().required(),

    slot: Joi.string().required(),

    newDay: Joi.string().required(),

    newSlot: Joi.string().required(),

    newLocation: Joi.string().required(),
  });
  return schema.validate(data);
};

const viewSlotLinkingRequestsValidation = (data) => {
  const schema = Joi.object({});
  return schema.validate(data);
};

const addCourseSlotValidation = (data) => {
  const schema = Joi.object({
    course: Joi.string().required(),

    location: Joi.string().required(),

    day: Joi.string().required(),

    slot: Joi.string().required(),
  });
  return schema.validate(data);
};

const deleteCourseSlotValidation = (data) => {
  const schema = Joi.object({
    course: Joi.string().required(),

    location: Joi.string().required(),

    day: Joi.string().required(),

    slot: Joi.string().required(),
  });
  return schema.validate(data);
};

const updateCourseSlotValidation = (data) => {
  const schema = Joi.object({
    course: Joi.string().required(),

    location: Joi.string().required(),

    day: Joi.string().required(),

    slot: Joi.string().required(),

    newLocation: Joi.string().required(),

    newDay: Joi.string().required(),

    newSlot: Joi.string().required(),
  });
  return schema.validate(data);
};

const acceptSlotLinkingRequestValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  return schema.validate(data);
};

const hodUpdateCourseValidation = (req, res, next) => {
  const schema = Joi.object({
    oldCourseId: Joi.string().required(),
    newCourseId: Joi.string().required(),
    insutructorId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    console.log("error", message);
    res.status(422).json({ error: message });
  }
};

const hodRejectRequestValidation = (req, res, next) => {
  const schema = Joi.object({
    requestId: Joi.number().required(),
    comment: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    console.log("error", message);
    res.status(422).json({ error: message });
  }
};

const hodAcceptRequestValidation = (req, res, next) => {
  const schema = Joi.object({
    requestId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    console.log("error", message);
    res.status(422).json({ error: message });
  }
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.resetValidation = resetValidation;
module.exports.updateProfileValidation = updateProfileValidation;

module.exports.addLocationValidation = addLocationValidation;
module.exports.updateLocationValidation = updateLocationValidation;
module.exports.deleteLocationValidation = deleteLocationValidation;

module.exports.addFacultyValidation = addFacultyValidation;
module.exports.updateFacultyValidation = updateFacultyValidation;
module.exports.deleteFacultyValidation = deleteFacultyValidation;

module.exports.addDepartmentValidation = addDepartmentValidation;
module.exports.updateDepartmentValidation = updateDepartmentValidation;
module.exports.deleteDepartmentValidation = deleteDepartmentValidation;

module.exports.courseCoverageValidation = courseCoverageValidation;
module.exports.viewCourseStaffValidation = viewCourseStaffValidation;
module.exports.assignToSlotValidation = assignToSlotValidation;
module.exports.deleteSlotAssignmentValidation = deleteSlotAssignmentValidation;
module.exports.assignCourseCoordinatorValidation = assignCourseCoordinatorValidation;
module.exports.removeAssignedMemberValidation = removeAssignedMemberValidation;
module.exports.updateSlotAssignmentValidation = updateSlotAssignmentValidation;
module.exports.viewSlotLinkingRequestsValidation = viewSlotLinkingRequestsValidation;
module.exports.addCourseSlotValidation = addCourseSlotValidation;
module.exports.deleteCourseSlotValidation = deleteCourseSlotValidation;
module.exports.updateCourseSlotValidation = updateCourseSlotValidation;
module.exports.acceptSlotLinkingRequestValidation = acceptSlotLinkingRequestValidation;
module.exports.addCourseValidation = addCourseValidation;
module.exports.updateCourseValidation = updateCourseValidation;
module.exports.deleteCourseValidation = deleteCourseValidation;

module.exports.deleteStaffvalidation = deleteStaffvalidation;

module.exports.updateStaffvalidation = updateStaffvalidation;

module.exports.assignCourseValidation = assignCourseValidation;
module.exports.hodDeleteCourseValidation = hodDeleteCourseValidation;
module.exports.hodUpdateCourseValidation = hodUpdateCourseValidation;
module.exports.hodRejectRequestValidation = hodRejectRequestValidation;
module.exports.hodAcceptRequestValidation = hodAcceptRequestValidation;
