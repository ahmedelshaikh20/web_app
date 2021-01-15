const router = require('express').Router();
const Attendance = require(`./../models/attendance`);
const verify = require('./verifyToken');
const Users = require(`./../models/users`);
const Request = require(`./../models/requests`);
const { errorMonitor } = require('stream');
const { date } = require('@hapi/joi');
const { MinKey } = require('bson');
const { identifier, CLASS_TYPES } = require('@babel/types');
const { find } = require('../models/users');
const users = require('../models/users');

router.route('/attendance').get(verify, async (req, res) => {
  try {
    console.log(req.user._id);
    const attendance = await Attendance.find({ user: req.user._id });
    if (attendance != null) res.json({ status: 'success', data: { attendance } });
    else throw new Error('We cant Find any Record in the DataBase');
  } catch (err) {
    res.send(err.message);
  }
});
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
router.route('/missingDays').get(verify, async (req, res) => {
  try {
    console.log('helllo');
    const hourPerDay = 504;
    let user = await Users.findOne({ _id: req.user._id });
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
    console.log(user.salary);
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

router.route('/attendanceMonth').post(verify, async (req, res) => {
  try {
    let attendance = await Attendance.find({ user: req.user._id });
    console.log(attendance);
    attendance = attendance.filter((elment) => {
      return elment.date.getMonth() + 1 == req.body.month + '' ? true : false;
    });
    console.log(attendance.length);
    if (attendance.length != 0) res.json({ status: 'success', data: { attendance } });
    else res.status(400).send('We cant Find any Record in the DataBase');
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/signin').post(verify, async (req, res) => {
  try {
    var x = new Date();
    console.log(x);
    let today = {
      month: x.getMonth() + 1 + '',
      day: x.getDate() + '',
      hour: x.getHours() + ':' + x.getMinutes(),
    };
    let attendace = await Attendance.findOne({
      user: req.user._id,
      signOut: { $exists: false },
      date: x.setHours(2, 0, 0, 0),
    });
    // console.log("lol");
    if (today.hour * 1 > 19) throw new Error('You Cannot Signin after 7');
    if (attendace) {
      await Attendance.update(
        { _id: attendace._id },
        {
          $set: {
            signIn: { month: today.month, day: today.day, hour: today.hour },
          },
        },
      );
      res.send('Sign in time Updated');
    } else {
      let ar = new Attendance({
        user: req.user._id,
        signIn: {
          month: today.month,
          day: today.day,
          hour: today.hour,
        },
        date: x.setHours(2, 0, 0, 0),
      });
      console.log(ar);
      await ar.save();
      res.send('You are successfully in');
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.route('/signout').post(verify, async (req, res) => {
  try {
    var x = new Date();

    let today = {
      month: x.getMonth() + 1 + '',
      day: x.getDate() + '',
      hour: x.getHours() + ':' + x.getMinutes(),
    };
    if (x.getHours() * 1 > 19) {
      today.hour = '19:00';
    }
    let attendance = await Attendance.find({
      user: req.user._id,
      date: x.setHours(2, 0, 0, 0),
    });
    console.log(attendance[attendance.length - 1].signOut.length);
    if (!attendance || attendance[attendance.length - 1].signOut.month)
      throw new Error('You should sign in first ');

    let arr = today.hour.split(':');
    let a = attendance[attendance.length - 1].signIn.hour.split(':');

    let total =
      (Math.max(arr[0], a[0]) - Math.min(arr[0], a[0])) * 60 +
      (Math.max(arr[1], a[1]) - Math.min(arr[1], a[1]));
    // console.log(total);
    let att_id = attendance[attendance.length - 1];
    //console.log(att_id);
    await Attendance.update(
      { _id: att_id },
      {
        $set: {
          signOut: { month: today.month, day: today.day, hour: today.hour },
          totalHours: total,
        },
      },
    );

    res.send('You are successfully Out');
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
