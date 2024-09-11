CREATE TABLE IF NOT EXISTS templates(
    repo UNIQUE NOT NULL,
    annus INTEGER NOT NULL,
    patria TEXT NOT NULL,
    patriae_nomen TEXT NOT NULL,
    lingua TEXT NOT NULL,
    universitas TEXT NOT NULL,
    facultas TEXT NOT NULL,
    repositorium TEXT NOT NULL,
    descriptio TEXT NOT NULL,
    verificatur INTEGER DEFAULT 0,
    updated_at TEXT DEFAULT current_timestamp
);
