# Contributing to openIndu Portal

Thank you for contributing. Create a focused branch, keep secrets and local
`.env` files out of Git, and open a pull request against `main`.

Before submitting a pull request, run:

```bash
npm ci
npm run lint
npm run test:coverage
npm run build
```

Describe the intent, blast radius, test results, and rollback approach in the
pull request. All changes require human review before merge.

## Reporting security issues

Do not open a public issue for a suspected vulnerability. See [SECURITY.md](SECURITY.md).
