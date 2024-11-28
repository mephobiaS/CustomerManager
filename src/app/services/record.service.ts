import { Injectable } from '@angular/core';
import { Record } from '../model/record.model';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private records: Record[] = [];
  private nextId: number = 1;

  constructor() {
    const storedRecords = localStorage.getItem('records');
    if (storedRecords) {
      this.records = JSON.parse(storedRecords);
      this.nextId =
        this.records.length > 0
          ? Math.max(...this.records.map((r) => r.id!)) + 1
          : 1;
    } else {
      this.records = [
        {
          id: 1,
          name: 'Shreya Ved',
          email: 'shreyaved2020@gmail.com',
          contact: 7717731269,
          address: 'Bhagalpur, Bihar',
        },
      ];

      this.nextId = 2;
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('records', JSON.stringify(this.records));
  }

  getRecords(): Record[] {
    return [...this.records];
  }

  getRecord(id: number): Record | undefined {
    return this.records.find((r) => r.id === id);
  }

  deleteRecord(id: number): void {
    this.records = this.records.filter((r) => r.id !== id);
    this.updateSerialNumbers();
    this.saveToLocalStorage();
  }

  editRecord(editedRecord: Record): void {
    const index = this.records.findIndex((r) => r.id === editedRecord.id);
    if (index !== -1) {
      this.records[index] = editedRecord;
      this.saveToLocalStorage();
    }
  }

  addRecord(record: Record): Record {
    const { id, ...dataWithoutId } = record;
    const newRecord: Record = { id: this.nextId++, ...dataWithoutId };
    this.records.push(newRecord);
    this.saveToLocalStorage();
    return newRecord;
  }

  private updateSerialNumbers(): void {
    this.records = this.records.map((record, index) => ({
      ...record,
      id: index + 1,
    }));
    this.nextId = this.records.length + 1;
    this.saveToLocalStorage();
  }
}
