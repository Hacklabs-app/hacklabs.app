import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, doc, getDoc, setDoc, serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WaitlistService {
  private readonly firestore = inject(Firestore);
  private readonly platformId = inject(PLATFORM_ID);

  async checkExists(email: string): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) return false;

    const emailId = email.toLowerCase().trim();
    console.log('[WaitlistService] Checking if user exists:', emailId);
    
    try {
      const docRef = doc(this.firestore, 'waitlist', emailId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error('[WaitlistService] checkExists error details:', error);
      throw error;
    }
  }

  async submitWaitlist(data: Record<string, unknown> & { email: string }) {
    if (!isPlatformBrowser(this.platformId)) return;

    const emailId = data.email.toLowerCase().trim();
    console.log('[WaitlistService] Submitting for ID:', emailId);
    
    try {
      const docRef = doc(this.firestore, 'waitlist', emailId);
      await setDoc(docRef, {
        ...data,
        email: emailId,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      console.log('[WaitlistService] Submission successful');
    } catch (error) {
      console.error('[WaitlistService] Submission error details:', error);
      throw error;
    }
  }
}
