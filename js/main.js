var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
var commands = [];

var commandMap = {
  'awards': { action: loopLines, args: [awardsList, "color2 margin", 80] },
  'experience': { action: loopLines, args: [experienceList, "color2 margin", 80] },
  'help': { action: loopLines, args: [help, "color2 margin", 80] },
  'whois': { action: loopLines, args: [whois, "color2 margin", 80] },
  'cloud': { action: newTab, args: ["https://cloud.zephira.uk/"] },
  'contact': { action: loopLines, args: [contact, "color2 margin", 80] },
  'projects': { action: loopLines, args: [projectsList, "color2 margin", 80] },
  'history': { action: () => {
    addLine("<br>", "", 0);
    loopLines(commands, "color2", 80);
    addLine("<br>", "command", 80 * commands.length + 50);
  }},
  'clear': { action: () => {
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById("before");
    loopLines(banner, "", 80);
    remove();
  }},
  'cls': { action: () => {
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById("before");
    loopLines(banner, "", 80);
    remove();
  }},
  'report': { action: newTab, args: ["https://github.com/Zephira58/Zephira58/issues/new"] },
  // Filesystem commands
  'view': { action: view },
  'cd': { action: changeDirectory },
  'ls': { action: listFiles },
  'pwd': { action: printWorkingDirectory },
  // Specific social media commands
    'twitter': { action: newTab, args: [socials.twitter] },
    'instagram': { action: newTab, args: [socials.instagram] },
    'github': { action: newTab, args: [socials.github] },
    'email': { action: newTab, args: [socials.email] },
    'discord': { action: newTab, args: [socials.discord] },
    'session': { action: newTab, args: [socials.session] },
    'tiktok': { action: newTab, args: [socials.tiktok] },
    'twitch': { action: newTab, args: [socials.twitch] },
    'steam': { action: newTab, args: [socials.steam] },
    'spotify': { action: newTab, args: [socials.spotify] },
    'youtube': { action: newTab, args: [socials.youtube] },
    // Specific project commands
    'malacyte': { action: newTab, args: [projects.malacyte] },
    'purplewood': { action: newTab, args: [projects.purplewood] },
    'filesorterx': { action: newTab, args: [projects.FileSorterX] },
    'directorylister': { action: newTab, args: [projects.directory_lister] },
    'networkpoolcalculatorreforged': { action: newTab, args: [projects.NetworkPoolCalculatorReforged] },
    'vanillarenewed': { action: newTab, args: [projects.VanillaRenewed] },
    'cctweakedscripts': { action: newTab, args: [projects.CCTweakedScripts] },
    'supsafkrunner': { action: newTab, args: [projects.supsafkrunner] },
    'robuxcalculator': { action: newTab, args: [projects.robux_calculator] },
    'valorantrandomizer': { action: newTab, args: [projects.ValorantRandomizer] },
    'guessthenumber': { action: newTab, args: [projects.guess_the_number] },
    'cliadventuregame': { action: newTab, args: [projects.CLIAdventureGame] },
    'rockpaperscissorscli': { action: newTab, args: [projects.RockPaperScissorsCLI] },
    'stillalivereforged': { action: newTab, args: [projects.StillAliveReforged] },
    'stanlysterminal': { action: newTab, args: [projects.StanlysTerminal] },
    'affirmationrequester': { action: newTab, args: [projects.AffirmationRequester] },
    'webhooksender': { action: newTab, args: [projects.webhook_sender] },
    //award commands
  'rsa': { action: viewurl, args: ["https://avatars.githubusercontent.com/u/66909997?v=4"]},
  'activedeveloper': { action: newTab, args: ["https://support-dev.discord.com/hc/en-us/articles/10113997751447-Active-Developer-Badge?ref=badge"] },
  //experience
  'winget': { action: newTab, args: [experience.winget] },
  'fiverr': { action: newTab, args: [experience.fiverr] },
};

// Other functions (unchanged)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

addLine('-Commands-',"command",185);
loopLines(help, "color2 margin", 186);

