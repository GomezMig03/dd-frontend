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

#[tauri::command]
fn get_disk(get_full: bool) -> Vec<String> {
    let info = Command::new("sh")
        .arg("-c")
        .arg(r#"df -h | grep "^/dev/" | grep -v " /boot\| /home\| /efi""#)
        .output();

    let mut disks = Vec::new();

    match info {
        Ok(output) => {
            if output.status.success() {
                let out = String::from_utf8_lossy(&output.stdout);

                let mut rom_vec: Vec<&str> = out.lines().collect();

                for rom in rom_vec {
                    let space = rom.find(" ").unwrap_or(rom.len());
                    let mut path: &str = &rom[..space];
                    if get_full {
                        path = &path[..path.len() - 1]
                    }

                    // Using slow method to get last / because rfind won't work with non-ASCII char
                    let last_slash =
                        rom.chars().count() - rom.chars().rev().position(|c| c == '/').unwrap() - 1;
                    let mut name = &rom[last_slash + 1..rom.len()];

                    if name == "" {
                        name = "root"
                    }

                    if name != "boot" && name != "home" && name != "efi" {
                        disks.push(format!("{} {}", path, name));
                    }
                }

                disks
            } else {
                vec![String::from("")]
            }
        }
        Err(e) => {
            println!("{}", e);
            vec![String::from("")]
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_version, get_disk])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
