// java
package com.nextra.re.persistence.service;

import com.nextra.core.persistence.service.BaseService;
import com.nextra.re.persistence.model.Client;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ClientService extends BaseService<Client, Long> {
    List<Client> findByAssignedAgent(Long accountId);
    Optional<Client> findByFiscalId(String fiscalId);
    List<Client> findByPreferredBudgetMinGreaterThanEqual(BigDecimal min);
    List<Client> findByPreferredBudgetMaxLessThanEqual(BigDecimal max);
    List<Client> findByBudgetRange(BigDecimal min, BigDecimal max);
}