setTimeout(function() {
  loopLines(banner, "", 1);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("visitor@zephira.uk:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git] || "";
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git < commands.length) {
      git += 1;
      textarea.value = commands[git] || "";
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  const [cmdName, ...args] = cmd.split(' ');
  const commandAction = commandMap[cmdName];
  if (commandAction) {
    if (Array.isArray(commandAction.args)) {
      commandAction.action(...commandAction.args);
    } else {
      commandAction.action(...args);
    }
  } else {
    addLine("Command not found. For a list of commands, type <span class=\"command\">help</span>.</span>", "error", 100);
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = text.replace(/  /g, "&nbsp;&nbsp;");
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);
    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

// Filesystem subsection

let renderedImages = [];
let currentDirectory = ''; // Start at the root

const fileSystem = {
  
  "": {
    'img': {
    'media': {
      'elite': {
        'save_0 (1).png': 'image_url',
        'save_1 (2).png': 'image_url',
        'save_2 (2).png': 'image_url',
        'save_3 (2).png': 'image_url',
        'save_4 (2).png': 'image_url',
        'save_5 (2).png': 'image_url',
        'save_6 (2).png': 'image_url',
        'save_7 (2).png': 'image_url'
      },
      'scotl': {
        '20231125231102_1.jpg': 'image_url',
        '20231125231326_1.jpg': 'image_url',
        '20231125231459_1.jpg': 'image_url',
        '20231125231836_1.jpg': 'image_url',
        '20231125231912_1.jpg': 'image_url',
        '20231125231916_1.jpg': 'image_url',
        '20231126133635_1.jpg': 'image_url',
        '20231126133723_1.jpg': 'image_url',
        '20231126134631_1.jpg': 'image_url'
      },
      'ffxiv': {
        '2023.05.11-01-summer-sunset.png': 'image_url',
        '2023.05.11-02-summer-sunset.png': 'image_url',
        '2023.05.11-03-summer-sunset.png': 'image_url',
        '2023.05.12-01-newly-weds.png': 'image_url',
        '2023.05.12-02-newly-weds.png': 'image_url',
        '2023.05.13-blue-pool.png': 'image_url',
        'Desktop Screenshot 2023.05.05 - 15.44.07.77.png': 'image_url',
        'ffxiv_dx11 2023-05-10 12-18-56.png': 'image_url',
        'ffxiv_dx11 2023-05-10 12-18-59.png': 'image_url',
        'ffxiv_dx11 2023-05-10 12-22-17.png': 'image_url',
        'ffxiv_dx11 2023-05-10 12-23-31.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-06-36.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-06-47.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-06-54.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-12-46.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-13-22.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-13-55.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-19-30.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-20-25.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-22-07.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-22-15.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-22-25.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-22-27.png': 'image_url',
        'ffxiv_dx11 2023-05-12 08-22-39.png': 'image_url',
        'ffxiv_dx11 2023-05-12 15-49-21.png': 'image_url',
        'ffxiv_dx11 2023-05-13 16-15-27.png': 'image_url',
        'ffxiv_dx11 2023-05-13 16-27-10.png': 'image_url',
        'ffxiv_dx11 2023-05-21 23-15-07.png': 'image_url',
        'ffxiv_dx11 2023-05-21 23-30-38.png': 'image_url',
        'ffxiv_dx11 2023-05-21 23-44-13.png': 'image_url',
        'ffxiv_dx11 EG2023 - 00 - Shadowbringers Gameplay 2023-05-10 11-05-56.png': 'image_url',
        'Final Fantasy XIV  A Realm Reborn Screenshot 2023.05.05 - 18.22.03.11.png': 'image_url',
        'Final Fantasy XIV  A Realm Reborn Screenshot 2023.05.06 - 04.13.52.76.png': 'image_url',
        'Final Fantasy XIV  A Realm Reborn Screenshot 2023.05.06 - 04.14.23.79.png': 'image_url',
        'Final Fantasy XIV  A Realm Reborn Screenshot 2023.05.07 - 04.58.46.18.png': 'image_url',
        'Final Fantasy XIV  A Realm Reborn Screenshot 2023.05.08 - 21.21.28.51.png': 'image_url',
        'Final Fantasy XIV  A Realm Reborn Super-Resolution 2023.05.08 - 07.20.43.04.png': 'image_url',
        'Final Fantasy XIV  A Realm Reborn Super-Resolution 2023.05.09 - 08.22.06.61.png': 'image_url',
        'Final Fantasy XIV  A Realm Reborn Super-Resolution 2023.05.09 - 09.47.25.44.png': 'image_url',
        'fireside-gaze.png': 'image_url',
        'mossy-goobue.png': 'image_url',
        'night-ruins.png': 'image_url',
        'starry-sky.png': 'image_url'
      },
      'rdr2': {
        '06-12-2018_16-47-54.png': 'image_url',
        '06-12-2018_16-48-13.png': 'image_url',
        '06-12-2018_16-48-45.png': 'image_url',
        '06-12-2018_16-49-31.png': 'image_url',
        '16-11-2018_14-57-20.png': 'image_url',
        '16-11-2018_15-05-05.png': 'image_url',
        '16-11-2018_15-05-28.png': 'image_url',
        '16-11-2018_15-13-27.png': 'image_url',
        '16-11-2018_15-14-29.png': 'image_url',
        '16-11-2018_15-15-28.png': 'image_url',
        '16-11-2018_15-15-56.png': 'image_url',
        '16-11-2018_15-16-25.png': 'image_url',
        '16-11-2018_15-17-09.png': 'image_url',
        '16-11-2018_15-18-39.png': 'image_url',
        '16-11-2018_15-18-58.png': 'image_url',
        '16-11-2018_15-20-06.png': 'image_url',
        '16-11-2018_15-20-25.png': 'image_url',
        '16-11-2018_15-21-46.png': 'image_url',
        '16-11-2018_15-22-02.png': 'image_url',
        '16-11-2018_15-23-10.png': 'image_url',
        '16-11-2018_15-24-42.png': 'image_url',
        '1.jpeg': 'image_url',
        '2.jpg': 'image_url',
        '3.jpg': 'image_url',
        '4.jpg': 'image_url',
        '5.jpg': 'image_url'
      },
      'vrchat': {
        '1.png': 'image_url',
        '2.png': 'image_url',
        '3.png': 'image_url',
        'VRChat_1920x1080_2022-01-11_04-48-24.250.png': 'image_url',
        'VRChat_1920x1080_2022-01-11_04-55-52.002.png': 'image_url',
        'VRChat_1920x1080_2022-01-11_04-56-24.562.png': 'image_url',
        'VRChat_1920x1080_2022-01-11_04-56-51.835.png': 'image_url',
        'VRChat_1920x1080_2022-01-11_04-57-14.043.png': 'image_url',
        'VRChat_1920x1080_2022-01-11_04-58-14.814.png': 'image_url',
        'VRChat_1920x1080_2022-01-12_05-41-09.714.png': 'image_url',
        'VRChat_2024-04-10_17-52-58.724_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-53-11.225_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-53-33.495_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-53-48.811_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-54-50.820_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-54-59.675_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-55-23.318_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-55-33.797_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-55-47.820_1920x1080.png': 'image_url',
        'VRChat_2024-04-10_17-56-41.667_1920x1080.png': 'image_url',
        'VRChat_2024-04-11_18-58-13.945_1920x1080.png': 'image_url',
        'VRChat_2024-04-24_01-59-37.661_1920x1080.png': 'image_url',
        'VRChat_2024-04-24_02-01-58.495_1920x1080.png': 'image_url',
        'VRChat_2024-04-24_02-03-29.993_1920x1080.png': 'image_url',
        'VRChat_2024-04-24_02-05-02.421_1920x1080.png': 'image_url',
        'VRChat_2024-04-24_02-06-42.730_1920x1080.png': 'image_url',
        'VRChat_2024-04-24_02-07-51.022_1920x1080.png': 'image_url',
        'VRChat_2024-04-24_02-10-04.035_1920x1080.png': 'image_url',
        'VRChat_2024-04-28_01-38-33.073_1920x1080.png': 'image_url',
        'VRChat_2024-04-28_18-37-51.131_1920x1080.png': 'image_url',
        'VRChat_2024-05-08_18-19-08.052_1920x1080.png': 'image_url',
        'VRChat_2024-05-12_20-35-11.502_1920x1080.png': 'image_url',
        'VRChat_2024-05-12_20-49-13.503_1920x1080.png': 'image_url',
        'VRChat_2024-05-16_08-10-56.381_1920x1080.png': 'image_url',
        'VRChat_2024-05-21_11-39-41.240_1920x1080.png': 'image_url',
        'VRChat_2024-05-29_10-27-55.495_1920x1080.png': 'image_url',
        'VRChat_2024-05-29_10-28-03.637_1920x1080.png': 'image_url',
        'VRChat_2024-05-29_10-28-11.427_1920x1080.png': 'image_url',
        'VRChat_2024-05-29_10-28-24.716_1920x1080.png': 'image_url',
        'VRChat_2024-07-12_13-35-19.007_7680x4320.png': 'image_url',
        'VRChat_2024-07-12_13-35-58.561_7680x4320.png': 'image_url',
        'VRChat_2024-07-12_13-36-52.530_7680x4320.png': 'image_url',
        'VRChat_2024-07-12_13-39-33.798_7680x4320.png': 'image_url',
        'VRChat_2024-07-12_14-03-01.841_3840x2160.png': 'image_url',
        'VRChat_2024-07-12_14-15-34.025_3840x2160.png': 'image_url',
        'VRChat_2024-07-12_14-17-31.658_3840x2160.png': 'image_url',
        'VRChat_2024-07-12_14-20-35.455_3840x2160.png': 'image_url',
        'VRChat_2024-07-12_14-22-48.014_3840x2160.png': 'image_url',
        'VRChat_2024-07-12_14-23-02.193_3840x2160.png': 'image_url'
      },
      'watch-dogs': {
        '20181103_151104.png': 'image_url',
        '28-10-2018_15-42-32.png': 'image_url',
        '28-10-2018_15-42-38.png': 'image_url',
        '28-10-2018_15-42-43.png': 'image_url',
        '28-10-2018_15-42-47.png': 'image_url',
        '28-10-2018_15-42-50.png': 'image_url',
        '28-10-2018_15-43-00.png': 'image_url',
        '28-10-2018_15-43-05.png': 'image_url',
        '28-10-2018_15-43-09.png': 'image_url',
        '28-10-2018_15-43-13.png': 'image_url',
        '28-10-2018_15-43-17.png': 'image_url',
        '28-10-2018_15-43-22.png': 'image_url',
        '28-10-2018_15-43-26.png': 'image_url',
        '28-10-2018_15-43-30.png': 'image_url',
        '28-10-2018_15-44-18.png': 'image_url',
        '28-10-2018_15-44-27.png': 'image_url',
        '28-10-2018_15-44-31.png': 'image_url',
        '28-10-2018_15-44-35.png': 'image_url',
        '28-10-2018_15-44-44.png': 'image_url',
        '28-10-2018_15-44-48.png': 'image_url',
        '28-10-2018_15-44-52.png': 'image_url',
        '28-10-2018_15-44-59.png': 'image_url',
        '28-10-2018_15-45-03.png': 'image_url',
        '28-10-2018_16-51-24.png': 'image_url',
        '28-10-2018_17-00-53.png': 'image_url',
        'save_1 (1).png': 'image_url',
        'save_2 (1).png': 'image_url',
        'save_3 (1).png': 'image_url',
        'save_4 (1).png': 'image_url',
        'save_5 (1).png': 'image_url',
        'save_6 (1).png': 'image_url',
        'save_7 (1).png': 'image_url'
      }
    }
  }
  }
};

async function viewurl(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`Error: ${response.status} - Unable to fetch the URL`);
      return;
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('text')) {
      const textContent = await response.text();
      console.log(textContent); // Display in the "command line"
    } else if (contentType.includes('image')) {
      // Create an image element
      const img = document.createElement('img');
      img.src = url;
      img.style.maxWidth = '100%'; // Ensure it fits within the screen
      document.body.appendChild(img); // Append the image to the document

      // Track the image for later removal
      renderedImages.push(img);
      console.log(`Image viewed: ${url}`);
    } else {
      console.log(`Unsupported content type: ${contentType}`);
    }
  } catch (error) {
    console.log(`Error fetching content: ${error.message}`);
  }
}

