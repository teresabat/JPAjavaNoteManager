package com.example.notemanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {
	@Autowired
	private NoteRepository noteRepository;

	@GetMapping
	public List<Note> getAllNotes() {
		return noteRepository.findAll();
	}

	@PostMapping
	public Note createNote(@RequestBody Note note) {
		return noteRepository.save(note);
	}

	@PutMapping("/{id}")
	public Note updateNote(@PathVariable Long id, @RequestBody Note noteDetails) {
		Note note = noteRepository.findById(id).orElseThrow();
		note.setTitle(noteDetails.getTitle());
		note.setContent(noteDetails.getContent());
		return noteRepository.save(note);
	}

	@DeleteMapping("/{id}")
	public void deleteNote(@PathVariable Long id) {
		Note note = noteRepository.findById(id).orElseThrow();
		noteRepository.delete(note);
	}
}
