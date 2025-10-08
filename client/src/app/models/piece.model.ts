import { Composer } from './composer.model';
import { Collection } from './collection.model';

export interface Piece {
  id: number;
  name: string;
  composer?: Composer;
  collection?: Collection | null;
}
