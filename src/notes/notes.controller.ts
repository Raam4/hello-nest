import { Controller, Body, Request, Get, Post, Param, Delete, Put, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Get()
  async findAll() {
    return await this.notesService.findAll();
  }

  @Get(':id')
  async findOne( @Param('id', new ParseIntPipe()) id: number ): Promise<Note> {
    const note = await this.notesService.findOne(id);
    if (!note) {
      throw new NotFoundException('This Note doesn\'t exist');
    }
    return note;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create( @Body() createNoteDto: CreateNoteDto, @Request() req ): Promise<Note> {
    return await this.notesService.create(createNoteDto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update( @Param('id', new ParseIntPipe()) id: number, @Body() updateNoteDto: UpdateNoteDto, @Request() req ): Promise<Note> {
    const { numberOfAffectedRows, updatedNote } = await this.notesService.update(id, updateNoteDto, req.user.id);
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This Post doesn\'t exist');
    }
    return updatedNote;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete( @Param('id', new ParseIntPipe()) id: number, @Request() req ) {
    const deleted = await this.notesService.delete(id, req.user.id);
    if (deleted === 0) {
      throw new NotFoundException('This Post doesn\'t exist');
    }
    return 'Successfully deleted';
  }
}