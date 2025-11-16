// Sound effects using Web Audio API
class SoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize on first user interaction
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private createOscillator(frequency: number, type: OscillatorType = 'sine') {
    if (!this.audioContext || !this.enabled) return null;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    return { oscillator, gainNode };
  }

  // Success sound - cheerful ascending notes
  success() {
    if (!this.audioContext || !this.enabled) return;

    const notes = [523.25, 659.25, 783.99]; // C, E, G
    notes.forEach((freq, i) => {
      const result = this.createOscillator(freq, 'sine');
      if (!result) return;

      const { oscillator, gainNode } = result;
      const startTime = this.audioContext!.currentTime + (i * 0.1);

      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }

  // Error sound - descending tone
  error() {
    if (!this.audioContext || !this.enabled) return;

    const result = this.createOscillator(200, 'sawtooth');
    if (!result) return;

    const { oscillator, gainNode } = result;
    const now = this.audioContext.currentTime;

    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }

  // Click sound - short blip
  click() {
    if (!this.audioContext || !this.enabled) return;

    const result = this.createOscillator(800, 'sine');
    if (!result) return;

    const { oscillator, gainNode } = result;
    const now = this.audioContext.currentTime;

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }

  // Celebration sound - ascending sparkle
  celebration() {
    if (!this.audioContext || !this.enabled) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C (octave)
    notes.forEach((freq, i) => {
      const result = this.createOscillator(freq, 'triangle');
      if (!result) return;

      const { oscillator, gainNode } = result;
      const startTime = this.audioContext!.currentTime + (i * 0.08);

      gainNode.gain.setValueAtTime(0.25, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  }

  // Streak sound - quick ascending blip
  streak() {
    if (!this.audioContext || !this.enabled) return;

    const result = this.createOscillator(1000, 'square');
    if (!result) return;

    const { oscillator, gainNode } = result;
    const now = this.audioContext.currentTime;

    oscillator.frequency.exponentialRampToValueAtTime(1500, now + 0.1);
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }
}

export const sounds = new SoundEffects();
