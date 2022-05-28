var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

addLine('-Commands-',"command",185)
loopLines(help, "color2 margin", 186);

setTimeout(function() {
  loopLines(banner, "", 10);
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
      addLine("visitor@xanthus58.com:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "contact":
      loopLines(contact, "color2 margin", 80);
      break;
    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "vanillarenewed":
      addLine('Opening https://github.com/Xanthus58/Vanilla-Renewed/tree/Experimental',"color2", 80);
      newTab(VanillaRenewed);
      break;
    case "networkpoolcalculatorreforged":
      addLine('Opening https://github.com/Xanthus58/NetworkPoolCalculatorReforged',"color2", 80);
      newTab(NetworkPoolCalculatorReforged);
      break;
    case "stillalivereforged":
      addLine('Opening https://github.com/Xanthus58/StillAliveReforged',"color2", 80);
      newTab(StillAliveReforged);
      break;
    case "valorantrandomizer":
      addLine('Opening https://github.com/Xanthus58/Valorant-Randomizer',"color2", 80);
      newTab(ValorantRandomizer);
      break;
    case "malacyte":
      addLine('Opening https://discordbotlist.com/bots/malacyte',"color2", 80);
      newTab(malacyte);
      break;
    case "cctweakedscripts":
      addLine('Opening https://github.com/Xanthus58/CC-Tweaked-Scripts',"color2", 80);
      newTab(CCTweakedScripts);
      break;
    case "cliadventuregame":
      addLine('Opening https://github.com/Xanthus58/CLI-Adventure-Game',"color2", 80);
      newTab(CLIAdventureGame);
      break;
    case "rockpaperscissorscli":
      addLine('Opening https://github.com/Xanthus58/Rock-Paper-Scissors-CLI',"color2", 80);
      newTab(RockPaperScissorsCLI);
      break;
    case "affirmationrequester":
      addLine('Opening https://github.com/Xanthus58/Affirmation-Requester',"color2", 80);
      newTab(AffirmationRequester);
      break;
    case "stanlysterminal":
      addLine('Opening https://github.com/Xanthus58/Stanlys_Terminal',"color2", 80);
      newTab(StanlysTerminal);
      break
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      loopLines(banner, "", 80);
      break;
    case "cls":
    setTimeout(function() {
      terminal.innerHTML = '<a id="before"></a>';
      before = document.getElementById("before");
    }, 1);
    loopLines(banner, "", 80);
    break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    // socials
    case "twitter":
      addLine("Opening Twitter...", "color2", 0);
      newTab(twitter);
      break;
    case "instagram":
      addLine("Opening Instagram...", "color2", 0);
      newTab(instagram);
      break;
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
    case "email":
      addLine('Opening Email', "color2", 0);
      newTab(email);
      break;
    case "discord":
      addLine('Opening Discord',"color2", 0);
      newTab(discord);
      break;
    default:
      addLine("Command not found. For a list of commands, type <span class=\"command\">help</span>.</span>", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
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