// java
package com.nextra.re.api.controller;

import com.nextra.core.api.BaseController;
import com.nextra.core.api.ApiResponse;
import com.nextra.re.dto.ClientRequest;
import com.nextra.re.dto.ClientResponse;
import com.nextra.re.persistence.model.Client;
import com.nextra.re.persistence.service.AccountService;
import com.nextra.re.persistence.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController extends BaseController<Client, Long> {

    private final ClientService clientService;
    private final AccountService accountService;

    public ClientController(ClientService clientService, AccountService accountService) {
        super(clientService);
        this.clientService = clientService;
        this.accountService = accountService;
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<ApiResponse<List<Client>>> getByAgent(@PathVariable Long agentId) {
        return ResponseEntity.ok(ApiResponse.ok(clientService.findByAssignedAgent(agentId)));
    }

    @GetMapping("/fiscal/{fiscalId}")
    public ResponseEntity<ApiResponse<Client>> getByFiscalId(@PathVariable String fiscalId) {
        return clientService.findByFiscalId(fiscalId)
                .map(c -> ResponseEntity.ok(ApiResponse.ok(c)))
                .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok(null)));
    }

    @GetMapping("/budget")
    public ResponseEntity<ApiResponse<List<Client>>> getByBudgetRange(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max
    ) {
        // simple example: clients whose preferred min is >= min OR preferred max <= max
        List<Client> byMin = clientService.findByPreferredBudgetMinGreaterThanEqual(min);
        List<Client> byMax = clientService.findByPreferredBudgetMaxLessThanEqual(max);
        byMin.addAll(byMax);
        return ResponseEntity.ok(ApiResponse.ok(byMin));
    }

    private Client toEntity(ClientRequest dto) {
        Client entity = new Client();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setFiscalId(dto.getFiscalId());
        entity.setAddress(dto.getAddress());
        entity.setPreferredBudgetMin(dto.getPreferredBudgetMin());
        entity.setPreferredBudgetMax(dto.getPreferredBudgetMax());
        entity.setPreferredLocations(dto.getPreferredLocations());
        entity.setPreferredPropertyTypes(dto.getPreferredPropertyTypes());
        entity.setPreferredSizeMin(dto.getPreferredSizeMin());
        entity.setPreferredSizeMax(dto.getPreferredSizeMax());
        entity.setNotes(dto.getNotes());

        if (dto.getAssignedAgentId() != null)
            accountService.findById(dto.getAssignedAgentId()).ifPresent(entity::setAssignedAgent);

        return entity;
    }

    private ClientResponse toResponse(Client entity) {
        return ClientResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .fiscalId(entity.getFiscalId())
                .address(entity.getAddress())
                .preferredBudgetMin(entity.getPreferredBudgetMin())
                .preferredBudgetMax(entity.getPreferredBudgetMax())
                .preferredLocations(entity.getPreferredLocations())
                .preferredPropertyTypes(entity.getPreferredPropertyTypes())
                .preferredSizeMin(entity.getPreferredSizeMin())
                .preferredSizeMax(entity.getPreferredSizeMax())
                .notes(entity.getNotes())
                .assignedAgentId(entity.getAssignedAgent() != null ? entity.getAssignedAgent().getId() : null)
                .assignedAgentName(entity.getAssignedAgent() != null ? entity.getAssignedAgent().getName() : null)
                .createdBy(entity.getCreatedBy())
                .updatedBy(entity.getUpdatedBy())
                .createdAt(entity.getCreatedAt() != null ? entity.getCreatedAt().toString() : null)
                .updatedAt(entity.getUpdatedAt() != null ? entity.getUpdatedAt().toString() : null)
                .build();
    }
}