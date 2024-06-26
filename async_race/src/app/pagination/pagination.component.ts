import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { COUNTER } from '../constants/constants';
import { VISIBLE_PAGES, VISIBLE_PAGES_PER_SIDE } from './constants';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  visiblePages: number[] = [];
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnChanges(): void {
    this.updateVisiblePages();
  }

  updateVisiblePages(): void {
    const start = Math.max(COUNTER, this.currentPage - VISIBLE_PAGES_PER_SIDE);
    const end = Math.min(this.totalPages, start + VISIBLE_PAGES);
    this.visiblePages = Array.from({ length: end - start + COUNTER }, (_, i) => start + i);
  }

  previousPage(): void {
    if (this.currentPage > COUNTER) {
      this.currentPage--;
      this.updateVisiblePages();
      this.emitPageChange();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateVisiblePages();
      this.emitPageChange();
    }
  }

  goToPage(page: number): void {
    if (page >= COUNTER && page <= this.totalPages) {
      this.currentPage = page;
      this.updateVisiblePages();
      this.emitPageChange();
    }
  }

  emitPageChange(): void {
    this.pageChange.emit(this.currentPage);
  }
}
