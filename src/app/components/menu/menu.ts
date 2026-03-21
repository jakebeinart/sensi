import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoodService } from '../../services/mood.service';
import { CommonModule, DatePipe, LowerCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheck, heroXMark } from '@ng-icons/heroicons/outline';
import { DataService } from '../../services/data.service';
import { AutofocusDirective } from '../../services/autofocus.directive';

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule, DatePipe, LowerCasePipe, NgIcon, AutofocusDirective, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  providers: [provideIcons({ heroCheck, heroXMark })],
})
export class Menu implements OnChanges {
  score: FormControl<number | undefined | null> = new FormControl(null, [
    Validators.min(1),
    Validators.max(10),
  ]);
  notes: FormControl<string> = new FormControl();
  @Input() date: string | null = null;
  @Output() close: EventEmitter<null> = new EventEmitter<null>();
  moodService = inject(MoodService);
  dataService = inject(DataService);

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const newDate = changes['date'].currentValue;
    const entry = this.dataService.getEntry(newDate);
    this.score.setValue(entry?.score);
    this.notes.setValue(entry?.notes);
  }

  save() {
    if (!this.date || !this.score.value) {
      return;
    }

    this.dataService.upsert({
      date: this.date,
      score: this.score.value,
      notes: this.notes.value,
    });
    this.close.emit();
  }
}
