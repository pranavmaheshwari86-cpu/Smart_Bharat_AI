# Confirmed Architectural Decisions

- **Platform Identity**: Standardized across all navigation surfaces as **Smart Bharat AI**.
- **AI Architecture**: 10-Stage Enterprise Orchestration Pipeline (`src/lib/ai/`) with Groq Llama-3.3-70B primary provider and OpenRouter failover.
- **Session History**: Local-first encrypted client storage via `localStorage` (`smart_bharat_chat_sessions`) with smart topic-aware titling.
- **Credentials Vault**: Encrypted browser vault with 1-click DigiLocker synchronization.

