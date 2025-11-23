---
### 🗓️ **Update Date:** 2025-10-30  
### 🧑‍💻 **Author:** Stefano Bertaccini  
### 🧩 **Branch:** feature/base-controller  
### 🚦 **Status:** ✅ Completed  
### 🔖 **Version:** 0.1.0-alpha
---

# 🧱 **NEXTRA Framework — Core & RE Foundation Progress (30 Oct 2025)**

This update tracks the latest milestone for the **NEXTRA Core Framework**, focusing on REST abstraction, auditing integration, and environment-based security.

## 🧩 **Commit Summary**

```bash
feat(core): add BaseController and PropertyController with audited persistence

- Implemented generic BaseController for standardized REST endpoints
- Added Property entity, repository, service, and controller for CRUD testing
- Integrated ApiResponse wrapper across all endpoints
- Enabled H2 console and profile-based security chain (dev vs prod)
- Verified Auditing: createdBy/updatedBy auto-filled via AuditListener
- Verified logging and exception flow in RequestLoggingFilter
