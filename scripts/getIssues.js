/*
    ,-.       _,---._ __  / \
    /  )    .-'       `./ /   \
    (  (   ,'            `/    /|
    \  `-"             \'\   / |
    `.              ,  \ \ /  |
    /`.          ,'-`----Y   |
    (            ;        |   '
    |  ,-.    ,-'         |  /
    |  | (   |        hjw | /
    )  |  \  `.___________|/
    `--'   `--' 

    https://www.ludd.ltu.se/~vk/pics/ascii/junkyard/techstuff/tutorials/Hayley_Wakenshaw.html

    Kanskje jeg kommer tilbake til dette en gang for å teste aria-busy, 
    så jeg tar vare på det :D 

*/

import { Octokit } from "https://esm.sh/octokit";

export async function getIssues(element, owner = "lmfaole", repo = "blog", state = "closed", labels = "leseliste", sorting = "updated" || "ee") {
    const readingList = document.getElementById(element);
    const octokit = new Octokit();

    const issueHeaders = JSON.parse(localStorage.getItem("octokit-header"));
    if (issueHeaders["x-ratelimit-remaining"] !== 0) {
        try {
            readingList.setAttribute("aria-busy", "true");
            const issues = await octokit
                .request("GET /repos/{owner}/{repo}/issues", {
                    owner: owner,
                    repo: repo,
                    headers: {
                        "X-GitHub-Api-Version": "2022-11-28",
                    },
                    state: state,
                    labels: labels,
                    sort: sorting,
                    per_page: 10,
                }).then((Response) => {
                    return Response.data.forEach((issue) => {
                        const readingListItem = document.createElement("article");
                        readingListItem.innerHTML = `
              <a href="${issue.html_url}" class="card-heading">${issue.title
                            }</a>
             <footer class="card-footer">
              <dl id=temaer-${issue.id} data-layout="horizontal">
                <dt>Lest</>
                <dd>${new Date(issue.closed_at).toLocaleDateString("no", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}</dd>
                </dl>
                </footer>
            `;

                        readingList.appendChild(readingListItem);
                        const labelList = document.querySelector(`#temaer-${issue.id}`);

                        if (issue.labels.length > 1) {
                            issue.labels.forEach((label) => {
                                if (!labels.includes(label)) {
                                    const labelHeading = document.createElement("dt");
                                    const labelElement = document.createElement("dd");

                                    labelHeading.innerText = "Teamer";
                                    labelList.append(labelHeading);
                                    labelElement.innerText = `${label.name}`;
                                    labelList.append(labelElement);
                                }
                            });
                        }
                    })
                }
                );

            localStorage.setItem("octokit-header", JSON.stringify(issues.headers));
            readingList.setAttribute("aria-busy", "false");
        } catch (error) {
            const readingListErrorDetails = document.createElement("details");
            readingListErrorDetails.setAttribute("lang", "en");
            readingListErrorDetails.className = "error-details";

            const readingListErrorDetailsSummary = document.createElement("summary");
            readingListErrorDetailsSummary.setAttribute("lang", "no");
            readingListErrorDetailsSummary.innerText = "Klarte ikke å hente liste";

            readingListErrorDetails.innerHTML = `<small>${error}</small><button onclick="getIssues(${element})">Hent på nytt</button>`;

            readingListErrorDetails.appendChild(readingListErrorDetailsSummary);
            readingList.appendChild(readingListErrorDetails);

            readingList.setAttribute("aria-busy", "false");
        }


    }

    else {
        const relativeTime = new Intl.RelativeTimeFormat({ style: "long", numeric: "auto" });
        const now = new Date();
        const reset = new Date(0);
        reset.setUTCSeconds(issueHeaders["x-ratelimit-reset"]);
        const diff = reset - now;
        console.log(reset);
        console.log(relativeTime.format(reset / 60, "minutes"));
        /*         const diffString = `${diff.toLocaleTimeString({ hour: "2-digit" })} time, ${diff.toLocaleTimeString("nb-no", { minute: "2-digit" })} minutter, ${diff.toLocaleTimeString("nb-no", { second: "2-digit" })} sekunder.`;
         */
        const readingListErrorDetails = document.createElement("details");
        readingListErrorDetails.setAttribute("lang", "en");
        readingListErrorDetails.className = "error-details";

        const readingListErrorDetailsSummary = document.createElement("summary");
        readingListErrorDetailsSummary.setAttribute("lang", "no");
        readingListErrorDetailsSummary.innerText = "For mange forsøk på kort tid";

        readingListErrorDetails.innerHTML = `<p>Prøv igjen om ${diffString}<small>(${reset.toLocaleTimeString()})</small></p><button onclick="getIssues(${element})" disabled>Hent på nytt</button>`;

        readingListErrorDetails.appendChild(readingListErrorDetailsSummary);
        readingList.appendChild(readingListErrorDetails);

        readingList.setAttribute("aria-busy", "false");
    }
}