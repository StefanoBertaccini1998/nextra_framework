// java
package com.nextra.re.persistence.service.impl;

import com.nextra.core.persistence.service.impl.BaseServiceImpl;
import com.nextra.re.persistence.model.Category;
import com.nextra.re.persistence.model.Client;
import com.nextra.re.persistence.repository.ClientRepository;
import com.nextra.re.persistence.service.ClientService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientServiceImpl extends BaseServiceImpl<Client, Long> implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
        this.repository = clientRepository;
    }


    @Override
    public List<Client> findByAssignedAgent(Long accountId) {
        return clientRepository.findByAssignedAgentId(accountId);
    }

    @Override
    public Optional<Client> findByFiscalId(String fiscalId) {
        return clientRepository.findByFiscalId(fiscalId);
    }

    @Override
    public List<Client> findByPreferredBudgetMinGreaterThanEqual(BigDecimal min) {
        return clientRepository.findByPreferredBudgetMinGreaterThanEqual(min);
    }

    @Override
    public List<Client> findByPreferredBudgetMaxLessThanEqual(BigDecimal max) {
        return clientRepository.findByPreferredBudgetMaxLessThanEqual(max);
    }
}