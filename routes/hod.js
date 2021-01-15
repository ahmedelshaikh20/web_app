const router = require('express').Router();
const Department = require(`../models/departements`);
const Course = require(`../models/courses`);
const User = require(`../models/users`);
const Faculty = require(`../models/Faculties`);
const Location = require(`../models/locations`);
const Request = require(`../models/requests`);
const validation = require(`./validation`);

const verify = require('./verifyToken');
const authrization = require('../authrization');
const { use } = require('./staff');
const { isError } = require('@hapi/joi');

router
  .route('/assignCourse/')
  .post(verify, authrization.hod, validation.assignCourseValidation, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const course = await Course.findOne({ id: req.body.courseId });
      const insutructor = await User.findOne({ id: req.body.insutructorId });

      if (user.departement != insutructor.departement + '') {
        throw new Error('Insutructor and HOD should be from the same department');
      }

      if (!course.departement.includes(insutructor.departement)) {
        throw new Error("Insutructor can't be assigned to a course from another department");
      }

      if (insutructor.courses.includes(course._id)) {
        throw new Error('Insutructor already has this cousre');
      }

      insutructor.courses.push(course._id);
      await insutructor.save();
      res.send('Course assigned');
    } catch (err) {
      res.send(err.message);
    }
  });

router
  .route('/deleteCourse')
  .post(verify, authrization.hod, validation.hodDeleteCourseValidation, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const course = await Course.findOne({ id: req.body.courseId });
      const insutructor = await User.findOne({ id: req.body.insutructorId });

      if (user.departement != insutructor.departement + '') {
        throw new Error('Insutructor and HOD should be from the same department');
      }

      if (!insutructor.courses.includes(course._id)) {
        throw new Error("Insutructor Doesn't have this course");
      }

      insutructor.courses = insutructor.courses.filter((id) => id != course._id + '');

      await insutructor.save();
      res.send('Course Deleted');
    } catch (err) {
      res.send(err.message);
    }
  });

router
  .route('/updateCourse')
  .post(verify, authrization.hod, validation.hodUpdateCourseValidation, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const oldCourse = await Course.findOne({ id: req.body.oldCourseId });
      const newCourse = await Course.findOne({ id: req.body.newCourseId });
      const insutructor = await User.findOne({ id: req.body.insutructorId });

      if (user.departement != insutructor.departement + '') {
        throw new Error('Insutructor and HOD should be from the same department');
      }

      if (!newCourse.departement.includes(insutructor.departement)) {
        throw new Error("Insutructor can't be assigned to a course from another department");
      }

      if (!insutructor.courses.includes(oldCourse._id)) {
        throw new Error("Insutructor Doesn't have this course");
      }

      insutructor.courses = insutructor.courses.filter((id) => id != oldCourse._id + '');

      insutructor.courses.push(newCourse._id);

      await insutructor.save();
      res.send('Course update');
    } catch (err) {
      res.send(err.message);
    }
  });

router.route('/departmentStaff').get(verify, authrization.hod, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const users = await User.find({ departement: user.departement });

    const profiles = await Promise.all(Array.prototype.map.call(users, (u) => fillUser(u)));

    res.json(profiles);
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/courseStaff/:courseId').get(verify, authrization.hod, async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.courseId });
    if (course == null) {
      throw new Error("Can't find this course");
    }
    const users = await User.find().then((users) => {
      return users.filter((user) => user.courses.includes(course._id));
    });

    const profiles = await Promise.all(Array.prototype.map.call(users, (u) => fillUser(u)));

    res.json(profiles);
  } catch (err) {
    res.send(err.message);
  }
});

