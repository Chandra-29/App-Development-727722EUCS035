package com.example.demo.service;

import com.example.demo.model.TournamentReg;
import com.example.demo.repository.TournamentRegRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TournamentRegService {

    @Autowired
    private TournamentRegRepository repository;

    public List<TournamentReg> getAllTournaments() {
        return repository.findAll();
    }
    public Optional<TournamentReg> getRegistrationById(Long id) {
        return repository.findById(id);
    }

    public TournamentReg createOrUpdateRegistration(TournamentReg tournamentReg) {
        return repository.save(tournamentReg);
    }

    public void deleteTournament(Long id) {
        repository.deleteById(id);
    }

}
