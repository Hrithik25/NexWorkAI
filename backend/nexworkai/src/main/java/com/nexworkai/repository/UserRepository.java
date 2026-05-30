package com.nexworkai.repository;

import com.nexworkai.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // ─────────────────────────────────────────────
    // FIND BY EMAIL
    // ─────────────────────────────────────────────

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndDeletedFalse(String email);

    Optional<User> findByEmailAndIsActiveTrueAndDeletedFalse(String email);


    // ─────────────────────────────────────────────
    // EXISTENCE CHECKS
    // ─────────────────────────────────────────────

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByEmailAndDeletedFalse(String email);


    // ─────────────────────────────────────────────
    // FIND ALL (active, non-deleted)
    // ─────────────────────────────────────────────

    @Query("SELECT u FROM User u WHERE u.deleted = false")
    List<User> findAllNonDeleted();

    @Query("SELECT u FROM User u WHERE u.deleted = false")
    Page<User> findAllNonDeleted(Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.isActive = true AND u.deleted = false")
    List<User> findAllActiveUsers();

    @Query("SELECT u FROM User u WHERE u.isActive = true AND u.deleted = false")
    Page<User> findAllActiveUsers(Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.isActive = false AND u.deleted = false")
    List<User> findAllInactiveUsers();


    // ─────────────────────────────────────────────
    // FIND BY ID (non-deleted)
    // ─────────────────────────────────────────────

    @Query("SELECT u FROM User u WHERE u.id = :id AND u.deleted = false")
    Optional<User> findByIdAndDeletedFalse(@Param("id") UUID id);

    @Query("SELECT u FROM User u WHERE u.id = :id AND u.isActive = true AND u.deleted = false")
    Optional<User> findByIdAndIsActiveTrueAndDeletedFalse(@Param("id") UUID id);


    // ─────────────────────────────────────────────
    // SEARCH
    // ─────────────────────────────────────────────

    @Query("""
            SELECT u FROM User u
            WHERE u.deleted = false
            AND (
                LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
                LOWER(u.lastName)  LIKE LOWER(CONCAT('%', :keyword, '%')) OR
                LOWER(u.email)     LIKE LOWER(CONCAT('%', :keyword, '%')) OR
                LOWER(u.phone)     LIKE LOWER(CONCAT('%', :keyword, '%'))
            )
            """)
    Page<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);

    @Query("""
            SELECT u FROM User u
            WHERE u.deleted = false
            AND LOWER(u.firstName) LIKE LOWER(CONCAT('%', :firstName, '%'))
            AND LOWER(u.lastName)  LIKE LOWER(CONCAT('%', :lastName, '%'))
            """)
    List<User> findByFirstNameAndLastNameContaining(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName);


    // ─────────────────────────────────────────────
    // EMAIL VERIFICATION
    // ─────────────────────────────────────────────

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.isEmailVerified = true WHERE u.id = :id")
    void verifyEmail(@Param("id") UUID id);

    List<User> findByIsEmailVerifiedFalseAndDeletedFalse();

    @Query("""
            SELECT u FROM User u
            WHERE u.isEmailVerified = false
            AND u.deleted = false
            AND u.createdAt < :cutoff
            """)
    List<User> findUnverifiedUsersCreatedBefore(@Param("cutoff") LocalDateTime cutoff);


    // ─────────────────────────────────────────────
    // ACTIVATE / DEACTIVATE
    // ─────────────────────────────────────────────

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.isActive = :status WHERE u.id = :id")
    void updateActiveStatus(@Param("id") UUID id, @Param("status") boolean status);


    // ─────────────────────────────────────────────
    // SOFT DELETE
    // ─────────────────────────────────────────────

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.deleted = true, u.isActive = false, u.updatedAt = :now WHERE u.id = :id")
    void softDeleteById(@Param("id") UUID id, @Param("now") LocalDateTime now);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.deleted = true, u.isActive = false, u.updatedAt = :now WHERE u.id IN :ids")
    void softDeleteByIds(@Param("ids") List<UUID> ids, @Param("now") LocalDateTime now);


    // ─────────────────────────────────────────────
    // LAST LOGIN
    // ─────────────────────────────────────────────

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.lastLogin = :lastLogin WHERE u.id = :id")
    void updateLastLogin(@Param("id") UUID id, @Param("lastLogin") LocalDateTime lastLogin);

    @Query("""
            SELECT u FROM User u
            WHERE u.deleted = false
            AND u.lastLogin < :cutoff
            """)
    List<User> findInactiveUsersSince(@Param("cutoff") LocalDateTime cutoff);

    @Query("""
            SELECT u FROM User u
            WHERE u.deleted = false
            AND u.lastLogin IS NULL
            """)
    List<User> findUsersWhoNeverLoggedIn();


    // ─────────────────────────────────────────────
    // PROFILE IMAGE
    // ─────────────────────────────────────────────

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.profileImageUrl = :url WHERE u.id = :id")
    void updateProfileImageUrl(@Param("id") UUID id, @Param("url") String url);


    // ─────────────────────────────────────────────
    // PASSWORD
    // ─────────────────────────────────────────────

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = :password, u.updatedAt = :now WHERE u.id = :id")
    void updatePassword(@Param("id") UUID id,
                        @Param("password") String password,
                        @Param("now") LocalDateTime now);


    // ─────────────────────────────────────────────
    // ANALYTICS / COUNTS
    // ─────────────────────────────────────────────

    @Query("SELECT COUNT(u) FROM User u WHERE u.deleted = false")
    long countNonDeleted();

    @Query("SELECT COUNT(u) FROM User u WHERE u.isActive = true AND u.deleted = false")
    long countActiveUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.isEmailVerified = false AND u.deleted = false")
    long countUnverifiedUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt BETWEEN :from AND :to AND u.deleted = false")
    long countUsersRegisteredBetween(@Param("from") LocalDateTime from,
                                     @Param("to") LocalDateTime to);
}