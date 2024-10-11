// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    dd_frontend_lib::run()

    // TODO: Open github in the browser, get dd version (dd --version), get file input and output with system's file manager, make basic dd comands and get list of disks
}
