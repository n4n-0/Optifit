import React, { useEffect, useState } from 'react';
import { db, doc } from '../../firebase';
import { collection, setDoc, getDocs } from 'firebase/firestore';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface User {
  displayName: string;
  email: string;
  uid: string;
  username: string;
  isAdmin: boolean;
}


const WorkoutTable: React.FC<{ user: User }> = ({user}) => {
  const [workouts, setWorkouts] = useState<Array<any>>([])
  
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

  function formattedDate(rawDate: string) {
     const date = new Date(rawDate);
     const formattedDate = new Intl.DateTimeFormat('en-US', { 
       year: 'numeric', 
       month: 'long', 
       day: '2-digit', 
     }).format(date);
   return formattedDate;
  }

  useEffect(() => {
    async function fetchWorkouts() {
      setWorkouts(await getUserWorkouts(user.uid));
    }
    fetchWorkouts();
    console.log(workouts);
  }, [user]);
  
  return (
    <Table className="">
      <TableCaption>Previous Workouts</TableCaption>
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[100px] text-white hover:bg-transparent">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workouts.map((workout, index) =>
        <TableRow key={index} className="hover:bg-primary/50 data-[state=selected]:bg-muted">
          <TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{formattedDate(workout.date)}</AccordionTrigger>
                <AccordionContent>
                  <p>Total Exercises: {workout.exercises.length}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
        )}
      </TableBody>
    </Table>    
  )
}

export default WorkoutTable