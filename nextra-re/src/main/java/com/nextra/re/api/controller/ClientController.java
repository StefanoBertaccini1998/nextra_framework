// java
package com.nextra.re.api.controller;

import com.nextra.core.api.BaseController;
import com.nextra.core.api.ApiResponse;
import com.nextra.re.dto.ClientRequest;
import com.nextra.re.dto.ClientResponse;
import com.nextra.re.persistence.model.Client;
import com.nextra.re.persistence.service.AccountService;
import com.nextra.re.persistence.service.ClientService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * Controller for managing clients.
 * Uses DTOs to avoid exposing entities.
 */
@Slf4j
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
    
    // Override create to use DTO
    @Override
    @PostMapping
    public ResponseEntity<ApiResponse<Client>> create(@RequestBody Client entity) {
        throw new UnsupportedOperationException("Use POST /api/clients/new with ClientRequest instead");
    }
    
    // Override update to use DTO
    @Override
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Client>> update(@PathVariable Long id, @RequestBody Client entity) {
        throw new UnsupportedOperationException("Use PUT /api/clients/{id}/update with ClientRequest instead");
    }
    
    // Override delete to require ADMIN
    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        return super.delete(id);
    }
    
    // Override getById to return DTO
    @Override
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Client>> getById(@PathVariable Long id) {
        return clientService.findById(id)
                .map(client -> ResponseEntity.ok(ApiResponse.ok(client)))
                .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok(null)));
    }

    /**
     * Create new client with DTO
     */
    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public ResponseEntity<ApiResponse<ClientResponse>> createClient(@Valid @RequestBody ClientRequest request) {
        log.debug("Creating client: {}", request.getName());
        Client client = toEntity(request);
        Client saved = clientService.save(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(toResponse(saved)));
    }
    
    /**
     * Update client with DTO
     */
    @PutMapping("/{id}/update")
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public ResponseEntity<ApiResponse<ClientResponse>> updateClient(
            @PathVariable Long id,
            @Valid @RequestBody ClientRequest request) {
        log.debug("Updating client {}", id);
        return clientService.findById(id)
                .map(existing -> {
                    updateEntityFromRequest(existing, request);
                    Client updated = clientService.save(existing);
                    return ResponseEntity.ok(ApiResponse.ok(toResponse(updated)));
                })
                .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok(null)));
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<ApiResponse<List<ClientResponse>>> getByAgent(@PathVariable Long agentId) {
        List<ClientResponse> responses = clientService.findByAssignedAgent(agentId).stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(ApiResponse.ok(responses));
    }

    @GetMapping("/fiscal/{fiscalId}")
    public ResponseEntity<ApiResponse<ClientResponse>> getByFiscalId(@PathVariable String fiscalId) {
        return clientService.findByFiscalId(fiscalId)
                .map(c -> ResponseEntity.ok(ApiResponse.ok(toResponse(c))))
                .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok(null)));
    }

    @GetMapping("/budget")
    public ResponseEntity<ApiResponse<List<ClientResponse>>> getByBudgetRange(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max
    ) {
        // Use optimized query that finds clients whose budget range overlaps with the given range
        List<ClientResponse> responses = clientService.findByBudgetRange(min, max).stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(ApiResponse.ok(responses));
    }

    private Client toEntity(ClientRequest dto) {
        Client entity = new Client();
        updateEntityFromRequest(entity, dto);
        return entity;
    }
    
    private void updateEntityFromRequest(Client entity, ClientRequest dto) {
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