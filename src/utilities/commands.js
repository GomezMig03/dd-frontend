import { os, events } from '@neutralinojs/lib';

export const getVersion = async () => {
    let info = await os.execCommand('dd --version');
    if (info.stdErr) {
        console.log(info.stdErr)
        return "No dd found in system"
    }
    const number = info.stdOut.substring(14, 18)
    const version = `dd version:${number}`
    return version
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

    events.on('spawnedProcess', (evt) => {
        if (info.id = evt.detail.id) {
            switch(evt.detail.action) {
                case 'stdOut':
                    console.log(evt.detail.data);
                    break;
                case 'stdErr':
                    console.error(evt.detail.data);
                    break;
                case 'exit':
                    console.log(`Ping process terminated with exit code: ${evt.detail.data}`);
                    break;
            }
        }
    })
}

export const getDiskROM = async () => {
    let info = await os.execCommand(`df -h | grep "^/dev/" | grep -v " /boot\| /home\| /efi"`)
    if (info.stdErr) {
        console.error(info.stdErr)
        return
    }

    const romArray = info.stdOut.split('\n')
    romArray.pop()

    const romPATH = romArray.map((val) => {
        const path = val.substring(0, val.indexOf(" "))
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