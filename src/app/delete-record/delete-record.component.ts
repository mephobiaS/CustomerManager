import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-record',
  standalone: true,
  imports: [],
  templateUrl: './delete-record.component.html',
  styleUrl: './delete-record.component.css',
})
export class DeleteRecordComponent {
  @Output() yesDel = new EventEmitter<any>();
  @Output() noDel = new EventEmitter<any>();

  yesDelete() {
    this.yesDel.emit();
  }

  noDelete() {
    this.noDel.emit();
  }
}
