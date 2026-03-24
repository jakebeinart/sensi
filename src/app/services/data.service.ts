import { effect, Injectable, signal } from '@angular/core';
import { MoodEntry } from './mood.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly _entries = signal<Record<string, MoodEntry>>({});
  readonly entries = this._entries.asReadonly();

  constructor() {
    // Load initial data from storage
    this.loadEntries();

    // Effect to save data to localStorage whenever the signal updates
    effect(() => {
      const entries = this.entries();
      localStorage.setItem('mood-entries', JSON.stringify(entries));
    });
  }

  upsert(entry: MoodEntry) {
    // this._entries()[entry.date] = entry;
    this._entries.update((entries) => ({
      ...entries,
      [entry.date]: entry,
    }));
  }

  getEntry(date: string) {
    return this._entries()[date];
  }

  private loadEntries(): void {
    const storedEntries = localStorage.getItem('mood-entries');
    if (storedEntries) {
      this._entries.set(JSON.parse(storedEntries));
    }
  }
}
