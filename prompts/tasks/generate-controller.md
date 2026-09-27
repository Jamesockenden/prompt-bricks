---
title: "Task: Generate RESTful API Controller"
category: "tasks"
filename: "generate-controller.md"
path: "prompts/tasks/generate-controller.md"
description: "OpenAPI 3 tags, RFC 7807 ProblemDetail error responses, idempotency, pagination"
tags: ["task","rest-api","controller","openapi"]
commitHash: "9d21af8"
lastModified: "2026-09-25"
author: "AI Generated"
params: [{"id":"resource_name","name":"resource_name","label":"Entity / Resource Name","type":"string","defaultValue":"Order","placeholder":"e.g. Customer, Order, Payment, Inventory","description":"Primary domain resource managed by this endpoint"},{"id":"endpoint_base_path","name":"endpoint_base_path","label":"Endpoint Base URL Path","type":"string","defaultValue":"/api/v1/orders","placeholder":"/api/v1/...","description":"URI prefix for the controller route"},{"id":"enable_idempotency","name":"enable_idempotency","label":"Require Idempotency-Key Header on POST","type":"boolean","defaultValue":true,"description":"Prevent double-billing or duplicate entity creation"},{"id":"enable_cursor_pagination","name":"enable_cursor_pagination","label":"Implement Keyset/Cursor Pagination","type":"boolean","defaultValue":true,"description":"Provide after_cursor and limit parameters for collection queries"}]
---

## Task: Implement Production REST Controller for {{resource_name}}

Implement the complete RESTful HTTP controller for `{{resource_name}}` mounted at `{{endpoint_base_path}}`:

1. **Standardized Endpoints**:
   - `POST {{endpoint_base_path}}`: Create new {{resource_name}}. Returns 201 Created with `Location` header.
   - `GET {{endpoint_base_path}}/{id}`: Fetch {{resource_name}} by UUID. Returns 200 OK or 404 Not Found.
   - `GET {{endpoint_base_path}}`: Query collection {{#if enable_cursor_pagination}}with cursor-based pagination (`limit`, `cursor`, `next_cursor`){{/if}}.
   - `PUT {{endpoint_base_path}}/{id}`: Complete replace / update with optimistic lock check.
   - `DELETE {{endpoint_base_path}}/{id}`: Idempotent soft deletion returning 204 No Content.

2. **Enterprise Contract & Error Handling**:
   - Annotate all endpoints with Swagger/OpenAPI 3 annotations (`@Operation`, `@ApiResponse`, `@Tag`).
   - Format all HTTP 4xx and 5xx errors conforming strictly to RFC 7807 (Problem Details for HTTP APIs).
   {{#if enable_idempotency}}
   - Require an `Idempotency-Key` header on the create endpoint, validating UUID format and short-circuiting replays with cached responses.
   {{/if}}
   - Validate incoming payloads using standard bean/model validation decorators.
