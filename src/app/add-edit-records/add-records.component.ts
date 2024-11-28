import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Record } from '../model/record.model';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-add-records',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-records.component.html',
  styleUrl: './add-records.component.css',
})
export class AddRecordsComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})?$'
      ),
    ]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern('^(9|8|7)(?!.*(\\d)\\1\\1\\1)\\d{9}$'),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recordService: RecordService
  ) {}
  isEditMode: boolean = false;
  recordId: number | null = null;

  ngOnInit(): void {
    // Check if for editing
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.recordId = +id;
        const record = this.recordService.getRecord(this.recordId);
        if (record) {
          this.userForm.patchValue(record);
        } else {
          console.error('Record not found');
          this.router.navigate(['/records']);
        }
      }
    });
  }

  onAdding(): void {
    if (this.userForm.valid) {
      const { name, email, contact, address } = this.userForm.value;
      if (this.isEditMode && this.recordId !== null) {
        const updatedRecord: Record = {
          id: this.recordId,
          name,
          email,
          contact,
          address,
        };
        this.recordService.editRecord(updatedRecord);
      } else {
        const newRecord: Omit<Record, 'id'> = { name, email, contact, address };
        this.recordService.addRecord(newRecord);
      }
      this.router.navigate(['/records']);
    } else {
      console.log('Form is invalid');
    }
  }
}
