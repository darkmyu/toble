package com.toble.user.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class SocialUser extends User {

    @Column
    private String email;

    @Column
    private String provider;

    @Column
    private String socialId;

    @Column
    private String refreshToken;

    @Builder
    public SocialUser(String username, String shortWord, String profileImageUrl, String email, String provider,
            String socialId, String refreshToken) {
        super(username, shortWord, profileImageUrl);
        this.email = email;
        this.provider = provider;
        this.socialId = socialId;
        this.refreshToken = refreshToken;
    }
}
