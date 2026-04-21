import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

export interface WaitlistEntry {
  name: string;
  email: string;
  phone: string;
  currentStage: 'Student' | 'Beginner' | 'Self-Taught Builder' | 'Working Professional';
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  fields: string[];
  availability: 'Daily' | '3-4 Times / Week' | 'Weekends Only';
  reason: string;
  tos: boolean;
  status: 'pending';
  createdAt: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class WaitlistService {
  private firestore = inject(Firestore);

  submitWaitlist(data: Omit<WaitlistEntry, 'status' | 'createdAt'>) {
    const waitlistCollection = collection(this.firestore, 'waitlist');
    return addDoc(waitlistCollection, {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  }
}
