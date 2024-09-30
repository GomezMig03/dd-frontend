export const getLatestVersion = async (arch) => {
    console.log(arch)
    if(arch === undefined) arch = "x64"
    try {
        const response = await fetch('https://api.github.com/repos/GomezMig03/dd-frontend/releases/latest');
        const data = await response.json();

        let tagName = data.tag_name;

        if (tagName.startsWith('v')) {
            tagName = tagName.substring(1);
        }

        //console.log(`https://github.com/GomezMig03/dd-frontend/releases/download/v${tagName}/DDFrontend-${tagName}-x64.AppImage`)
        return `https://github.com/GomezMig03/dd-frontend/releases/download/v${tagName}/DDFrontend-${tagName}-${arch}.AppImage`
    } catch (error) {
        console.error('Error fetching the latest release:', error);
    }
}