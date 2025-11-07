package com.nextra.re.persistence.service.impl;

import com.nextra.core.persistence.service.impl.BaseServiceImpl;
import com.nextra.re.persistence.model.Account;
import com.nextra.re.persistence.repository.AccountRepository;
import com.nextra.re.persistence.service.AccountService;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl extends BaseServiceImpl<Account, Long> implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
        this.repository = accountRepository; // ✅ assign base protected field
    }
}
