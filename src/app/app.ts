import { Component, inject, signal } from '@angular/core';
import { Menu } from './components/menu/menu';
import { MoodService } from './services/mood.service';
import { DataService } from './services/data.service';
import { startOfWeek, addDays, format, parseISO } from 'date-fns';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroStar } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  imports: [Menu, NgIcon],
  providers: [provideIcons({ heroStar })],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sensi');
  moodService = inject(MoodService);
  dataService = inject(DataService);
  weeks: string[][] = [];
  entries = this.dataService.entries;
  selectedDate: string | null = null;
  todayString: string = new Date().toISOString().split('T')[0];

  constructor() {
    // generate weeks from first entry to today
    const todayDatestring = new Date().toISOString().split('T')[0];
    const earliestDate = Object.keys(this.entries()).sort().at(0) || todayDatestring;
    const allDates = this.getDatesInRange(earliestDate, todayDatestring);
    this.weeks = this.buildWeekGrid(allDates);

    // this.dataService.getEntry();
    if (!Object.hasOwn(this.entries(), todayDatestring)) {
      this.selectedDate = todayDatestring;
    }
  }

  getDatesInRange(startDateString: string, endDateString: string): string[] {
    const dates = [];
    let currentDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Loop while the current date is less than or equal to the end date
    while (currentDate <= endDate) {
      // Format the date as an ISO string (YYYY-MM-DD) and push to the array
      // slice(0, 10) extracts "YYYY-MM-DD" from the full ISO string
      dates.push(currentDate.toISOString().slice(0, 10));

      // Increment the date by one day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  getWeekDays(anyDate: Date): string[] {
    const monday = startOfWeek(anyDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => format(addDays(monday, i), 'yyyy-MM-dd'));
  }

  // Expands a date range into an array of full Mon–Sun weeks
  buildWeekGrid(dates: string[]): string[][] {
    if (dates.length === 0) return [];

    const sorted = [...dates].sort();
    const firstMonday = startOfWeek(parseISO(sorted[0]), { weekStartsOn: 1 });
    const lastMonday = startOfWeek(parseISO(sorted[sorted.length - 1]), { weekStartsOn: 1 });

    const weeks: string[][] = [];
    let cursor = firstMonday;

    while (cursor <= lastMonday) {
      weeks.push(this.getWeekDays(cursor));
      cursor = addDays(cursor, 7);
    }

    return weeks;
  }
}
