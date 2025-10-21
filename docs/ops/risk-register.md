# Different Breed — Risk Register & Monitoring Plan

Last updated: 2025-02-16  
Owners: Marcus Rivera (BE Lead), Jamie Chen (FE Lead), Riley Brooks (Marketing Ops)

## 1. Risk Register (AC 1)

| ID | Risk | Severity | Likelihood | Owner | Mitigation | Status | Next Review |
|----|------|----------|------------|-------|------------|--------|-------------|
| R-001 | Mindbody API rate limits or upstream outage impacts schedule proxy | High | Medium | Marcus Rivera | Implement caching with 60s CDN + 5m SWR; monitor error rates; prepare fallback that embeds Mindbody widget on failure | Open | 2025-02-24 |
| R-002 | Credential delays (Formspree, GTM auth, potential Mindbody keys) slow integration | Medium | Medium | Riley Brooks | Track credential requests in ops board; escalate to leadership if pending > 3 business days; provide mocked env vars for dev | Open | 2025-02-18 |
| R-003 | Analytics decision lag causes instrumentation gaps post-launch | Medium | Low | Jamie Chen | Finalized GTM plan in Story 1.9; create follow-up implementation stories and verify timeline | Mitigated | 2025-02-28 |
| R-004 | Consent/cookie compliance not ready when analytics go live | High | Medium | Riley Brooks | Select consent tool (Cookiebot) and schedule implementation in Sprint 2; ensure legal review by 2025-02-20 | Open | 2025-02-20 |
| R-005 | Proxy performance degradation (response >1s due to upstream latency) | Medium | Medium | Marcus Rivera | Add duration logging, consider caching schedule metadata locally; implement alert when p95 > 1s for 10 min | Open | 2025-02-24 |

### Risk Key
- **Severity:** impact on launch goals if risk occurs.
- **Likelihood:** probability within next sprint.
- **Status values:** Open, Mitigated, Transferred, Closed.

## 2. Monitoring & Alerting Plan (AC 2)

**Scope:** `/api/schedule` proxy, Mindbody dependency, analytics instrumentation.

### Logging
- Structured JSON logs via `console.log` in serverless function.
- Fields: `timestamp`, `requestId`, `route`, `durationMs`, `status`, `cacheHit`, `errorCode`, `upstreamLatencyMs`.
- Attach `requestId` to frontend calls for correlation (future enhancement).

### Metrics & Thresholds
- **Error rate:** Alert if failure rate > 2% over 10-minute rolling window.
- **Latency:** Alert if p95 duration > 1000 ms for 10 minutes.
- **Upstream failures:** Track `errorCode = MBO_UPSTREAM`; alert if > 5 occurrences in 10 minutes.
- **Analytics loading:** Validate GTM script load events post-consent (manual QA until automation added).

### Tooling
- Primary: Vercel Analytics + log drains to Logtail (pending). 
- Configure Vercel’s [Monitoring](https://vercel.com/docs/monitoring/insights) to watch serverless metrics; integrate with Slack webhook `#ops-alerts`.
- If log drain unavailable in Sprint 1, export logs manually during QA to validate thresholds; automation planned Sprint 2.

### Alert Workflow
1. Vercel Insights sends alert to Slack `#ops-alerts`.
2. On-call (Marcus or Jamie) acknowledges within 15 minutes.
3. If issue persists > 30 minutes, escalate to leadership (Avery Tran).
4. Post-incident review documented in Ops Notion workspace.

## 3. Action Items (AC 3)

| Item | Owner | Due | Status |
|------|-------|-----|--------|
| Configure Vercel Insights alerts (error rate, latency) | Marcus Rivera | 2025-02-19 | Planned |
| Request Logtail drain access from DevOps | Jamie Chen | 2025-02-18 | In Progress |
| Draft consent banner implementation ticket (Cookiebot) | Riley Brooks | 2025-02-17 | Planned |
| Create fallback Mindbody widget embed story | Marcus Rivera | 2025-02-20 | Planned |
| Schedule risk review in Sprint 2 planning meeting | Product Owner | 2025-02-21 | Planned |