async function view(...args) {
  // If no arguments are provided, use the currentDirectory
  const path = args.length > 0 ? args.join(' ').trim() : `${currentDirectory}`; 
  const fullPath = path.startsWith('~/') ? path.slice(2) : path;

  if (fullPath.includes('.')) { // Assume file if there's a dot in the path
    const url = `https://raw.githubusercontent.com/Zephira58/Zephira58/dev${fullPath}`.trim();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(`Error: ${response.status} - Unable to fetch the URL`);
        return;
      }
      const contentType = response.headers.get('Content-Type');
      if (contentType.includes('image')) {
        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100%';
        document.body.appendChild(img);
        renderedImages.push(img);
        console.log(`Image viewed: ${url}`);
      } else {
        console.log(`Unsupported content type: ${contentType}`);
      }
    } catch (error) {
      console.log(`Error fetching content: ${error.message}`);
    }
  } else {
    const images = getNestedDirectory(fullPath) || {};
    Object.keys(images).forEach(img => {
      const url = `https://raw.githubusercontent.com/Zephira58/Zephira58/dev/${fullPath}/${img}`.trim();
      const imgElem = document.createElement('img');
      imgElem.src = url;
      imgElem.style.maxWidth = '100%';
      document.body.appendChild(imgElem);
      renderedImages.push(imgElem);
    });
    console.log(`Images in ${fullPath}: ${Object.keys(images).join(', ')}`);
  }
}


