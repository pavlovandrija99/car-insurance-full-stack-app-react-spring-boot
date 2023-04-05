package com.synechron.backend_app.models;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    @ManyToOne
    @JoinColumn(name = "userRoleId")
    private UserRole userRole;
    @Column(columnDefinition = "boolean default true")
    private boolean accountNonExpired = true;
    @Column(columnDefinition = "boolean default true")
    private boolean accountNonLocked = true;
    @Column(columnDefinition = "boolean default true")
    private boolean credentialsNonExpired = true;
    @Column(columnDefinition = "boolean default true")
    private boolean enabled = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.getName().toUpperCase());
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(authority);

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
