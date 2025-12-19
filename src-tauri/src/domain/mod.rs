//! Domain models for Content Repurposing Studio

use serde::{Deserialize, Serialize};

/// Source document from user input
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SourceDoc {
    pub title: Option<String>,
    pub body: String,
    pub source_type: SourceType,
    pub source_meta: Option<SourceMeta>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum SourceType {
    Url,
    Text,
    File,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SourceMeta {
    pub url: Option<String>,
    pub filename: Option<String>,
    pub extracted_at: Option<i64>,
}

/// Brand voice profile
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BrandProfile {
    pub id: String,
    pub name: String,
    pub samples: Vec<String>,
    pub signature: VoiceSignature,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VoiceSignature {
    pub tone: String,
    pub pov: String,
    pub banned_phrases: Vec<String>,
    pub favored_phrases: Vec<String>,
    pub formatting_rules: Vec<String>,
}

/// Recipe configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Recipe {
    pub id: String,
    pub kind: RecipeKind,
    pub constraints: PlatformConstraints,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RecipeKind {
    Linkedin,
    XThread,
    Email,
    Seo,
    Script,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlatformConstraints {
    pub max_length: Option<usize>,
    pub max_items: Option<usize>,
    pub formatting: Option<Vec<String>>,
}

/// Generation request sent to Gemini
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GenerationRequest {
    pub source: SourceDoc,
    pub recipe_id: String,
    pub brand_profile: Option<BrandProfile>,
}

/// Streaming response chunk
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum StreamChunk {
    Partial { content: String },
    Complete { content: String },
    Error { message: String },
}
