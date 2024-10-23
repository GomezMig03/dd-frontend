// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    dd_frontend_lib::run()

    // TODO: Make basic dd commands, add sudo and get list of disks and partitions
}
