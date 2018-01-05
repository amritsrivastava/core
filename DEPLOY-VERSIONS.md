## The various deployed versions and their stats -

| Version name | Changes | Commit id | Performance stats | To be fixed | bundle |
| ----- | ----- | ----- | ----- | ----- | ----- |
| d-2.2 (dev) | + optimized logo | 3c027d1 | PSI - 60(Mobile)<br> PSI - 83(Desktop)<br> LH(PWA) - 27<br> WPT - 2795 | = Logo to vector | 955KB/274Kb |
| d-2.3 (dev) | + icons for pwa added<br>+ no script<br>+ async bundle | 744c10a | PSI - 57(Mobile)<br>PSI - 82(Desktop)<br>LH(PWA) - 55<br>WPT - 3002 | = https<br>= prioritize visible content | 933KB/268KB |
| d-2.4.0 (dev) | + success page<br>+ registering complain<br>- async bundle | - | PWA - 64 | = messages to only new posts | 959KB/276KB |

### Glossary -
| Abbr | Mean |
| ----- | ----- |
| d | dev |
| p | prod |
| + | addition of feature, asset |
| - | removal of feature, asset |
| = | fix or to be fixed |
| PSI | PageSpeed Insights |
| LH(PWA) | LightHouse Progressive Web App |
| WPT | Web Page Test |
| bundle | original/gzip |
