// /admin/view-content/view-content.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataService } from '../services/admin-data.service';
import { PieceWithDetails } from '../../../models/piece-with-details.model';

@Component({
  selector: 'app-view-content',
  standalone: true,
  imports: [CommonModule],
  providers: [AdminDataService], // <-- provide the service here
  templateUrl: './view-content.html',
  styleUrls: ['./view-content.css'],
})
export class ViewContent implements OnInit {
  piecesWithDetails: PieceWithDetails[] = [];

  constructor(public adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.piecesWithDetails$.subscribe((data: PieceWithDetails[]) => {
      this.piecesWithDetails = data;
    });

    this.adminData.loadAllData(); // fetch everything
  }
}
