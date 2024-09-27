import { os } from '@neutralinojs/lib';

export const getVersion = async () => {
    let info = await os.execCommand('dd --version');
    if (info.stdErr) {
        console.log(info.stdErr)
        return "No dd found in system"
    }
    const number = info.stdOut.substring(14, 18)
    return `dd version:${number}`
}

export const getPath = async () => {
    let entry = await os.showOpenDialog('Select path of input', {
        defaultPath: '~'
    })
    console.log(`Selected: ${entry}`)
    return entry
}

export const getFileOutput = async () => {
    let entry = await os.showSaveDialog('Select output file', {
        defaultPath: '~/example.iso',
        filters: [
            {name: 'iso', extensions: ['iso']},
            {name: 'img', extensions: ['img']},
            {name: 'bin', extensions: ['bin']},
            {name: 'txt', extensions: ['txt']},
            {name: 'gz', extensions: ['gz']},
            {name: 'xz', extensions: ['xz']},
            {name: 'bz2', extensions: ['bz2']},
            {name: 'tar', extensions: ['tar']},
            {name: 'dd', extensions: ['dd']},
            {name: 'All files', extensions: ['*']}
        ]
    })

    console.log(`Selected: ${entry}`)
    return entry
}

export const basicDD = async (input, output, sudo) => {
    let pkexec = ''
    if (sudo) pkexec = 'pkexec'
    const command = `${pkexec} dd if=${input} of=${output} status=progress`
    console.log(`command to be executed: ${command}`)

    let info = await os.spawnProcess(command);

    console.log(info.pid)
}

const verifyPath = async (path) => {
    const validPathRegex = /^\/[a-zA-Z0-9._-]+(\/[a-zA-Z0-9._-]+)*$/;
    return validPathRegex
} 

export const getDiskROM = async (getFullDisk) => {
    let info = await os.execCommand(`df -h | grep "^/dev/" | grep -v " /boot\| /home\| /efi"`)
    if (info.stdErr) {
        console.error(info.stdErr)
        return
    }

    const romArray = info.stdOut.split('\n')
    romArray.pop()

    const romPATH = romArray.map((val) => {
        let path = val.substring(0, val.indexOf(" "))
        if (getFullDisk) {
            path = path.substring(0, path.length-1)
        }
        let name = val.substring(val.lastIndexOf("/")+1, val.length)
        if (name === "boot" | name === "home" | name === "efi") return
        if (name === "") name = "root"
        return `${path}  ${name}`
    })

    const roms = romPATH.filter((val) => {
        return val != undefined
    })

    return roms
}