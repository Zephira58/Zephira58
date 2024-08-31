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
    remove()
  }},
  'cls': { action: () => {
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById("before");
    loopLines(banner, "", 80);
    remove()
  }},
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
  // Specific awards commands
  'activedeveloper': { action: newTab, args: [awards.activedeveloper] },
  'rsa': { action: newTab, args: [awards.rsa] },
  //Filesystem commands
  'view': { action: view, args: ["https://avatars.githubusercontent.com/u/66909997?v=4"] },
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
  for (let i = images.length - 1; i >= 0; i--) {
    deleteImage(images[i]);
  }
}

function commander(cmd) {
  const commandAction = commandMap[cmd.toLowerCase()];
  if (commandAction) {
    if (Array.isArray(commandAction.args)) {
      commandAction.action(...commandAction.args);
    } else {
      commandAction.action(commandAction.args);
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

// Array to keep track of rendered images
let renderedImages = [];
// Function to handle the "view" command
async function view(url) {
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

// Function to remove all rendered images
function remove() {
  if (renderedImages.length === 0) {
    console.log('No images to remove.');
    return;
  }

  // Iterate over the array and remove each image from the DOM
  while (renderedImages.length > 0) {
    const image = renderedImages.pop();
    image.remove();
  }

  console.log('All viewed images removed.');
}