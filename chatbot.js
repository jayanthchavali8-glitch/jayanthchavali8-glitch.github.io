// Jayanth Chavali portfolio — lightweight FAQ assistant
// Rule-based (no external API calls) so it works on any static host.
// Answers common recruiter questions instantly; anything else routes to email.

(function () {
  var EMAIL = "jayanthchavali9@gmail.com";

  var FAQ = [
    {
      keywords: ["experience", "years", "how long", "background"],
      answer: "Jayanth has 8 years of global experience across manufacturing, automotive, MedTech and building materials — spanning UAE, India, USA and Germany."
    },
    {
      keywords: ["visa", "sponsor", "relocation", "relocate", "move"],
      answer: "Jayanth is based in the UAE and open to relocation for the right role. For specifics on visa sponsorship needs, it's best to email directly."
    },
    {
      keywords: ["skill", "capabilit", "expertise", "good at", "strength"],
      answer: "Core strengths are Digital Strategy & Roadmapping, ERP/PLM Transformation, Operations & Supply Chain Value, and Change Management. See the <a href=\"skills.html\">Capabilities</a> page for details."
    },
    {
      keywords: ["case study", "case studies", "project", "example", "impact", "result"],
      answer: "There are 4 detailed case studies covering RAK Ceramics, Tata Technologies, Conformis, and Linkwell Telesystems — see the <a href=\"case-studies.html\">Case Studies</a> page."
    },
    {
      keywords: ["role", "current job", "current role", "working now", "rak"],
      answer: "Jayanth is currently a Project Manager / Digital Transformation Manager (PMO) at RAK Ceramics, leading working-capital and Order-to-Cash transformation programs."
    },
    {
      keywords: ["education", "degree", "mba", "study", "university"],
      answer: "Jayanth holds an MBA in Business & Data Science and a B.Tech in Mechanical Engineering. See the <a href=\"skills.html\">Capabilities</a> page for more."
    },
    {
      keywords: ["certification", "certified", "pmp", "six sigma"],
      answer: "Certifications are listed on the <a href=\"skills.html\">Capabilities</a> page — check there for the most current list."
    },
    {
      keywords: ["industry", "industries", "sector"],
      answer: "Experience spans manufacturing, automotive, MedTech, and building materials/ceramics."
    },
    {
      keywords: ["contact", "email", "reach", "hire", "talk", "connect"],
      answer: "Best way to reach Jayanth is by email: <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a>."
    },
    {
      keywords: ["resume", "cv"],
      answer: "A downloadable résumé link is on the <a href=\"contact.html\">Contact</a> page. If it's not there yet, email directly and request one."
    }
  ];

  var FALLBACK =
    "I'm a simple FAQ assistant, so I don't have a good answer for that. " +
    "For anything specific, please email Jayanth directly at " +
    "<a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> — he'll get back to you.";

  var GREETING =
    "Hi! I'm a quick FAQ assistant for Jayanth's portfolio. Ask me about his experience, " +
    "skills, current role, or how to get in touch — or tap a question below.";

  function findAnswer(text) {
    var lower = text.toLowerCase();
    for (var i = 0; i < FAQ.length; i++) {
      var kws = FAQ[i].keywords;
      for (var j = 0; j < kws.length; j++) {
        if (lower.indexOf(kws[j]) !== -1) return FAQ[i].answer;
      }
    }
    return FALLBACK;
  }

  function buildWidget() {
    var toggle = document.createElement("div");
    toggle.id = "jc-chat-toggle";
    toggle.setAttribute("aria-label", "Open FAQ assistant");
    toggle.textContent = "\uD83D\uDCAC"; // speech bubble
    document.body.appendChild(toggle);

    var panel = document.createElement("div");
    panel.id = "jc-chat-panel";
    panel.innerHTML =
      '<div id="jc-chat-head"><div>Ask about Jayanth<span class="sub">FAQ ASSISTANT · NOT LIVE AI</span></div><button id="jc-chat-close" aria-label="Close">\u2715</button></div>' +
      '<div id="jc-chat-body"></div>' +
      '<div id="jc-chat-quick"></div>' +
      '<form id="jc-chat-form"><input id="jc-chat-input" type="text" placeholder="Type a question..." autocomplete="off"><button id="jc-chat-send" type="submit">Send</button></form>';
    document.body.appendChild(panel);

    var body = panel.querySelector("#jc-chat-body");
    var quick = panel.querySelector("#jc-chat-quick");
    var input = panel.querySelector("#jc-chat-input");
    var form = panel.querySelector("#jc-chat-form");

    function addMsg(text, who) {
      var div = document.createElement("div");
      div.className = "jc-msg " + who;
      div.innerHTML = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    var quickQuestions = [
      "Years of experience?",
      "Current role?",
      "Visa / relocation?",
      "How to contact?"
    ];
    quickQuestions.forEach(function (q) {
      var chip = document.createElement("span");
      chip.className = "jc-chip";
      chip.textContent = q;
      chip.addEventListener("click", function () {
        addMsg(q, "user");
        addMsg(findAnswer(q), "bot");
      });
      quick.appendChild(chip);
    });

    var greeted = false;
    toggle.addEventListener("click", function () {
      panel.classList.toggle("open");
      if (panel.classList.contains("open") && !greeted) {
        addMsg(GREETING, "bot");
        greeted = true;
      }
    });
    panel.querySelector("#jc-chat-close").addEventListener("click", function () {
      panel.classList.remove("open");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = input.value.trim();
      if (!val) return;
      addMsg(val, "user");
      addMsg(findAnswer(val), "bot");
      input.value = "";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }
})();
