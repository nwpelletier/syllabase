// admin-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ErasService } from '../../../core/services/api/eras.service';
import { ComposersService } from '../../../core/services/api/composers.service';
import { PiecesService } from '../../../core/services/api/pieces.service';
import { CollectionsService } from '../../../core/services/api/collections.service';
import { SyllabiService } from '../../../core/services/api/syllabi.service';
import { GradesService } from '../../../core/services/api/grades.service';
import { PieceSyllabiService } from '../../../core/services/api/piece-syllabi.service';
import { Era } from '../../../models/era.model';
import { Composer } from '../../../models/composer.model';
import { Piece } from '../../../models/piece.model';
import { Collection } from '../../../models/collection.model';
import { Syllabus } from '../../../models/syllabus.model';
import { Grade } from '../../../models/grade.model';
import { PieceWithDetails } from '../../../models/piece-with-details.model';

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  // Observables for components
  public eras$ = new BehaviorSubject<Era[]>([]);
  public composers$ = new BehaviorSubject<Composer[]>([]);
  public pieces$ = new BehaviorSubject<Piece[]>([]);
  public collections$ = new BehaviorSubject<Collection[]>([]);
  public syllabi$ = new BehaviorSubject<Syllabus[]>([]);
  public grades$ = new BehaviorSubject<Grade[]>([]);
  public piecesWithDetails$ = new BehaviorSubject<PieceWithDetails[]>([]);

  constructor(
    private erasService: ErasService,
    private composersService: ComposersService,
    private piecesService: PiecesService,
    private collectionsService: CollectionsService,
    private syllabiService: SyllabiService,
    private gradesService: GradesService,
    private pieceSyllabiService: PieceSyllabiService
  ) {}

  loadAllData() {
    forkJoin({
      eras: this.erasService.getAll(),
      composers: this.composersService.getAll(),
      pieces: this.piecesService.getAll(),
      collections: this.collectionsService.getAll(),
      syllabi: this.syllabiService.getAll(),
      grades: this.gradesService.getAll(),
      piecesWithDetails: this.pieceSyllabiService.getDetails(),
    }).subscribe(({ eras, composers, pieces, collections, syllabi, grades, piecesWithDetails }) => {
      this.composers$.next(composers);
      this.pieces$.next(pieces);
      this.collections$.next(collections);
      this.syllabi$.next(syllabi);
      this.grades$.next(grades);
      this.eras$.next(eras);
      this.piecesWithDetails$.next(piecesWithDetails);
    });
  }

  // 🔹 New method to add a piece syllabus
  addPieceSyllabus(
    pieceId: number | null,
    collectionId: number | null,
    syllabusId: number,
    gradeId: number
  ) {
    return this.pieceSyllabiService
      .addPieceSyllabiByIds(pieceId, collectionId, syllabusId, gradeId)
      .subscribe(() => this.refreshPiecesWithDetails());
  }

  private refreshPiecesWithDetails() {
    this.pieceSyllabiService.getDetails().subscribe((data) => this.piecesWithDetails$.next(data));
  }
}
