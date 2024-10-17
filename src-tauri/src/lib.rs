use std::process::Command;

#[tauri::command]
fn get_version() -> String {
    let output = Command::new("dd")
        .arg("--version")
        .output()
        .expect("No dd found in system");

    let version = String::from_utf8(output.stdout).expect("Invalid UTF-8");

    String::from(&version[14..18])
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
