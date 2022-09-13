import { Injectable, Inject } from '@nestjs/common';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY')
    private notesRepository: typeof Note
  ) { }

  async findAll(): Promise<Note[]> {
    return await this.notesRepository.findAll<Note>({
      include: [{model: User, attributes: { exclude: ['password'] } }]
    });
  }

  async findOne(id: number): Promise<Note> {
    return await this.notesRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }]
    });
  }

  async create(createNoteDto: CreateNoteDto, userId: number): Promise<Note> {
    return await this.notesRepository.create<Note>({ ...createNoteDto, userId });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    const [numberOfAffectedRows, [updatedNote]] = await this.notesRepository.update({ ...updateNoteDto }, { where: { id, userId }, returning: true });
    return { numberOfAffectedRows, updatedNote };
  }

  async delete(id: number, userId: number) {
    return await this.notesRepository.destroy({ where: { id, userId } });
  }
}