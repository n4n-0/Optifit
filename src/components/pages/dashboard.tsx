import React, { useState, useEffect } from 'react';
import { signOut, auth, db, doc } from '../../firebase'
import { collection, setDoc, getDocs, addDoc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



import NavMenu from '../ui/navigationmenu';
import HeatMap from '../ui/heatmap';
import WorkoutTable from '../ui/workouttable';

const Dashboard = ({ user }) => {
  const [date, setDate] = useState(new Date());
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const docRef = doc(db, "users", user.uid);

    const q = query(collection(docRef, "workouts"), where("date", "==", date));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docData = snapshot.docs[0];

      const exerciseCollectionRef = collection(docData.ref, "exercises");

      await addDoc(exerciseCollectionRef, {
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight
      });
    } else {
      const worksoutsCollectionRef = collection(docRef, "workouts");
      const newWorkoutRef = doc(worksoutsCollectionRef);
      await setDoc(newWorkoutRef, {
        date: date
      });

      const exerciseCollectionRef = collection(newWorkoutRef, "exercises");
      await addDoc(exerciseCollectionRef, {
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight
      });
      
    }
  }
  
  const logout = async () => {
    console.log()
    try {
      await signOut(auth);
      toast(`You have been logged out.`, {
        position: "bottom-right",
        type: "success",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    } catch (error) {
      console.error(error);
      toast("Error logging out.", {
        position: "bottom-right",
        type: "error",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }
  
  return (
    <div>
      <div className="flex flex-col h-screen w-screen bg-zinc-900">
        <NavMenu />
        <div className="ml-20 mr-20">
          <HeatMap user={user} />
        </div>
        <div className='mt-20 ml-20 mr-20'>
          <WorkoutTable user={user} />
        </div>
        <div className="relative h-full">
          <Dialog>
            <DialogTrigger asChild><Button className="absolute bottom-3 left-3">+</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="w-full p-2 text-center">Add a workout</DialogTitle>
                <DialogDescription>
                  <p className="text-center">Add an exercise to you log</p>
                </DialogDescription>
              </DialogHeader>
              <div className="w-full p-2 mb-2">
                <Input className="mb-2" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <Input className="mb-2" label="Exercise" placeholder="Exercise Name" type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />
                <Label className="mb-2 pl-1">Sets</Label>
                <Input className="mb-2" label="Sets" placeholder="Sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
                <Label className="mb-2 pl-1">Reps</Label>
                <Input className="mb-2" label="Reps" placeholder="Weight" type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
                <Label className="mb-2 pl-1">Weight</Label>
                <Input className="mb-2" label="Weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <Button type="submit" onClick={handleSubmit} className="w-full p-2 mt-2">Add</Button>
              </div>
            </DialogContent>
            <DialogFooter>
              
            </DialogFooter>
          </Dialog>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;