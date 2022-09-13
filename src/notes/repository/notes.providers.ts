import { Note } from '../entities/note.entity';
import { NOTES_REPOSITORY } from '../../core/constants';

export const notesProviders = [{
    provide: NOTES_REPOSITORY,
    useValue: Note,
}];