async function fillUser(user) {
  const department = await Department.findOne({ _id: user.departement });
  const faculty = await Faculty.findOne({ _id: user.faculty });

  if (user.courses == null || user.courses == undefined) {
    user.courses = [];
  }
  const courses = await Promise.all(
    Array.prototype.map.call(user.courses, (id) => Course.findOne({ _id: id }).then((c) => c.id)),
  );

  if (user.coursesCoordintated == null || user.coursesCoordintated == undefined) {
    user.coursesCoordintated = [];
  }
  const coursesCoordintated = await Promise.all(
    Array.prototype.map.call(user.coursesCoordintated, (id) =>
      Course.findOne({ _id: id }).then((c) => c.id),
    ),
  );

  const schedule = await Promise.all(
    Array.prototype.map.call(user.schedule, (s) =>
      Promise.all([
        Course.findOne({ _id: s.course }).then((c) => c.id),
        Location.findOne({ _id: s.location }).then((l) => l.name),
      ]).then((arr) => {
        return {
          _id: s.id,
          day: s.day,
          slot: s.slot,
          course: arr[0],
          location: arr[1],
          type: s.type,
        };
      }),
    ),
  );

  const officeLocation = Location.findOne({ _id: user.officeLocation })
    .then((l) => l.name)
    .catch((err) => console.log('user office location is null'));

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    userType: user.userType,
    officeLocation: officeLocation,
    personalDetails: user.personalDetails,
    courses: courses,
    coursesCoordintated: coursesCoordintated,
    isNew: user.new,
    daysOff: user.daysOff,
    annualLeaves: user.annualLeaves,
    accidentalLeaves: user.accidentalLeaves,
    departement: department.name,
    faculty: faculty.name,
    schedule: schedule,
  };
}

router.route('/staffDaysOff').get(verify, authrization.hod, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const users = await User.find({ departement: user.departement });

    const profiles = Array.prototype.map.call(users, (u) => {
      return {
        user: u.id,
        userName: u.name,
        daysOff: u.daysOff,
      };
    });

    const id = req.query.id;
    if (id) {
      const profile = profiles.filter((p) => p.user == id)[0];
      if (profile) {
        res.json(profile);
      } else {
        throw new Error("Can't find this staff memmber in your department");
      }
    } else {
      res.json(profiles);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/staffRequests').get(verify, authrization.hod, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const requests = await Request.find().or([
      { departement: user.departement, type: 'Change day off' },
      { departement: user.departement, type: 'MLeave' },
      { departement: user.departement, type: 'SLeave' },
      { departement: user.departement, type: 'Annual Leave' },
      { departement: user.departement, type: 'ALeave' },
      { departement: user.departement, type: 'Compensation' },
    ]);

    const reqs = await Promise.all(
      Array.prototype.map.call(requests, (request) => {
        return Promise.all([
          Department.findOne({ _id: request.departement }),
          User.findOne({ _id: request.senderId }),
        ]).then((prs) => {
          return {
            id: request.id,
            departement: {
              id: prs[0]._id,
              name: prs[0].name,
            },
            type: request.type,
            sender: {
              id: prs[1].id,
              name: prs[1].name,
            },
            reason: request.reason,
            status: request.status,
            comment: request.comment,
            day: request.day,
            dayToBeReplaced: request.dayToBeReplaced,
            dayOfTheLeave: request.dayOfTheLeave,
          };
        });
      }),
    );

    const id = req.query.id;
    if (id) {
      const request = reqs.filter((p) => p.sender.id == id)[0];
      if (request) {
        res.json(request);
      } else {
        throw new Error('No requests for this user');
      }
    } else {
      res.json(reqs);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/courseTeachingassignments').post(verify, authrization.hod, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const users = await User.find({ departement: user.departement });
    const course = await Course.findOne({ id: req.body.courseId });

    if (!course) {
      throw new Error('This course doesnt exist');
    }

    if (!course.departement.includes(user.departement)) {
      throw new Error('This course is not in your department');
    }

    const asssignments = await Promise.all(
      Array.prototype.map.call(users, async (u) => {
        return {
          user: u.id,
          assignments: await Promise.all(
            u.schedule
              .filter((slot) => slot.course == course._id + '')
              .map(async (slot) => {
                return await Location.findById(slot.location).then((location) => {
                  return {
                    day: slot.day,
                    slot: slot.slot,
                    course: course.name,
                    location: location.name,
                    type: slot.type,
                  };
                });
              }),
          ),
        };
      }),
    );

    res.json(asssignments);
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/courseCoverage').get(verify, authrization.hod, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const users = await User.find({ departement: user.departement });
    const courses = await Course.find().then((cs) =>
      Array.prototype.filter.call(cs, (course) => course.departement.includes(user.departement)),
    );

    const courseCoverage = Array.prototype.map.call(courses, (course) => {
      const slotsCount = course.slots.length;
      var slotsReal = 0;
      Array.prototype.forEach.call(users, (u) => {
        slotsReal += u.schedule.filter((slot) => slot.course == course._id + '').length;
      });

      var coverage = ((slotsReal * 1.0) / slotsCount) * 100;
      if (coverage == Infinity) {
        coverage = 100;
      }

      return {
        id: course.id,
        coverage: coverage + '%',
      };
    });

    res.json(courseCoverage);
  } catch (err) {
    res.send(err.message);
  }
});

