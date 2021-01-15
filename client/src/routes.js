import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import Language from '@material-ui/icons/Language';
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import Registration from 'views/Registration/Registration.js';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import LinkIcon from '@material-ui/icons/Link';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import UserProfile from 'views/UserProfile/UserProfile.js';
import TableList from 'views/TableList/TableList.js';
import Typography from 'views/Typography/Typography.js';
import Icons from 'views/Icons/Icons.js';
import Maps from 'views/Maps/Maps.js';
import NotificationsPage from 'views/Notifications/Notifications.js';
import UpgradeToPro from 'views/UpgradeToPro/UpgradeToPro.js';
import Faculty from 'views/HR/faculty.js';

import Depart from 'views/HR/departement.js';
import Locations from 'views/HR/locations.js';

import Courses from 'views/HR/courses.js';

import updateStaff from 'views/HR/updatestaff.js';
import modifyCourseInstructor from 'views/HOD/mci.js';
import testing from 'views/HOD/test.js';

import viewStaffZ from 'views/HOD/view.js';
import HODREQ from 'views/HOD/HODRequest.js';

import viewSchedule from 'views/sasa/viewSchedule.js';

import Replacment from 'views/sasa/replacment.js';

import viewCourseCoverage from 'views/Instructor/viewCourseCoverage';
import viewSlotAssignments from 'views/Instructor/ViewSlotAssignments';
import viewStaff from 'views/Instructor/viewStaff';
import slotAssignments from 'views/Instructor/slotAssignments';
import courseCoordinators from 'views/Instructor/courseCoordinators';
import slotLinking from 'views/Coordinator/slotLinking';
import courseSlots from 'views/Coordinator/courseSlots';

import Attendance from 'views/HR/viewAtt.js';
import addSignin from 'views/HR/addSignin.js';
import addSignOut from 'views/HR/addSignOut.js';
import updateSalary from 'views/HR/updatedSalary.js';
import MissingHours from 'views/HR/viewMissingHour.js';
// core components/views for RTL layout
import RTLPage from 'views/RTLPage/RTLPage.js';
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'L1ke_M@th';

const verify = require('./views/Login/Auth');

const DR_ROUTES = [
  {
    path: '/viewSchedule',
    name: 'Schedule',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: viewSchedule,
    layout: '/admin',
  },
  {
    path: '/viewReplacements',
    name: 'Staff Request',
    rtlName: 'قائمة الجدول',
    icon: SupervisedUserCircleIcon,
    component: Replacment,
    layout: '/admin',
  },
  {
    path: '/viewCourseCoverage',
    name: "Courses' Coverage",
    rtlName: 'قائمة الجدول',
    icon: EmojiSymbolsIcon,
    component: viewCourseCoverage,
    layout: '/admin',
  },
  {
    path: '/ViewSlotAssignments',
    name: 'Slot Assignments',
    rtlName: 'قائمة الجدول',
    icon: ViewComfyIcon,
    component: viewSlotAssignments,
    layout: '/admin',
  },
  {
    path: '/viewStaff',
    name: 'Staff',
    rtlName: 'قائمة الجدول',
    icon: SupervisedUserCircleIcon,
    component: viewStaff,
    layout: '/admin',
  },
  {
    path: '/slotAssignments',
    name: 'Staff Assignments',
    rtlName: 'قائمة الجدول',
    icon: AssignmentIndIcon,
    component: slotAssignments,
    layout: '/admin',
  },
  {
    path: '/courseCoordinators',
    name: 'Course Coordinators',
    rtlName: 'قائمة الجدول',
    icon: HowToRegIcon,
    component: courseCoordinators,
    layout: '/admin',
  },
  ,
  {
    path: '/viewAttendance',
    name: 'Attendance',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Attendance,
    layout: '/admin',
  },
  {
    path: '/missingHour',
    name: 'Missing Hours',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: MissingHours,
    layout: '/admin',
  },
];

const TA_ROUTES = [
  {
    path: '/viewSchedule',
    name: 'Schedule',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: viewSchedule,
    layout: '/admin',
  },
  {
    path: '/viewReplacements',
    name: 'Staff Request',
    rtlName: 'قائمة الجدول',
    icon: SupervisedUserCircleIcon,
    component: Replacment,
    layout: '/admin',
  },
  {
    path: '/viewAttendance',
    name: 'Attendance',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Attendance,
    layout: '/admin',
  },
  {
    path: '/missingHour',
    name: 'Missing Hours',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: MissingHours,
    layout: '/admin',
  },
];

