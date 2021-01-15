const router = require('express').Router();
const Attendance = require(`./../models/attendance`);
const verify = require('./verifyToken');
const Users = require(`./../models/users`);
const Request = require(`./../models/requests`);

const { errorMonitor } = require('stream');
const { date } = require('@hapi/joi');
const schemas = require('./schemas');
const middleware = require('./mid');
var bodyParser = require('body-parser');
//router.use(cors());
router.route('/viewStaffAttendance').post(verify, async (req, res) => {
  try {
    if (!(req.user.role === 'HR')) return res.status(400).send('Not Authorized');

    let user = await Users.findOne({ id: req.body.id });
    if (!user) res.status(400).send('There is no user with this id ');
    console.log(user);
    let attendance = await Attendance.find({ user: user._id });
    if (attendance == null) throw new Error('This staff member has no attendance records');
    res.json({ status: 'success', data: { Attendance: attendance } });
  } catch (err) {
    res.send(err.message);
  }
});

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

router.route('/viewMissingHours').post(verify, async (req, res) => {
  try {
    if (!(req.user.role === 'HR')) return res.status(400).send('Not Authorized');

    const hourPerDay = 504;
    let user = await Users.findOne({ id: req.body.id });
    console.log(user.id);
    let attendance = await Attendance.find({ user: user._id });
    let x = new Date();
    let numberOfDaysAfterMonth = 0;
    let totalHours = 0;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let unique = [];
    var dayName = days[x.getDay()];
    let daysOff = user.daysOff;
    let count = 0;
    let missingDays = 0;
    let res1 = 0;

    if (x.getDate() < 11) {
      console.log('Iammmm here ');

      if (attendance) {
        let arr = attendance.filter((element) => {
          return (
            element.date.getFullYear() == x.getFullYear() &&
            element.date.getMonth() == x.getMonth() &&
            element.date.getDate() <= 11 &&
            !daysOff.includes(days[element.getDay()])
          );
        });
        for (let i = 0; i < arr.length; i++) {
          totalHours += arr[i].totalHours;
        }
        let res = 0;
        for (let i = 1; i < arr.length; i++) {
          let j = 0;
          for (j = 0; j < i; j++) {
            if (arr[i].date == arr[j].date) break;
          }
          if (i == j) res++;
        }
      }
      let numberOfDays = x.getDate() - 11;
      console.log('Attendance length is :' + attendance.length);
      if (attendance.length > 0) {
        attendance = attendance.filter((element) => {
          return (
            element.date.getFullYear() == x.getFullYear() &&
            element.date.getMonth() == x.getMonth() - 1 &&
            element.date.getDate() >= 11 &&
            !daysOff.includes(days[element.getDay()])
          );
        });
        for (let i = 1; i < attendance.length; i++) {
          let j = 0;
          for (j = 0; j < i; j++) {
            if (attendance[i].date == attendance[j].date) break;
          }
          if (i == j) res1++;
        }
        for (let i = 0; i < attendance.length; i++) {
          totalHours += attendance[i].totalHours;
        }
      }
      console.log('okay');
      count += res + res1;
      console.log(count);
      missingDays = daysInMonth(x.getFullYear(), x.getMonth() + 1) - count;
    } else {
      if (attendance.length > 0) {
        console.log('A77777777A');
        // console.log(attendance);
        attendance = attendance.filter((element) => {
          console.log(days[element.date.getDay()]);
          return (
            element.date.getFullYear() == x.getFullYear() &&
            element.date.getMonth() == x.getMonth() &&
            element.date.getDate() >= 11 &&
            !daysOff.includes(days[element.date.getDay()])
          );
        });
        console.log(attendance);
        let res1 = 0;
        for (let i = 1; i < attendance.length; i++) {
          let j = 0;
          for (j = 0; j < i; j++) {
            if (attendance[i].date == attendance[j].date) break;
          }
          if (i == j) res1++;
        }
        for (let i = 0; i < attendance.length; i++) {
          if (attendance[i].totalHours) totalHours += attendance[i].totalHours;
        }
        console.log(totalHours);
        console.log(attendance);

        count += res1;
      }

      let leaves = await Request.find({
        senderId: user._id,
        status: 'Accepted',
      });
      console.log(leaves);

      if (leaves) {
        leaves = leaves.filter((element) => {
          if (leaves.dayOfTheLeave) return element.dayOfTheLeave.getMonth() == x.getMonth();
        });

        if (leaves) {
          missingDays =
            daysInMonth(x.getFullYear(), x.getMonth() + 1) -
            count -
            daysOff.length * 4 -
            leaves.length;
        } else {
          missingDays = daysInMonth(x.getFullYear(), x.getMonth() + 1) - count - daysOff.length * 4;
        }
      }
    }
    let missingHours = 0;
    let extraHours = 0;
    missingHours = count * 504 - totalHours;
    console.log(totalHours);
    if (missingHours < 0) {
      extraHours = missingHours * -1;
      missingHours = 0;
    }
    console.log(missingHours);
    let deduction = missingHours * (user.salary / (180 * 60));
    deduction = deduction + missingDays * (user.salary / 60);

    res.json({
      status: 'Success',
      totalHours: totalHours / 60,
      missingHours: missingHours / 60,
      numberOfDays: count,
      missingDays: missingDays,
      extraHours: extraHours,
      deduction: deduction,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/UpdateSalary').post(verify, middleware(schemas.updatesalary), async (req, res) => {
  try {
    if (!(req.user.role === 'HR')) return res.status(400).send('Not Authorized');

    let user = await Users.findOne({ id: req.body.id });
    if (!user) {
      return res.status(400).send('There is no user with this id');
    }
    if (user._id == req.user._id)
      return res
        .status(400)
        .send('OFCOURSE You cannot update your salary head to another HR to update it  ');
    if (!(req.user.role === 'HR')) return res.status(400).send('not Authorized');
    await Users.update({ id: req.body.id }, { $set: { salary: req.body.salary } });

    res.json({ status: 'successflly Updated' });
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/AddSignin').post(verify, middleware(schemas.signBody), async (req, res) => {
  try {
    if (!(req.user.role === 'HR')) return res.status(400).send('Not Authorized');
    let user = await Users.findOne({ id: req.body.id });
    if (!user) {
      return res.status(400).send('There is no user with this id');
    }
    if (user._id == req.user._id) return res.status(400).send('You cannot add sigIn to yourself ');
    var x = new Date(new Date().getFullYear(), req.body.month - 1, req.body.day);

    x = new Date(x.setHours(2, 0, 0, 0));
    console.log(x);
    if (user) {
      //        console.log(Object.keys(attendance).length)

      let att = new Attendance({
        user: user._id,
        signIn: {
          month: req.body.month,
          day: req.body.day,
          hour: req.body.hour,
        },
        date: x,
      });
      await att.save();
      res.send('Successfully Added');
    } else {
      throw new Error('User id is Wrong');
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/AddsignOut').post(verify, middleware(schemas.signBody), async (req, res) => {
  try {
    if (!(req.user.role === 'HR')) return res.status(400).send('Not Authorized');
    let user = await Users.findOne({ id: req.body.id });
    if (!user) {
      return res.status(400).send('There is no user with this id');
    }

    if (user._id == req.user._id) return res.send('You cannot add signOut to yourself ');
    var x = new Date(new Date().getFullYear(), req.body.month - 1, req.body.day);

    x = new Date(x.setHours(2, 0, 0, 0));
    console.log(x);
    if (user) {
      let attendance = await Attendance.find({
        user: user._id,
        signOut: { $exists: false },
        date: x,
      });
      if (attendance.length > 0) {
        let att_id = attendance[attendance.length - 1]._id;
        let a = attendance[attendance.length - 1].signIn.hour.split(':');
        let arr = req.body.hour.split(':');
        let total =
          (Math.max(arr[0], a[0]) - Math.min(arr[0], a[0])) * 60 +
          (Math.max(arr[1], a[1]) - Math.min(arr[1], a[1]));
        await Attendance.update(
          { _id: att_id },
          {
            $set: {
              signOut: {
                month: req.body.month,
                day: req.body.day,
                hour: req.body.hour,
              },
              totalHours: total,
            },
          },
        );
      } else {
        throw new Error('You cannt signout without signin  this day');
      }
    } else {
      throw new Error('Invalid user id ');
    }
    res.send('Success');
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
