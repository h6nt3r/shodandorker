function toggleTheme() {
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

// On page load, apply saved theme
window.onload = function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-mode');
};


function getKeywordss(){
    $.get($('#urla').val(), function(resp) {
        document.getElementById('keywords1').value = resp;
    });
}

function Generate() {
    const payloads = document.getElementById("keywords1").value.trim().split("\n");
    const target = document.getElementById("targets").value.trim().replace(/^"+|"+$/g, '');
    const resultsDiv = document.getElementById("results");
    let resultHTML = "";

    payloads.forEach((line, index) => {
        let modifiedLine = "";
        let isMatched = false;

        // যদি example.com থাকে, তাহলে সেটি replace করে দাও
        if (/example\.com/i.test(line)) {
            modifiedLine = line.replace(/example\.com/gi, target);
            isMatched = true;
        } else {
            // না থাকলে: hostname:"target" + dork
            modifiedLine = `hostname:"${target}" ${line}`;
        }

        const encodedURL = "https://www.shodan.io/search?query=" + encodeURIComponent(modifiedLine);

        resultHTML += `
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" id="check${index}">
                <label class="form-check-label" for="check${index}">
                    <a href="${encodedURL}" 
                       target="_blank" 
                       class="text-decoration-none"
                       onclick="document.getElementById('check${index}').checked = true;">
                        ${modifiedLine}
                    </a>
                </label>
            </div>
        `;
    });

    resultsDiv.innerHTML = resultHTML;
}
function ResetDorkResults() {
    document.getElementById("keywords1").value = "";
    document.getElementById("results").innerHTML = "";
}
