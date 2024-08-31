var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
var commands = [];
var commandMap = {
  'awards': { action: loopLines, args: [awards, "color2 margin", 80] },
  'experience': { action: loopLines, args: [experience, "color2 margin", 80] },
  'help': { action: loopLines, args: [help, "color2 margin", 80] },
  'whois': { action: loopLines, args: [whois, "color2 margin", 80] },
  'cloud': { action: newTab, args: ["https://cloud.zephira.uk/"] },
  'contact': { action: loopLines, args: [contact, "color2 margin", 80] },
  'projects': { action: loopLines, args: [projects, "color2 margin", 80] },
  'history': { action: () => {
    addLine("<br>", "", 0);
    loopLines(commands, "color2", 80);
    addLine("<br>", "command", 80 * commands.length + 50);
  }},
  'clear': { action: () => {
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById("before");
    loopLines(banner, "", 80);
  }},
  'cls': { action: () => {
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById("before");
    loopLines(banner, "", 80);
  }},
  // Add additional commands here in a similar way
};

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
