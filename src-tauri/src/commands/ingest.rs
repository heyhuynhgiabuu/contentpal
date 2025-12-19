//! Content ingestion commands - URL scraping, file parsing

use crate::domain::{SourceDoc, SourceMeta, SourceType};
use tauri::command;

/// Scrape content from a URL
#[command]
pub async fn scrape_url(url: String) -> Result<SourceDoc, String> {
    // TODO: Implement actual scraping with reqwest + scraper
    // For now, return placeholder
    Ok(SourceDoc {
        title: Some(format!("Content from {}", url)),
        body: format!("Scraped content from: {}", url),
        source_type: SourceType::Url,
        source_meta: Some(SourceMeta {
            url: Some(url),
            filename: None,
            extracted_at: Some(chrono::Utc::now().timestamp()),
        }),
    })
}

/// Parse uploaded file content
#[command]
pub async fn parse_file(filename: String, content: String) -> Result<SourceDoc, String> {
    Ok(SourceDoc {
        title: Some(filename.clone()),
        body: content,
        source_type: SourceType::File,
        source_meta: Some(SourceMeta {
            url: None,
            filename: Some(filename),
            extracted_at: Some(chrono::Utc::now().timestamp()),
        }),
    })
}
