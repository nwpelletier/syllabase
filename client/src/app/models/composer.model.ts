import { Era } from './era.model';

export interface Composer {
  id: number;
  firstName: string;
  lastName: string;
  birthYear?: number | null;
  deathYear?: number | null;
  nationality?: string;
  era?: Era | null; // <-- like Piece has composer?: Composer
}
