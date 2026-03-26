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
}
