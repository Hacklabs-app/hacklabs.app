import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, doc, getDoc, setDoc, serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WaitlistService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  async checkExists(email: string): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId) || !this.firestore) return false;

    const emailId = email.toLowerCase().trim();
    
    try {
      const docRef = doc(this.firestore, 'waitlist', emailId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error('[WaitlistService] checkExists error:', error);
      throw error;
    }
  }

  async submitWaitlist(data: Record<string, unknown> & { email: string }) {
    if (!isPlatformBrowser(this.platformId) || !this.firestore) return;

    const emailId = data.email.toLowerCase().trim();
    
    try {
      const docRef = doc(this.firestore, 'waitlist', emailId);
      await setDoc(docRef, {
        ...data,
        email: emailId,
        status: 'pending',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('[WaitlistService] Submission error:', error);
      throw error;
    }
  }
}
