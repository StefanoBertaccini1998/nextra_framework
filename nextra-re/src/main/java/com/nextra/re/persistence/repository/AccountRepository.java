package com.nextra.re.persistence.repository;

import com.nextra.core.persistence.repository.BaseRepository;
import com.nextra.re.persistence.model.Account;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends BaseRepository<Account, Long> {
    boolean existsByEmail(String email);
}