router
  .route('/rejectRequest')
  .post(verify, authrization.hod, validation.hodRejectRequestValidation, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const request = await Request.findOne({ id: req.body.requestId });

      if (user.departement + '' != request.departement + '') {
        throw new Error('This request is not from your depertament');
      }

      if (
        request.type != 'Change day off' &&
        request.type != 'MLeave' &&
        request.type != 'SLeave' &&
        request.type != 'ALeave' &&
        request.type != 'Annual Leave' &&
        request.type != 'Compensation'
      ) {
        throw new Error("You can't handle this type of requests");
      }

      if (request.status != 'Pending') {
        throw new Error('This request is already ' + request.status);
      }

      request.status = 'Rejected';
      request.comment = req.body.comment;
      await request.save();

      res.send('Request rejected');
    } catch (err) {
      res.send(err.message);
    }
  });

router
  .route('/acceptRequest')
  .post(verify, authrization.hod, validation.hodAcceptRequestValidation, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const request = await Request.findOne({ id: req.body.requestId });
      const sender = await User.findOne({ _id: request.senderId });

      if (user.departement + '' != request.departement + '') {
        throw new Error('This request is not from your depertament');
      }

      if (request.status != 'Pending') {
        throw new Error('This request is already ' + request.status);
      }

      if (
        request.type != 'Change day off' &&
        request.type != 'MLeave' &&
        request.type != 'SLeave' &&
        request.type != 'ALeave' &&
        request.type != 'Annual Leave' &&
        request.type != 'Compensation'
      ) {
        throw new Error("You can't handle this type of requests");
      }

      if (request.type == 'Annual Leave') {
        if (sender.annualLeaves < 1) {
          throw new Error("This user doesn't have any annual leaves remaining");
        }
        sender.annualLeaves = sender.annualLeaves - 1;
        await sender.save();
      } else if (request.type == 'ALeave') {
        if (sender.annualLeaves < 1 || sender.accidentalLeaves < 1) {
          throw new Error("This user doesn't have any annual or accedental leaves remaining");
        }
        sender.annualLeaves = sender.annualLeaves - 1;
        sender.accidentalLeaves = sender.accidentalLeaves - 1;
        await sender.save();
      } else if (request.type == 'Change day off') {
        const daysOff = [];
        for (i = 0; i < sender.daysOff.length; i++) {
          if (sender.daysOff[i] == request.dayToBeReplaced) {
            daysOff.push(request.day);
          } else {
            daysOff.push(sender.daysOff[i]);
          }
        }
        sender.daysOff = daysOff;
        await sender.save();
      }

      request.status = 'Accepted';
      await request.save();
      res.send('Request Accepted');
    } catch (err) {
      res.send(err.message);
    }
  });

module.exports = router;
