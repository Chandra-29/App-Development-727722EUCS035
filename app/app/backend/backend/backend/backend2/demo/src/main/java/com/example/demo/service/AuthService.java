package com.example.demo.service;
import org.springframework.stereotype.Service;
import com.example.demo.model.User;
import com.example.demo.model.UserDTO;
import com.example.demo.model.UserRoleEnum;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.AuthResponse;
import com.example.demo.utils.LoginRequest;
import com.example.demo.utils.RegisterRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
            .map(user -> UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build())
            .collect(Collectors.toList());
    }

    public AuthResponse register(RegisterRequest registerRequest) {

        UserRoleEnum role = UserRoleEnum.USER;
        
        // Check if the user should be an admin
        if (registerRequest.getEmail().equals("leo@gmail.com") && registerRequest.getPassword().equals("456")) {
            role = UserRoleEnum.ADMIN;
        }

        var user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(role)
                .build();

        User savedUser = userRepository.save(user);
        var accessToken = jwtService.generateToken(savedUser);
        var refreshToken = refreshTokenService.createRefreshToken(savedUser.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }
    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                        )
        );

        var user = userRepository.findByEmail(loginRequest.getEmail());
        System.out.print(user);
                                // .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        var accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(loginRequest.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }

    public Optional<User> getByIDD(Long id){
        return userRepository.findById(id);
    }
    public List<User> getalluserss(){
        return userRepository.findAll();
    }


}