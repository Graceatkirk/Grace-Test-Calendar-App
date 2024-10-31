import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; // Example import
import 'react-calendar/dist/Calendar.css';

const EventCalendar = () => {
    const [holidays, setHolidays] = useState([]);
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/holidays');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHolidays(data.holidays);
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        };

        fetchHolidays();
    }, []);

    // Function to determine if a date is a holiday
    interface Holiday {
      name: string;
      date: string;
    }

    const isHoliday = (date: Date): boolean => {
      const dateString = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      return holidays.some((holiday: Holiday) => holiday.date === dateString);
    };

    return (
        <div>
            <h1>Holidays Calendar</h1>
            <Calendar
                onChange={setValue}
                value={value}
                tileClassName={({ date }) => (isHoliday(date) ? 'holiday' : null)} // Apply a class for holidays
            />
            <ul>
                {holidays.map((holiday, index) => (
                    <li key={index}>{holiday.name} - {holiday.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventCalendar;
