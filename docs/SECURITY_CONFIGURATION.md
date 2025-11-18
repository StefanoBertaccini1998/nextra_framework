# Security Configuration Guide

## Overview

The Nextra Framework uses a **profile-based security configuration** to provide different security levels for development and production environments.

## Architecture

```
nextra-core/src/main/java/com/nextra/core/
├── security/
│   ├── SecurityConfig.java           # Production security (profile: !dev)
│   ├── DevSecurityConfig.java        # Development security (profile: dev)
│   ├── AuthenticationConfig.java     # Shared authentication beans
│   └── jwt/
│       ├── JwtAuthenticationFilter.java
│       └── JwtTokenProvider.java
├── config/
│   └── CorsConfig.java               # CORS configuration (all profiles)
```

---

## Profile Configuration

### Current Active Profile
```yaml
# application.yml
spring:
  profiles:
    active: dev  # Change to 'prod' or 'test' for other environments
```

### Available Profiles
- **dev**: Development mode (no authentication, CORS enabled, open endpoints)
- **test**: Testing mode (JWT authentication, restricted endpoints)
- **prod**: Production mode (JWT authentication, restricted endpoints, audit logging)

---

## Development Security (`DevSecurityConfig.java`)

**Active when**: `spring.profiles.active=dev`

### Features
✅ **CORS enabled** - Frontend can call backend from different ports  
✅ **No authentication** - All endpoints are open  
✅ **CSRF disabled** - For easier API testing  
✅ **Stateless sessions** - No session cookies  
✅ **H2 Console enabled** - Frame options disabled for database UI  

### Configuration
```java
@Configuration
@EnableWebSecurity
@Profile("dev")
public class DevSecurityConfig {
    
    @Bean
    public SecurityFilterChain devSecurity(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // 👈 ALL ENDPOINTS OPEN
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                .build();
    }
}
```

### When to Use
- Local development
- Testing frontend-backend integration
- Debugging API endpoints
- Database console access

⚠️ **WARNING**: Never use `dev` profile in production!

---

## Production Security (`SecurityConfig.java`)

**Active when**: `spring.profiles.active != dev` (test, prod, etc.)

### Features
🔒 **JWT Authentication** - Token-based authentication required  
🔒 **Protected endpoints** - Only `/auth/**` is public  
✅ **CORS enabled** - Controlled origins only  
🔒 **CSRF disabled** - For REST API compatibility  
✅ **Stateless sessions** - JWT tokens only  

### Configuration
```java
@Configuration
@EnableWebSecurity
@Profile("!dev")
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/swagger-ui/**", "/v3/api-docs/**", "/h2-console/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated() // 👈 ALL OTHER ENDPOINTS REQUIRE JWT
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
```

### Public Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /swagger-ui/**` - API documentation
- `GET /v3/api-docs/**` - OpenAPI spec
- `GET /h2-console/**` - H2 database console

### Protected Endpoints
All other endpoints require:
1. Valid JWT token in `Authorization: Bearer <token>` header
2. Token not expired
3. User exists in database

### When to Use
- Staging environment
- Production deployment
- Integration testing with authentication
- Security audits

---

## CORS Configuration (`CorsConfig.java`)

**Active in**: All profiles (dev, test, prod)

### Configuration
```java
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allowed origins (frontend URLs)
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",  // Vite dev server
            "http://localhost:5174",  // Alternative port
            "http://localhost:3000"   // React/Next.js
        ));
        
        // Allowed HTTP methods
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));
        
        // Allow all headers
        configuration.setAllowedHeaders(List.of("*"));
        
        // Allow credentials (cookies, auth headers)
        configuration.setAllowCredentials(true);
        
        // Expose custom headers to frontend
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization", 
            "X-Correlation-Id"
        ));
        
        // Preflight cache duration (1 hour)
        configuration.setMaxAge(3600L);
        
        return source;
    }
}
```

### Production CORS Setup

For production, update `CorsConfig.java` to use environment variables:

```java
// Add to application-prod.yml
cors:
  allowed-origins: https://yourdomain.com,https://www.yourdomain.com

// Update CorsConfig.java
@Value("${cors.allowed-origins}")
private String allowedOrigins;

configuration.setAllowedOrigins(
    Arrays.asList(allowedOrigins.split(","))
);
```

---

## Authentication Flow

### Development Mode (`dev` profile)
```
Frontend → Backend API
         ← No authentication needed
         ← Direct response
```

