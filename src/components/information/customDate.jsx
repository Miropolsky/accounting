import { useEffect, useState } from 'react';

export default function CustomDate() {
    const [date, setDate] = useState(dateParse(new Date()));
    useEffect(() => {
        setInterval(() => setDate(dateParse(new Date())), 1000);
    }, []);

    function dateParse(date) {
        let day = date.getDate();
        let month = date.getMonth();
        if (day < 10) {
            day = `{0${day}}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        return `${day}.${month}.${date.getFullYear()} ${date.toLocaleTimeString()}`;
    }

    return <>{date}</>;
}
