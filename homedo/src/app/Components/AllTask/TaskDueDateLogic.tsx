import { MdAccessTime, MdOutlineCheckBox, MdNotifications, MdPerson } from 'react-icons/md';
import { LiaCalendarSolid, LiaCalendarCheck } from "react-icons/lia";

export const taskDueDateLogic = (task : any) => {
    const completedDate = new Date(task.completionDate).getDate();
    const completedMonth = new Date(task.completionDate).getMonth();
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();
  
    const conditions = {
      today: {
        interval: 'Today',
        icon: <LiaCalendarCheck className="w-4 h-4 mr-1" />,
        textColor: 'text-blue-500'
      },
      dueInMonth: {
        interval: `Due in ${Math.abs(currentMonth - completedMonth)} Month`,
        icon: <LiaCalendarSolid className="w-4 h-4 mr-1" />,
        textColor: 'text-green-500'
      },
      overdueMonth: {
        interval: `${Math.abs(currentMonth - completedMonth)} Month Overdue`,
        icon: <MdAccessTime className="w-4 h-4 mr-1" />,
        textColor: 'text-red-500'
      },
      dueInDays: (dateDiff : any) => ({
        interval: dateDiff < 7 ? `Due in ${dateDiff} day` : `Due in ${Math.floor(dateDiff / 7)} week`,
        icon: <LiaCalendarSolid className="w-4 h-4 mr-1" />,
        textColor: 'text-green-500'
      }),
      overdueDays: (dateDiff: any) => ({
        interval: dateDiff < 7 ? `${dateDiff} day` : `Overdue ${Math.floor(dateDiff / 7)} week`,
        icon: <MdAccessTime className="w-4 h-4 mr-1" />,
        textColor: 'text-red-500'
      }),
      overdueMonths: (months: any) => ({
        interval: `Overdue ${Math.abs(months)} Month`,
        icon: <MdAccessTime className="w-4 h-4 mr-1" />,
        textColor: 'text-red-500'
      }),
      dueInMonths: (months: any) => ({
        interval: `Due in ${Math.abs(months)} Month`,
        icon: <LiaCalendarSolid className="w-4 h-4 mr-1" />,
        textColor: 'text-green-500'
      })
    };
  
    if (completedDate === currentDate && currentMonth === completedMonth) {
      return conditions.today;
    } else if (completedDate === currentDate && completedMonth > currentMonth) {
      return conditions.dueInMonth;
    } else if (completedDate === currentDate && completedMonth < currentMonth) {
      return conditions.overdueMonth;
    } else if (completedDate > currentDate) {
      const dateDiff = completedDate - currentDate;
      if (currentMonth === completedMonth) {
        return conditions.dueInDays(dateDiff);
      } else if (currentMonth > completedMonth) {
        return conditions.overdueMonths(currentMonth - completedMonth);
      } else {
        return conditions.dueInMonths(completedMonth - currentMonth);
      }
    } else {
      const dateDiff = Math.abs(completedDate - currentDate);
      if (currentMonth === completedMonth) {
        return conditions.overdueDays(dateDiff);
      } else if (completedMonth > currentMonth) {
        return conditions.dueInMonths(completedMonth - currentMonth);
      } else {
        return conditions.overdueMonths(currentMonth - completedMonth);
      }
    }
  };