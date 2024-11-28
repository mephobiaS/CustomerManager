import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Injector,
} from '@angular/core';
import { RecordService } from '../services/record.service';
import { Record } from '../model/record.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
})
export class RecordsComponent implements OnInit {
  records: Record[] = [
    {
      id: 1,
      name: 'Shreya Ved',
      email: 'shreyaved2020@gmail.com',
      contact: 7717731269,
      address: 'Bhagalpur, Bihar',
    },
  ];
  @ViewChild('deleteContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  deleteId: number | null = null;

  constructor(
    private recordService: RecordService,
    private router: Router,
    public authService: AuthService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.records = this.recordService.getRecords();
  }

  confirmDelete(id: number) {
    this.deleteId = id;

    // Clear previous component instances
    this.container.clear();

    // Dynamically load DeleteRecordComponent
    import('../delete-record/delete-record.component').then(
      ({ DeleteRecordComponent }) => {
        const componentRef = this.container.createComponent(
          DeleteRecordComponent,
          { injector: this.injector }
        );

        // Bind event listeners dynamically
        componentRef.instance.yesDel.subscribe(() => this.onYesDelete());
        componentRef.instance.noDel.subscribe(() => this.closeModal());
      }
    );
  }

  onYesDelete() {
    if (this.deleteId !== null) {
      this.recordService.deleteRecord(this.deleteId);
      this.records = this.recordService.getRecords();
    }
    this.closeModal();
  }

  closeModal() {
    this.deleteId = null;
    this.container.clear();
  }

  onEdit(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }

  onAdd() {
    this.router.navigate(['/add']);
  }

  onLogout() {
    this.authService.logout();
  }
}
