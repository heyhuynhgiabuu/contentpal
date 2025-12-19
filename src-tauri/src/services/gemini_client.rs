//! Gemini API client with streaming support

use crate::domain::StreamChunk;
use serde::{Deserialize, Serialize};

pub struct GeminiClient {
    api_key: String,
    base_url: String,
}

#[derive(Serialize)]
struct GeminiRequest {
    contents: Vec<Content>,
    generation_config: GenerationConfig,
}

#[derive(Serialize)]
struct Content {
    parts: Vec<Part>,
}

#[derive(Serialize)]
struct Part {
    text: String,
}

#[derive(Serialize)]
struct GenerationConfig {
    response_mime_type: String,
}

#[derive(Deserialize)]
struct GeminiResponse {
    candidates: Vec<Candidate>,
}

#[derive(Deserialize)]
struct Candidate {
    content: CandidateContent,
}

#[derive(Deserialize)]
struct CandidateContent {
    parts: Vec<ResponsePart>,
}

#[derive(Deserialize)]
struct ResponsePart {
    text: String,
}

impl GeminiClient {
    pub fn new(api_key: String) -> Self {
        Self {
            api_key,
            base_url: "https://generativelanguage.googleapis.com/v1beta".to_string(),
        }
    }
    
    /// Generate content with structured JSON output
    pub async fn generate_json<T: for<'de> Deserialize<'de>>(
        &self,
        prompt: &str,
        _schema: &serde_json::Value,
    ) -> Result<T, String> {
        let client = reqwest::Client::new();
        
        let request = GeminiRequest {
            contents: vec![Content {
                parts: vec![Part {
                    text: prompt.to_string(),
                }],
            }],
            generation_config: GenerationConfig {
                response_mime_type: "application/json".to_string(),
            },
        };
        
        let url = format!(
            "{}/models/gemini-1.5-flash:generateContent?key={}",
            self.base_url, self.api_key
        );
        
        let response = client
            .post(&url)
            .json(&request)
            .send()
            .await
            .map_err(|e| e.to_string())?;
        
        let gemini_response: GeminiResponse = response
            .json()
            .await
            .map_err(|e| e.to_string())?;
        
        let text = gemini_response
            .candidates
            .first()
            .and_then(|c| c.content.parts.first())
            .map(|p| p.text.clone())
            .ok_or("No response from Gemini")?;
        
        serde_json::from_str(&text).map_err(|e| e.to_string())
    }
}