### Production Mode (`!dev` profiles)
```
1. Frontend → POST /auth/login {username, password}
            ← JWT token

2. Frontend → GET /api/clients
   Header: Authorization: Bearer <token>
            ← Protected data

3. Token expires after 24 hours
   Frontend → POST /auth/refresh-token
            ← New JWT token
```

---

## Testing the Configuration

### Test Dev Mode (No Auth)
```bash
# Set profile to dev
spring.profiles.active=dev

# Test without token
curl http://localhost:8080/api/clients
# Should return: 200 OK with data
```

### Test Prod Mode (With Auth)
```bash
# Set profile to prod
spring.profiles.active=prod

# 1. Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
# Returns: {"data":{"token":"eyJhbGc..."}}

# 2. Access protected endpoint
curl http://localhost:8080/api/clients \
  -H "Authorization: Bearer eyJhbGc..."
# Should return: 200 OK with data

# 3. Access without token
curl http://localhost:8080/api/clients
# Should return: 401 Unauthorized
```

---

## Switching Profiles

### Option 1: application.yml
```yaml
spring:
  profiles:
    active: dev  # Change to: test, prod
```

### Option 2: Command Line
```bash
# Maven
mvn spring-boot:run -Dspring-boot.run.profiles=prod

# Gradle
./gradlew bootRun --args='--spring.profiles.active=prod'

# JAR
java -jar nextra-re.jar --spring.profiles.active=prod
```

### Option 3: Environment Variable
```bash
export SPRING_PROFILES_ACTIVE=prod
java -jar nextra-re.jar
```

---

## Best Practices

### Development
✅ Use `dev` profile for local development  
✅ Keep CORS origins updated with your frontend ports  
✅ Use H2 console for quick database inspection  
✅ Test APIs without authentication overhead  

### Testing
✅ Use `test` profile for integration tests  
✅ Include authentication in test scenarios  
✅ Verify JWT expiration handling  
✅ Test CORS preflight requests  

### Production
✅ Use `prod` profile always  
✅ Configure environment-specific CORS origins  
✅ Enable SSL/TLS (HTTPS)  
✅ Set strong JWT secret key  
✅ Configure token expiration appropriately  
✅ Enable audit logging  
✅ Monitor authentication failures  

---

## Troubleshooting

### CORS Errors in Browser
```
Error: Access to fetch at 'http://localhost:8080/api/clients' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

**Solution**:
1. Check `CorsConfig.java` includes your frontend URL
2. Verify CORS is enabled in `SecurityConfig`/`DevSecurityConfig`
3. Restart backend after changes
4. Check browser console for preflight OPTIONS request

### 401 Unauthorized in Production
```
{"status":401,"error":"Unauthorized","message":"Full authentication is required"}
```

**Solution**:
1. Verify you're sending JWT token: `Authorization: Bearer <token>`
2. Check token hasn't expired (default: 24 hours)
3. Verify user exists in database
4. Check JWT secret key matches between environments

### H2 Console Not Loading
**Solution**:
1. Ensure `dev` profile is active
2. Check `headers.frameOptions().disable()` is present
3. Access: http://localhost:8080/h2-console
4. JDBC URL: `jdbc:h2:mem:testdb`

---

## Security Checklist

### Before Production Deployment
- [ ] Set `spring.profiles.active=prod`
- [ ] Update CORS allowed origins to production domains
- [ ] Configure strong JWT secret key (min 256 bits)
- [ ] Set appropriate token expiration time
- [ ] Enable HTTPS/SSL
- [ ] Remove H2 console dependency
- [ ] Use production database (PostgreSQL/MySQL)
- [ ] Enable audit logging
- [ ] Configure rate limiting
- [ ] Set up monitoring/alerting
- [ ] Review and restrict public endpoints
- [ ] Test authentication flow end-to-end

---

## Summary

| Feature | Dev Profile | Prod Profile |
|---------|------------|--------------|
| Authentication | ❌ Disabled | ✅ JWT Required |
| CORS | ✅ Enabled | ✅ Enabled (restricted) |
| CSRF | ❌ Disabled | ❌ Disabled |
| Public Endpoints | All | `/auth/**`, `/swagger-ui/**` |
| H2 Console | ✅ Enabled | ❌ Disabled |
| Audit Logging | Minimal | Full |
| Session Management | Stateless | Stateless |

**Current Profile**: `dev` (check `application.yml`)

**Remember**: The security configuration automatically switches based on the active Spring profile. No code changes needed when deploying to different environments!
