import { Controller, Req, Body, Get, Post, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto
  ): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  delete(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<Note> {
    return this.notesService.delete(id);
  }
}