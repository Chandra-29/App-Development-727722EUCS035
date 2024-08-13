package com.example.demo.controller;

import com.example.demo.model.TournamentReg;
import com.example.demo.service.TournamentRegService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tournaments")
@CrossOrigin(origins = "http://localhost:3000") // Update if needed
public class TournamentRegController {

    @Autowired
    private TournamentRegService service;

    @GetMapping
    public List<TournamentReg>  getAllTournaments() {
        return service. getAllTournaments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TournamentReg> getRegistrationById(@PathVariable Long id) {
        Optional<TournamentReg> registration = service.getRegistrationById(id);
        return registration.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TournamentReg> createRegistration(@RequestBody TournamentReg tournamentReg) {
        TournamentReg createdRegistration = service.createOrUpdateRegistration(tournamentReg);
        return ResponseEntity.ok(createdRegistration);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TournamentReg> updateRegistration(@PathVariable Long id, @RequestBody TournamentReg tournamentReg) {
        Optional<TournamentReg> existingRegistration = service.getRegistrationById(id);
        if (existingRegistration.isPresent()) {
            tournamentReg.setId(id);
            return ResponseEntity.ok(service.createOrUpdateRegistration(tournamentReg));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTournament(@PathVariable Long id) {
        service.deleteTournament(id);
        return ResponseEntity.noContent().build();
    }
}