function getNestedDirectory(path) {
  return path.split('/').reduce((dir, part) => dir ? dir[part] : null, fileSystem);
}

function changeDirectory(newDir) {
  remove();
  const newDirPath = newDir.startsWith('~/') ? newDir.slice(2) : newDir;
  
  if (newDirPath === '..') {
    // Move up one level
    const pathParts = currentDirectory.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      pathParts.pop();
      currentDirectory = '/' + pathParts.join('/');
    } else {
      currentDirectory = '/'; // Stay at root
    }
    addLine(`Moved up to ${currentDirectory}`, "info", 100);
  } else {
    // Handle subdirectory navigation
    const targetPath = currentDirectory + '/' + newDirPath;
    if (getNestedDirectory(targetPath)) {
      currentDirectory = targetPath;
      addLine(`Changed directory to ${currentDirectory}`, "info", 100);
    } else {
      addLine(`Directory ${newDirPath} not found`, "error", 100);
    }
  }
}

function listFiles() {
  const files = getNestedDirectory(currentDirectory) || {};
  const directories = Object.keys(files).filter(key => typeof files[key] === 'object');
  const filesList = Object.keys(files).filter(key => typeof files[key] !== 'object');
  addLine(`Directories in ${currentDirectory}: ${directories.join(', ')}`, "info", 100);
  addLine(`Files in ${currentDirectory}: ${filesList.join(', ')}`, "info", 100);
}

function remove() {
  if (renderedImages.length === 0) {
    console.log('No images to remove.');
    return;
  }
  while (renderedImages.length > 0) {
    const image = renderedImages.pop();
    image.remove();
  }
  console.log('All viewed images removed.');
}

function printWorkingDirectory() {
  addLine(`Current directory: ${currentDirectory}`, "info", 100);
}
