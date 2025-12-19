mod commands;
mod domain;
mod services;

use commands::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            // Ingest commands
            scrape_url,
            parse_file,
            // Repurpose commands
            generate_content,
            // Settings commands
            save_api_key,
            has_api_key,
            get_usage_stats,
            // Voice commands
            extract_voice_signature,
            save_brand_profile,
            load_brand_profiles,
        ])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
