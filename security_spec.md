# Security Spec - IPAG Huambo

## Data Invariants
1. A user can only see their own profile data (unless Admin).
2. Students can only see their own grades.
3. Teachers can create/update grades but only for valid student IDs.
4. Only Admins or Teachers can publish news.
5. All IDs must be valid alphanumeric strings.

## The Dirty Dozen Payloads (Targeting Rejection)
1. User registration with `role: "ADMIN"` (Identity Spoofing).
2. Student updating their own `value` in `grades` (State Shortcutting).
3. Writing a Grade without a valid `studentId`.
4. Updating a News post owner to another UID.
5. Injecting a 2MB string into `news.content`.
6. Reading `/users` collection without a specific filter for own UID.
7. Deleting a Course without Admin privileges.
8. Creating a User with a fake `email_verified: true` custom claim (if we relied on client claims).
9. Updating `createdAt` on any document (Immutability Violation).
10. Creating a News document with a future `publishedAt` date manually.
11. Reading PII from another user's profile.
12. Bulk deleting grades.

## Test Runner (Logic Overview)
The `firestore.rules` will be tested against these cases.
