//! URL scraping service

use crate::domain::SourceDoc;

pub struct Scraper;

impl Scraper {
    /// Scrape article content from URL
    pub async fn scrape_url(url: &str) -> Result<SourceDoc, String> {
        // TODO: Implement with reqwest + scraper crate
        // Extract: title, main content, clean HTML
        Err(format!("Scraping not yet implemented for: {}", url))
    }
}
