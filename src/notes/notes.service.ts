import { Injectable, Inject } from '@nestjs/common';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY')
    private notesRepository: typeof Note
  ) { }

  async findAll(): Promise<Note[]> {
    return this.notesRepository.findAll<Note>();
  }

  async findOne(id: number): Promise<Note> {
    return this.notesRepository.findByPk(id);
  }

  async create(createNoteDto: CreateNoteDto) {
    const note = new Note(createNoteDto);
    return note.save();
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);
    note.title = updateNoteDto.title || note.title;
    note.content = updateNoteDto.content || note.content;
    note.archived = "archived" in updateNoteDto ? updateNoteDto.archived : note.archived;
    return note.save();
  }

  async delete(id: number) {
    const note = await this.findOne(id);
    await note.destroy();
    return note;
  }
}