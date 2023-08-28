import React, { useEffect, useRef } from 'react';
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
  const data = useRef<{ [key: number]: string }>(initialData.reduce((acc, curr, index) => ({...acc, [index + 1]: curr}), {})).current;

  const timestampToDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff/oneDay);
    return day;
  }

  async function getUserWorkouts(userId: string) {
    const userDocRef = doc(db, "users", userId);
    const workoutCollectionRef = collection(userDocRef, "workouts");
    const workoutsSnapshot = await getDocs(workoutCollectionRef);
    const workouts: Array<any> = []
    workoutsSnapshot.docs.forEach((doc) => {
      workouts.push(doc.data());
    });
    return workouts;
  }

  useEffect(() => {
    getUserWorkouts(user.uid).then((workouts) => {
      workouts.forEach((workout) => {
        const day = timestampToDay(workout.date.seconds)
        data[day] = '#1d60cc'; // this change should persist across re-renders now.
      });
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100vw', maxWidth: '100%' }}>
      {Object.entries(data).map(([day, color], index) => (
        <div
          key={index}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            margin: '1px',
            borderRadius: '20%',
          }}
        ></div>
      ))}
    </div>
  );
}

export default HeatMap;