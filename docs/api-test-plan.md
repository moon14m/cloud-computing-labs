

| Test ID | Method | Endpoint                  | Request Body / Condition                                | Expected Status                                                    | Expected Result / Response Body |

| **T01** | GET    | `/api/issues`             | None (with existing data)                               | `200 OK`                                                        | JSON array containing all stored issues. |

| **T02** | POST   | `/api/issues`             | Valid JSON with `title`, `description`, and `priority`. | `201 Created`                                              | Complete issue object returned with server-generated `id`, `status: "Open"`, and `createdAt`. |

| **T03** | POST   | `/api/issues`             | Missing `title` field or empty title string.            | `400 Bad Request`                                | `VALIDATION_ERROR` JSON message. |

| **T04** | POST   | `/api/issues`             | Invalid priority value (e.g., `"priority": "Critical"`). | `400 Bad Request`                                | `VALIDATION_ERROR` JSON message. |

| **T05** | PATCH  | `/api/issues/{id}/status` | Valid existing issue ID and `"status": "Resolved"`.      | `200 OK`                                                      | Full updated issue object with `status` changed to `"Resolved"`. |

| **T06** | PATCH  | `/api/issues/{id}/status` | Valid existing issue ID but invalid status (e.g., `"status": "Deleted"`).  | `400 Bad Request`                | `VALIDATION_ERROR` JSON message. |

| **T07** | PATCH  | `/api/issues/{id}/status` | Unknown or non-existent issue ID.                                         | `404 Not Found`                                 | `ISSUE_NOT_FOUND` JSON message. |

| **T08** | GET    | `/api/issues` | None (when the data store is empty).                                                  | `200 OK`                                       | An empty JSON array `[]`. 

| **T09** | POST   | `/api/issues` | Sending client-defined server fields (e.g., injecting `id` or `status`).              | `201 Created`                                 | Server ignores/rejects the client-provided fields and overrides them according to the contract. |