const HOD_ROUTES = [
  {
    path: '/viewSchedule',
    name: 'Schedule',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: viewSchedule,
    layout: '/admin',
  },
  {
    path: '/viewReplacements',
    name: 'Staff Request',
    rtlName: 'قائمة الجدول',
    icon: SupervisedUserCircleIcon,
    component: Replacment,
    layout: '/admin',
  },
  {
    path: '/modifyCourseInstructor',
    name: 'ModifyCourseInstructor',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: modifyCourseInstructor,
    layout: '/admin',
  },
  {
    path: '/viewStaff',
    name: 'Staff Courses',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: viewStaffZ,
    layout: '/admin',
  },
  {
    path: '/Leave_DayOff_Request',
    name: 'Leave DayOff Request',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: HODREQ,
    layout: '/admin',
  },
  {
    path: '/viewAttendance',
    name: 'Attendance',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Attendance,
    layout: '/admin',
  },
  {
    path: '/missingHour',
    name: 'Missing Hours',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: MissingHours,
    layout: '/admin',
  },
];
const CC_ROUTES = [
  {
    path: '/viewSchedule',
    name: 'Schedule',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: viewSchedule,
    layout: '/admin',
  },
  {
    path: '/viewReplacements',
    name: 'Staff Request',
    rtlName: 'قائمة الجدول',
    icon: SupervisedUserCircleIcon,
    component: Replacment,
    layout: '/admin',
  },
  {
    path: '/slotLinking',
    name: 'Slot Linking',
    rtlName: 'قائمة الجدول',
    icon: LinkIcon,
    component: slotLinking,
    layout: '/admin',
  },
  {
    path: '/courseSlots',
    name: 'Course Slots',
    rtlName: 'قائمة الجدول',
    icon: AutorenewIcon,
    component: courseSlots,
    layout: '/admin',
  },
  ,
  {
    path: '/viewAttendance',
    name: 'Attendance',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Attendance,
    layout: '/admin',
  },
  {
    path: '/missingHour',
    name: 'Missing Hours',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: MissingHours,
    layout: '/admin',
  },
];

const HR_ROUTES = [
  {
    path: '/registeration',
    name: 'Register',
    rtlName: 'پشتیبانی از راست به چپ',
    icon: Person,
    component: Registration,
    layout: '/admin',
  },
  {
    path: '/faculty',
    name: 'Modify Faculty',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Faculty,
    layout: '/admin',
  },
  {
    path: '/departement',
    name: 'Modify Departement',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Depart,
    layout: '/admin',
  },
  {
    path: '/locations',
    name: 'Modify Locations',
    rtlName: 'قائمة الجدول',
    icon: ViewComfyIcon,
    component: Locations,
    layout: '/admin',
  },
  {
    path: '/Courses',
    name: 'Modify Courses',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Courses,
    layout: '/admin',
  },
  {
    path: '/updateStaff',
    name: 'Modify Staff',
    rtlName: 'قائمة الجدول',
    icon: SupervisedUserCircleIcon,
    component: updateStaff,
    layout: '/admin',
  },
  ,
  {
    path: '/viewAttendance',
    name: 'Attendance',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Attendance,
    layout: '/admin',
  },
  {
    path: '/addSignin',
    name: 'addSignin',
    rtlName: 'قائمة الجدول',
    icon: LinkIcon,
    component: addSignin,
    layout: '/admin',
  },
  {
    path: '/addSignout',
    name: 'addSignOut',
    rtlName: 'قائمة الجدول',
    icon: LinkIcon,
    component: addSignOut,
    layout: '/admin',
  },
  {
    path: '/missingHour',
    name: 'Missing Hours',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: MissingHours,
    layout: '/admin',
  },
  {
    path: '/updateSalary',
    name: 'UpdateSalary',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: updateSalary,
    layout: '/admin',
  },
];
const token = document.cookie.substring(6);

let verified = '';
if (token.length > 10) {
  verified = jwt.verify(token, TOKEN_SECRET);
}

/**
 *  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
 */

let dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'User Profile',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  /*
 
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }*/
];

if (token.length > 10) {
  console.log(token);

  if (verified.role == 'HR') {
    HR_ROUTES.forEach((element) => {
      dashboardRoutes.push(element);
    });
  }
  if (verified.role == 'DR') {
    DR_ROUTES.forEach((element) => {
      dashboardRoutes.push(element);
    });
  }

  if (verified.role == 'TA') {
    TA_ROUTES.forEach((element) => {
      dashboardRoutes.push(element);
    });
  }

  if (verified.role == 'HOD') {
    HOD_ROUTES.forEach((element) => {
      dashboardRoutes.push(element);
    });
  }

  if (verified.role == 'CC') {
    CC_ROUTES.forEach((element) => {
      dashboardRoutes.push(element);
    });
  }
}
export default dashboardRoutes;
