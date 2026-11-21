# Test report

Checked on 2026-11-21 against the current source using Python 3.12, FastAPI TestClient, and an isolated temporary SQLite database.

## Automated checks

| Check | Result |
|---|---|
| API, auth, roles, request creation/cancellation, and status transitions | 14 tests passed |
| Home, five separate screen sections, persisted-language control markup, CSS/JS/image routes | Passed |
| JavaScript syntax (`node --check`) | Passed |
| Python syntax (`py_compile`) | Passed |
| Visible interface translation keys | 118 keys present in both Kazakh and Russian |
| JavaScript ID selectors | All matched an element in the template |

The test suite does not create or modify production records. A Starlette deprecation warning is emitted for its current use of HTTPX in TestClient; the test run still completes successfully.

## Scope and limitations

- No browser-driven end-to-end test or mobile-device test was run.
- The interface reports that live vehicle telemetry is not connected. No GPS, payment, SMS, or real tariff calculation is implemented.
- The Render service uses the repository's SQLite default unless a managed database URL is configured. Render's local filesystem can be reset after restarts or redeploys; use persistent storage for durable production records.
