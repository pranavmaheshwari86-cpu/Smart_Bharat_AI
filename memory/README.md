# Memory System

## Purpose
This memory system serves as the single source of truth for both developers and AI agents working on this project. It is a living documentation system designed to automatically evolve as the project changes.

## How Developers Should Use It
- Before starting a new task, review this directory to understand existing architecture, business rules, and technical debt.
- When making changes, update the relevant files in this directory to reflect new APIs, architectural decisions, or bugs.
- Do not keep project knowledge in isolated documents or silos; everything goes here.

## How AI Agents Should Use It
- Read every file in the `memory/` directory before starting ANY coding task.
- Build a complete understanding of the project, verifying consistency with existing architecture.
- After completing ANY task, update all affected memory files (e.g., changelog, decisions, bugs, todo).

## Update Rules
- Keep information modular to avoid duplication. Use cross-references (links) instead of restating facts.
- Use Markdown format, proper headings, lists, and tables.
- Never leave the memory outdated. If the code changes, the memory must change with it.
- Append new decisions chronologically; never overwrite history.

## File Responsibilities
- `project-overview.md`: Project vision, product purpose, features, roadmap.
- `architecture.md`: System design, frontend/backend architecture, data flow.
- `tech-stack.md`: Frontend, backend, database, and infrastructure technologies.
- `api.md`: Comprehensive API endpoint documentation.
- `database.md`: Database models, schemas, relationships, and migrations.
- `business-rules.md`: Core logic, validations, permissions, and limitations.
- `coding-standards.md`: Folder structure, naming conventions, and style guides.
- `current-status.md`: Active sprint, progress, blocked tasks, and priorities.
- `decisions.md`: Architectural Decision Records (ADRs).
- `changelog.md`: Chronological history of project changes.
- `bugs.md`: Tracked issues, root causes, and regressions.
- `deployment.md`: CI/CD, environments, hosting, and rollback processes.
- `how-to-run.md`: Local setup, dependencies, build, and test instructions.
- `todo.md`: Prioritized backlog and technical debt.

## Maintenance Guidelines
- Ensure files remain accurate, persistent, and self-updating.
- Maintain AI-friendly structure (clear, concise, structured data).
