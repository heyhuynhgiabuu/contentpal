//! Settings commands - API key management

use tauri::command;

/// Save API key (in production, use OS keychain)
#[command]
pub async fn save_api_key(key: String) -> Result<(), String> {
    // TODO: Use keyring crate for secure storage
    // For now, just validate format
    if key.is_empty() {
        return Err("API key cannot be empty".to_string());
    }
    Ok(())
}

/// Check if API key exists
#[command]
pub async fn has_api_key() -> Result<bool, String> {
    // TODO: Check keyring
    Ok(false)
}

/// Get usage statistics
#[command]
pub async fn get_usage_stats() -> Result<UsageStats, String> {
    Ok(UsageStats {
        total_generations: 0,
        this_month: 0,
        estimated_cost: 0.0,
    })
}

#[derive(serde::Serialize)]
pub struct UsageStats {
    pub total_generations: u32,
    pub this_month: u32,
    pub estimated_cost: f64,
}
