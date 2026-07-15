# Graph Report - .  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 15 nodes · 14 edges · 1 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 114 input · 9 output

## Graph Freshness
- Built from commit: `1711ba20`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Project Documentation and Architecture

## God Nodes (most connected - your core abstractions)
1. `Memory System README` - 14 edges
2. `Project Overview` - 1 edges
3. `Architecture` - 1 edges
4. `Tech Stack` - 1 edges
5. `API Documentation` - 1 edges
6. `Database Documentation` - 1 edges
7. `Business Rules` - 1 edges
8. `Coding Standards` - 1 edges
9. `Current Status` - 1 edges
10. `Architectural Decisions` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Memory System README` --references--> `API Documentation`  [EXTRACTED]
  memory/README.md → memory/api.md
- `Memory System README` --references--> `Architecture`  [EXTRACTED]
  memory/README.md → memory/architecture.md
- `Memory System README` --references--> `Bugs`  [EXTRACTED]
  memory/README.md → memory/bugs.md
- `Memory System README` --references--> `Business Rules`  [EXTRACTED]
  memory/README.md → memory/business-rules.md
- `Memory System README` --references--> `Changelog`  [EXTRACTED]
  memory/README.md → memory/changelog.md

## Hyperedges (group relationships)
- **Memory System Documentation Set** — memory_readme, memory_project_overview, memory_architecture, memory_tech_stack, memory_api, memory_database, memory_business_rules, memory_coding_standards, memory_current_status, memory_decisions, memory_changelog, memory_bugs, memory_deployment, memory_how_to_run, memory_todo [EXTRACTED 1.00]

## Communities (1 total, 0 thin omitted)

### Community 0 - "Project Documentation and Architecture"
Cohesion: 0.13
Nodes (15): API Documentation, Architecture, Bugs, Business Rules, Changelog, Coding Standards, Current Status, Database Documentation (+7 more)

## Knowledge Gaps
- **14 isolated node(s):** `Project Overview`, `Architecture`, `Tech Stack`, `API Documentation`, `Database Documentation` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Project Overview`, `Architecture`, `Tech Stack` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Documentation and Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._