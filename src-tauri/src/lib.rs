use std::process::Command;

#[tauri::command]
fn get_version() -> String {
    let info = Command::new("dd").arg("--version").output();

    match info {
        Ok(output) => {
            if output.status.success() {
                let version = String::from_utf8_lossy(&output.stdout).to_string();
                String::from(&version[14..18])
            } else {
                String::from("Error")
            }
        }
        Err(_) => String::from("Error"),
    }
}

/*
fn get_disk(get_full: bool) -> Vec<String> {
    let info = Command::new("sh")
        .arg("-c")
        .arg("df -h | grep '^/dev/' | grep -v ' /boot\\| /home\\| /efi'")
        .output()
        .expect("Error getting disks");
}
*/

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
