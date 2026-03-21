import { Injectable, signal, computed } from '@angular/core';
import { MoodEntry } from './mood.model';

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  // The main signal holds an array of all entries
  private readonly _moodEntries = signal<MoodEntry[]>([]);

  // Expose a read-only signal for components to use
  readonly moodEntries = this._moodEntries.asReadonly();

  // Add a new entry
  addEntry(entry: MoodEntry): void {
    this._moodEntries.update((entries) =>
      [...entries, entry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    );
  }

  // Example of a computed signal for derived data
  readonly averageScore = computed(() => {
    const entries = this.moodEntries();
    if (entries.length === 0) return 0;
    const total = entries.reduce((sum, entry) => sum + entry.score, 0);
    return total / entries.length;
  });

  getColorClass(rating: number | undefined) {
    switch (rating) {
      case 1:
        return 'bg-red-600';
      case 2:
        return 'bg-red-500';
      case 3:
        return 'bg-red-400';
      case 4:
        return 'bg-yellow-500';
      case 5:
        return 'bg-yellow-400';
      case 6:
        return 'bg-yellow-300';
      case 7:
        return 'bg-green-300';
      case 8:
        return 'bg-green-400';
      case 9:
        return 'bg-green-500';
      case 10:
        return 'bg-green-600';
      default:
        return '';
    }
  }
}
