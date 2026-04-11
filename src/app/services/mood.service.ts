import { Injectable, signal, computed } from '@angular/core';
import { MoodEntry } from './mood.model';

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  oldColorClass(rating: number | null | undefined) {
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

  getColorClass(rating: number | null | undefined) {
    switch (Math.round(Number(rating))) {
      case 1:
        return 'bg-red-700';
      case 2:
        return 'bg-red-600';
      case 3:
        return 'bg-orange-600';
      case 4:
        return 'bg-amber-600';
      case 5:
        return 'bg-yellow-600';
      case 6:
        return 'bg-yellow-500';
      case 7:
        return 'bg-seven';
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

  getDifficultyBgStyle(difficulty: number | null | undefined): { backgroundColor: string } {
    if (!difficulty) {
      return { backgroundColor: '' };
    }
    // Interpolate: teal(1) → gold(5) → coral(10)
    const stops: Record<number, string> = {
      1: 'var(--color-accent-low)',
      5: 'var(--color-accent-mid)',
      10: 'var(--color-accent-high)',
    };

    // For exact stops, return the CSS variable directly
    if (stops[difficulty]) {
      return { backgroundColor: stops[difficulty] };
    }

    // For in-between steps, blend via color-mix
    if (difficulty < 5) {
      const pct = ((difficulty - 1) / 4) * 100;
      return {
        backgroundColor: `color-mix(in oklch, var(--color-accent-mid) ${pct}%, var(--color-accent-low))`,
      };
    } else {
      const pct = ((difficulty - 5) / 5) * 100;
      return {
        backgroundColor: `color-mix(in oklch, var(--color-accent-high) ${pct}%, var(--color-accent-mid))`,
      };
    }
  }
}
