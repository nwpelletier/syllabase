import { Composer } from './composer.model';

export interface Collection {
  id: number;
  name: string;
  composer?: Composer | null;
}
