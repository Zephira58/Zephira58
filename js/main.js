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
  // Filesystem commands
  'view': { action: view },
  'cd': { action: changeDirectory },
  'ls': { action: listFiles },
  'pwd': { action: printWorkingDirectory },
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
let currentDirectory = 'img'; // Start at the root

const fileSystem = {
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
      'sky-children-of-light': {
        '20231125231102_1.jpg': 'image_url',
        '20231125231326_1.jpg': 'image_url',
        '20231125231459_1.jpg': 'image_url',
        '20231125231836_1.jpg': 'image_url',
        '20231125231912_1.jpg': 'image_url',
        '20231125231916_1.jpg': 'image_url',
        '20231126133635_1.jpg': 'image_url',
        '20231126133723_1.jpg': 'image_url',
        '20231126134631_1.jpg': 'image_url'
      }
    }
  }
};


async function view(...args) {
  // If no arguments are provided, use the currentDirectory
  const path = args.length > 0 ? args.join(' ').trim() : `${currentDirectory}`; 
  const fullPath = path.startsWith('~/') ? path.slice(2) : path;

  if (fullPath.includes('.')) { // Assume file if there's a dot in the path
    const url = `https://raw.githubusercontent.com/Zephira58/Zephira58/dev${fullPath}`;
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
      const url = `https://raw.githubusercontent.com/Zephira58/Zephira58/dev/${fullPath}/${img}`;
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
      currentDirectory = '' + pathParts.join('/');
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
