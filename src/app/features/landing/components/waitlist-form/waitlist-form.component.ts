import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WaitlistService } from '../../../../core/services/waitlist.service';

@Component({
  selector: 'app-waitlist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="join" class="waitlist-section">
      <div class="waitlist-shell">
        <div class="waitlist-header">
          <p class="waitlist-kicker">Join Us</p>
          <h2 class="waitlist-title">Step into the first run</h2>
          <p class="waitlist-copy">Fill this in so we can onboard the right people into Slack, shape the opening cohort, and understand where everyone is starting from.</p>
        </div>

        <div class="waitlist-card">
          
          @if (isSuccess()) {
            <div class="waitlist-success" [class.is-returning]="isReturningUser()">
               <h2 class="waitlist-success-title">
                 {{ isReturningUser() ? "Welcome back." : "You're in." }}
               </h2>
               <p class="waitlist-success-copy">
                 {{ isReturningUser() 
                    ? "You're already on the waitlist! We can't wait to have you." 
                    : "Congrats! You'll get a Slack invite and onboarding details soon." }}
               </p>
               
               <div class="waitlist-success-share">
                 <p>Invite a friend to the run:</p>
                 <button type="button" (click)="copyLink()" class="waitlist-share-btn">
                   {{ copyText() }}
                 </button>
               </div>
            </div>
          }

          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="waitlist-form">
             <div class="waitlist-grid">
                <div class="waitlist-field">
                  <label class="waitlist-label" for="name">Full Name</label>
                  <input type="text" formControlName="name" 
                         id="name"
                         class="waitlist-input"
                         placeholder="Your full name">
                </div>

                <div class="waitlist-field">
                  <label class="waitlist-label" for="email">
                    Email Address
                    <span class="waitlist-label-hint">(Use primary or personal)</span>
                  </label>
                  <input type="email" formControlName="email" 
                         id="email"
                         class="waitlist-input"
                         placeholder="you@example.com">
                </div>
             </div>

             <div class="waitlist-field">
                <label class="waitlist-label" for="phone">Phone / WhatsApp</label>
                <input type="tel" formControlName="phone"
                       id="phone"
                       class="waitlist-input"
                       placeholder="+254...">
             </div>

             <div class="waitlist-field">
                <span class="waitlist-label" id="experience-label">Experience Tier</span>
                <div class="waitlist-chips" role="radiogroup" aria-labelledby="experience-label">
                  @for (level of experienceLevels; track level) {
                    <button type="button" (click)="form.get('experience')?.setValue(level)"
                            [class.is-active]="form.get('experience')?.value === level"
                            class="waitlist-chip">
                      {{level}}
                    </button>
                  }
                </div>
             </div>

             <div class="waitlist-field">
                <span class="waitlist-label" id="tracks-label">Which pillar do you want help with?</span>
                <div class="waitlist-chips" role="group" aria-labelledby="tracks-label">
                  @for (track of learningTracks; track track) {
                    <button
                      type="button"
                      (click)="toggleTrack(track)"
                      [class.is-active]="selectedTracks().includes(track)"
                      class="waitlist-chip">
                      {{ track }}
                    </button>
                  }
                </div>
             </div>

             <div class="waitlist-field">
                <label class="waitlist-label" for="reason">
                  What are you trying to become better at?
                  <span class="waitlist-label-optional">(Optional)</span>
                </label>
                <textarea
                  id="reason"
                  formControlName="reason"
                  class="waitlist-input waitlist-textarea"
                  placeholder="Tell us where you are stuck right now, what you want to understand better, or what kind of builder you want to become."></textarea>
             </div>

             <div class="waitlist-consent">
                <input type="checkbox" formControlName="tos" id="tos" class="waitlist-checkbox">
                <label for="tos" class="waitlist-consent-copy">
                  I understand this is structured and intense, and I am ready to commit at most 10hrs a week to sessions and building.
                </label>
             </div>

             <button type="submit" [disabled]="form.invalid || isLoading()"
                     class="waitlist-submit">
                @if (isLoading()) {
                  <div class="waitlist-spinner"></div>
                } @else {
                  Submit
                }
             </button>
             
             @if (error()) {
               <p class="waitlist-error">{{ error() }}</p>
             }
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      width: 100%;
      display: block;
    }

    .waitlist-section {
      width: 100%;
      padding: 3rem 1.5rem 4rem;
    }

    .waitlist-shell {
      width: min(100%, 46rem);
      margin: 0 auto;
    }

    .waitlist-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .waitlist-kicker {
      margin: 0 0 0.85rem;
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.22em;
    }

    .waitlist-title {
      margin: 0 0 0.6rem;
      font-size: clamp(2.2rem, 6vw, 4.1rem);
      line-height: 1;
      letter-spacing: -0.05em;
      text-transform: uppercase;
    }

    .waitlist-copy {
      margin: 0;
      color: #a8b0b2;
      font-family: var(--font-mono);
    }

    .waitlist-card {
      position: relative;
      overflow: hidden;
      padding: clamp(1.5rem, 4vw, 3rem);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 1.8rem;
      background:
        linear-gradient(180deg, rgba(16, 20, 20, 0.98), rgba(7, 9, 9, 0.96));
      box-shadow:
        0 35px 90px -50px rgba(0, 0, 0, 0.95),
        0 18px 45px -35px rgba(0, 177, 153, 0.35);
    }

    .waitlist-form {
      display: grid;
      gap: 1.5rem;
    }

    .waitlist-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .waitlist-field {
      display: grid;
      gap: 0.75rem;
    }

    .waitlist-label {
      color: #8c9699;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .waitlist-label-optional {
      opacity: 0.5;
      text-transform: none;
      letter-spacing: 0;
      font-size: 0.65rem;
      margin-left: 0.5rem;
    }

    .waitlist-label-hint {
      opacity: 0.6;
      text-transform: none;
      letter-spacing: 0;
      font-size: 0.65rem;
      margin-left: 0.4rem;
      color: var(--color-brand-primary);
    }

    .waitlist-input {
      width: 100%;
      min-height: 3.4rem;
      padding: 0.9rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.03);
      color: #fff;
      font-family: var(--font-mono);
      appearance: none;
    }

    .waitlist-input::placeholder {
      color: #6e777a;
    }

    .waitlist-input:focus {
      border-color: rgba(0, 177, 153, 0.65);
      box-shadow: 0 0 0 4px rgba(0, 177, 153, 0.12);
      outline: none;
    }

    .waitlist-select {
      cursor: pointer;
    }

    .waitlist-textarea {
      min-height: 9rem;
      resize: vertical;
      line-height: 1.7;
    }

    .waitlist-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .waitlist-chip {
      min-height: 2.7rem;
      padding: 0.6rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 999px;
      background: transparent;
      color: #d7ddde;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
    }

    .waitlist-chip:hover,
    .waitlist-chip.is-active {
      border-color: rgba(0, 177, 153, 0.6);
      background: rgba(0, 177, 153, 0.14);
      color: #f4fffe;
    }

    .waitlist-consent {
      display: flex;
      align-items: flex-start;
      gap: 0.9rem;
      padding: 1rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .waitlist-checkbox {
      width: 1rem;
      height: 1rem;
      margin-top: 0.15rem;
      accent-color: var(--color-brand-primary);
    }

    .waitlist-consent-copy {
      color: #9da7a9;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      line-height: 1.7;
    }

    .waitlist-submit {
      width: 100%;
      min-height: 3.6rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      border: 0;
      border-radius: 999px;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(0, 177, 153, 0.88));
      color: #041212;
      font-weight: 850;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 20px 45px -28px rgba(0, 177, 153, 0.85);
    }

    .waitlist-submit:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .waitlist-submit:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .waitlist-spinner {
      width: 1.1rem;
      height: 1.1rem;
      border: 2px solid rgba(4, 18, 18, 0.35);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.85s linear infinite;
    }

    .waitlist-success {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.25rem;
      padding: 2.5rem;
      text-align: center;
      background: linear-gradient(180deg, #00b199, #76f0da);
      color: #041212;
    }

    .waitlist-success.is-returning {
      background: linear-gradient(180deg, #101414, #041212);
      color: #fff;
      border: 2px solid var(--color-brand-primary);
    }

    .waitlist-success-title {
      margin: 0;
      font-size: clamp(2.2rem, 4vw, 3.2rem);
      text-transform: uppercase;
      letter-spacing: -0.04em;
    }

    .waitlist-success-copy {
      margin: 0;
      font-family: var(--font-mono);
      font-weight: 600;
      max-width: 28rem;
      line-height: 1.6;
    }

    .waitlist-success-share {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: center;
    }

    .waitlist-success-share p {
      margin: 0;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.8;
    }

    .waitlist-share-btn {
      min-height: 3rem;
      padding: 0 1.5rem;
      border: 1px solid rgba(4, 18, 18, 0.2);
      border-radius: 999px;
      background: rgba(4, 18, 18, 0.1);
      color: #041212;
      font-family: var(--font-mono);
      font-weight: 700;
      cursor: pointer;
    }

    .waitlist-success.is-returning .waitlist-share-btn {
      border-color: var(--color-brand-primary);
      background: rgba(0, 177, 153, 0.1);
      color: var(--color-brand-primary);
    }

    .waitlist-error {
      margin: 0;
      color: #ff7b8e;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 48rem) {
      .waitlist-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WaitlistFormComponent {
  private fb = inject(FormBuilder);
  private waitlistService = inject(WaitlistService);
  readonly experienceLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;
  readonly learningTracks = [
    'AI/ML',
    'IoT & Robotics',
    'Backend & DevOps'
  ] as const;
  readonly selectedTracks = signal<string[]>([]);
  readonly isLoading = signal(false);
  readonly isSuccess = signal(false);
  readonly isReturningUser = signal(false);
  readonly copyText = signal('Copy Link');
  readonly error = signal<string | null>(null);

  form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    phone: this.fb.nonNullable.control('', [Validators.required]),
    experience: this.fb.nonNullable.control<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate'),
    reason: this.fb.nonNullable.control(''),
    tos: [false, [Validators.requiredTrue]]
  });

  toggleTrack(track: string) {
    this.selectedTracks.update((current) =>
      current.includes(track)
        ? current.filter((item) => item !== track)
        : [...current, track]
    );
  }

  copyLink() {
    navigator.clipboard.writeText('https://hacklabs.app');
    this.copyText.set('Copied!');
    setTimeout(() => this.copyText.set('Copy Link'), 2000);
  }

  async onSubmit() {
    console.log('[WaitlistForm] Form submitted. Valid:', this.form.valid, 'Tracks selected:', this.selectedTracks().length);
    
    if (this.form.invalid || this.selectedTracks().length === 0) {
      console.warn('[WaitlistForm] Validation failed');
      this.error.set('Please complete the form and choose at least one focus area.');
      return;
    }

    this.error.set(null);
    this.isLoading.set(true);

    const formValue = this.form.getRawValue();
    console.log('[WaitlistForm] Data:', formValue);

    try {
      console.log('[WaitlistForm] Checking existence...');
      const exists = await this.waitlistService.checkExists(formValue.email);
      
      if (exists) {
        console.log('[WaitlistForm] User already on list');
        this.isReturningUser.set(true);
        this.isSuccess.set(true);
        return;
      }

      console.log('[WaitlistForm] Proceeding with submission...');
      await this.waitlistService.submitWaitlist({
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        experience: formValue.experience,
        fields: this.selectedTracks(),
        reason: formValue.reason,
        tos: formValue.tos ?? false
      });
      
      console.log('[WaitlistForm] Success');
      this.isReturningUser.set(false);
      this.isSuccess.set(true);
    } catch (e) {
      console.error('[WaitlistForm] Caught error:', e);
      this.error.set('Submission failed. Please check your connection.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
