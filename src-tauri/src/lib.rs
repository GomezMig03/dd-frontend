use regex::Regex;
use std::fs;
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

                let rom_vec: Vec<&str> = out.lines().collect();

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

#[tauri::command]
fn use_dd(inp: String, out: String, sudo: bool) -> bool {
    if !verify_path(&inp) || !verify_path(&out) {
        return false;
    }

    if fs::metadata(&out).is_ok() {
        if let Err(_) = fs::remove_file(&out) {
            return false;
        }
    }

    let com = if sudo {
        format!("pkexec dd if={} of={} status=progress", inp, out)
    } else {
        format!("dd if={} of={} status=progress", inp, out)
    };

    let info = Command::new("sh").arg("-c").arg(&com).output();

    match info {
        Ok(output) => {
            if output.status.success() {
                true
            } else {
                false
            }
        }
        Err(e) => {
            println!("Error: {}", e);
            false
        }
    }
}

fn verify_path(path: &String) -> bool {
    let pattern = r"^/[a-zA-Z0-9._-]+(/[a-zA-Z0-9._-]+)*$";
    let reg = Regex::new(pattern).unwrap();

    reg.is_match(&path)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_version, get_disk, use_dd])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
