import React,{useState} from 'react'
import './Calendar.css'
const WEEKDAYS = 7;
const Calendar = () => {
  const [currentDate,setCurrentDate] = useState(new Date())

  const PickMonth =(monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[monthIndex];
  };



  const renderDays = () =>{
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year,month,1).getDay();
    const lastDate = new Date(year,month+1,0).getDate();
    const prevLastDate = new Date(year,month,0).getDate();

    let days = [];
    let datecounter = 1;
    let prevMonthCounter = prevLastDate-firstDay+1;
    let nextMonthCounter = 1;
    const totalCells = firstDay + lastDate + (WEEKDAYS - (firstDay + lastDate) % WEEKDAYS) % WEEKDAYS;
    const calendarRows = Math.ceil(totalCells / WEEKDAYS);

    for(let i =0;i<calendarRows;i++){
      let week = [];
      for(let j =0 ; j<WEEKDAYS;j++){
        if(i===0 && j<firstDay){
          week.push(<td key={j} className="prev-month">{prevMonthCounter}</td>)
          prevMonthCounter++;
        }
        else if(datecounter > lastDate){
          week.push(<td key={j} className="next-month">{nextMonthCounter}</td>)
          nextMonthCounter++;
        }
        else {
          week.push(<td key ={j} className='same-month'>{datecounter}</td>)
          datecounter++;
        }
      }
      days.push(<tr>{week}</tr>);
    }
    return days;
  };

  const PrevMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const prevMonthDate = new Date(year,month-1,1);
    setCurrentDate(prevMonthDate);
  };

  const NextMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const nextMonthDate = new Date(year,month+1,1);
    setCurrentDate(nextMonthDate);
  }
  return (
    <div>
      <div className="calendar-container">
        <div className="top-container">
          <div className="previous">
            <img src="./prev.png" alt="" className="previous-icon" onClick={PrevMonth}/>
          </div>
          <div className="datepicker">
            <div className="month-picker">
              {PickMonth(currentDate.getMonth())}
            </div>
            <div className="year-picker">
              {currentDate.getFullYear()}
            </div>
          </div>
          <div className="next">
            <img src="./next.png" alt="" className="next-icon" onClick={NextMonth}/>
          </div>
        </div>
        <div className="bottom-container">
          <table className="calendar-value">
          <thead className="table-head">
              <tr>
                <th className='dayofweek'>Sun</th>
                <th className='dayofweek'>Mon</th>
                <th className='dayofweek'>Tue</th>
                <th className='dayofweek'>Wed</th>
                <th className='dayofweek'>Thu</th>
                <th className='dayofweek'>Fri</th>
                <th className='dayofweek'>Sat</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {renderDays()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Calendar