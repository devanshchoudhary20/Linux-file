import { FaBath, FaBed, FaHouseUser, FaLeaf, FaUtensils, FaTshirt, FaCouch } from 'react-icons/fa';
import { FaPartyHorn, FaInbox, FaListCheck } from 'react-icons/fa6';
import { GiPartyPopper } from "react-icons/gi";



//REPAT--> OPTIONS constant


export const REPEAT_OPTIONS = (option) => {
    switch (option) {
      case 'Never':
        return { frequency: null, dayOfWeek: [], intervals: {interval : ''} };
      case 'Daily':
        return { frequency: 1, dayOfWeek: [], intervals: {interval : 'Day'} };
      case 'Every week':
        return { frequency: 1, dayOfWeek: [1], intervals: {interval :'Week'} };
      case 'Every 2 weeks':
        return { frequency: 2, dayOfWeek: [1], intervals: {interval :'Week'} };
      case 'Every month':
        return { frequency: 1, dayOfWeek: [], intervals: {interval :'Month'} };
      case 'Every 3 months':
        return { frequency: 3, dayOfWeek: [], intervals: {interval :'Month'} };
      case 'Every 6 months':
        return { frequency: 6, dayOfWeek: [], intervals: {interval :'Month'} };
      default:
        return { frequency: null, dayOfWeek: [], intervals: '' };
    }
};

//emptyTask State
 
export const emptyTask = {
  title: '',
  subtitle : '',
  room: '',
  owner: 'Devansh Choudhary',
  isCompleted: false,
  startDate : 0,
  checklist: [],
  repeat: { frequency: 0, dayOfWeek: 0, intervals: '' },
  reminder: 0,
  createdAt: 0,
  completionDate: 0
};

//ROOMS constant



export const ROOMS = [
    { name: 'Bathroom', icon: <FaBath />, color: 'bg-emerald-400' },
    { name: 'Bedroom', icon: <FaBed />, color: 'bg-blue-400' },
    { name: 'Entire Home', icon: <FaHouseUser />, color: 'bg-green-400' },
    { name: 'Garden', icon: <FaLeaf />, color: 'bg-green-400' },
    { name: 'Kitchen', icon: <FaUtensils />, color: 'bg-yellow-400' },
    { name: 'Laundry', icon: <FaTshirt />, color: 'bg-purple-400' },
    { name: 'Living Room', icon: <FaCouch />, color: 'bg-red-400' },
  ];


// STATUS_MESSAGES constant


export const STATUS_MESSAGES = [
  { name: 'TODAY', icon: <FaListCheck />, color: 'text-blue-500' },
  { name: 'ALL FINE', icon: <GiPartyPopper />, color: 'text-green-500' },
  { name: 'NO TASKS', icon: <FaInbox />, color: 'text-gray-500' }
  
];

//InitialState of the app

//user Initial State



const currentDate = Date.now();
const completionDate = Date.now();
export const initialState = {
    places : 
    [
        {
            name : 'New Home',
            tasks : [
                {
                    id : Math.ceil(Math.random()*10)+currentDate,
                    title : 'Clean Dishes',
                    subtitle : '',
                    room : 'Kitchen',
                    owner : 'Devansh Choudhary',
                    isCompleted : false,
                    startDate : currentDate,
                    checklist : [
                        {
                            text : 'Do this',
                            completed : false,
                            
                        },
                        {
                          text : 'Dont do this',
                          completed : true
                        },
                        {
                          text : 'Dont do that',
                          completed : true
                        }
                    ],
                    
                    repeat : REPEAT_OPTIONS('Every week'),
                    reminder : '9:30 am',
                    createdAt : currentDate,
                    completionDate : completionDate
                },
                {
                    id : Math.ceil(Math.random()*10)+currentDate,
                    title : 'Pay Elec Bills',
                    subtitle : 'pay bills at any cost',
                    room : 'Entire Home',
                    owner : 'Devansh Choudhary',
                    isCompleted : false,
                    checklist : [
                        {
                          text : 'Do this',
                          completed : false,
                        },
                        {
                          text : 'Do that',
                          completed : false
                        },
                        {
                          text : 'Do nothing',
                          completed : false
                        }
                    ],
                    repeat : REPEAT_OPTIONS('Every month'),
                    reminder : '5:30 pm',
                    createdAt : currentDate,
                    completionDate : completionDate
                }

            ]
        }  
    ]
};
