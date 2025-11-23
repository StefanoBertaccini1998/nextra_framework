package com.nextra.re.api.controller;

import com.nextra.core.api.BaseController;
import com.nextra.re.persistence.model.Account;
import com.nextra.re.persistence.service.AccountService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts")
public class AccountController extends BaseController<Account, Long> {
    public AccountController(AccountService service) {
        super(service);
    }
}
