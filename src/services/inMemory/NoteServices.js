/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NoteServices {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const newNote = {
      title, tags, body, id, createAt, updateAt,
    };

    this._notes.push(newNote);
    const isSucces = this._notes.filter((note) => note.id === id).length > 0;
    if (!isSucces) {
      throw new InvariantError('Catatan gagal ditambahkan!');
    }
    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];

    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return note;
  }

  editNoteByIdHandler(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan, id tidak ditemukan');
    }

    const updateAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updateAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal menghapus catatan, id tidak ditemukan di server');
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NoteServices;
