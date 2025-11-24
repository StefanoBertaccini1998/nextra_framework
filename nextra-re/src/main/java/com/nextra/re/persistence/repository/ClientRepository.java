package com.nextra.re.persistence.repository;

import com.nextra.core.persistence.repository.BaseRepository;
import com.nextra.re.persistence.model.Client;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends BaseRepository<Client, Long> {

    List<Client> findByAssignedAgentId(Long accountId);

    Optional<Client> findByFiscalId(String fiscalId);

    // simple budget-range helpers (may be adapted to real matching logic)
    List<Client> findByPreferredBudgetMinGreaterThanEqual(BigDecimal min);

    List<Client> findByPreferredBudgetMaxLessThanEqual(BigDecimal max);
    
    // Find clients whose budget range overlaps with the given range
    List<Client> findByPreferredBudgetMinLessThanEqualAndPreferredBudgetMaxGreaterThanEqual(BigDecimal max, BigDecimal min);
}