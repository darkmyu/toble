package com.toble.user.domain;

import com.toble.common.domain.BaseTimeEntity;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "type")
@Entity
public abstract class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(insertable = false, updatable = false)
    private String type;

    @Column
    private String username;

    @Column
    private String shortWord;

    @Column
    private String profileImageUrl;

    public User(String username, String shortWord, String profileImageUrl) {
        this.username = username;
        this.shortWord = shortWord;
        this.profileImageUrl = profileImageUrl;
    }
}
