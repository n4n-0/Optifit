import React, { useEffect, useRef, useState } from 'react';
import { db, doc } from '../../firebase';
import { collection, setDoc, getDocs } from 'firebase/firestore';

const initialData = Array.from({ length: 365 }, () => '#ede9dd');

interface User {
  displayName: string;
  email: string;
  uid: string;
  username: string;
  isAdmin: boolean;
}

const HeatMap: React.FC<{ user: User }> = ({user}) => {
  const [data, setData] = useState(() => initialData.reduce((acc, curr, index) => ({...acc, [index + 1]: curr}), {}));

  const dayOfYear = (date: Date) => {
    // Start of the year - 0 hours, 0 minutes, 0 seconds
    var start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
    // Considering now time in your date - subtract start of the day from your date
    var diff = date.getTime() - start.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }
  const dateStringToDay = (dateString: string) => {
    console.log(dateString);
    const date = new Date(dateString);
    console.log(date)
    console.log(dayOfYear(date))
    return dayOfYear(date);
  }

  async function getUserWorkouts(userId: string) {
    const userDocRef = doc(db, "users", userId);
    const workoutCollectionRef = collection(userDocRef, "workouts");
    const workoutsSnapshot = await getDocs(workoutCollectionRef);
    const workouts: Array<any> = []
    for (let doc of workoutsSnapshot.docs) {
      const workout = doc.data();
      const exerciseSnapshot = await getDocs(collection(doc.ref, "exercises"));
      const exercises: Array<any> = [];
      exerciseSnapshot.docs.forEach((doc) => {
        exercises.push(doc.data());
      });
      workout.exercises = exercises;
      workouts.push(workout);
    };
    return workouts;
  }

  useEffect(() => {
    getUserWorkouts(user.uid).then((workouts) => {
      workouts.forEach((workout) => {
        const day = dateStringToDay(workout.date);
        setData(prevData => ({ ...prevData, [day]: '#1d60cc' })); // async state update
      });
    });
  }, [user]); // Added 'user' as a dependency

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100vw', maxWidth: '100%' }}>
      {Object.entries(data).map(([day, color], index) => (
        <div
          key={index}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            margin: '2px',
            borderRadius: '15%',
            boxShadow: color === '#1d60cc' ? '0 0 10px #1d60cc, 0 0 5px #1d60cc' : 'none'
          }}
        ></div>
      ))}
    </div>
  );
}

export default HeatMap;