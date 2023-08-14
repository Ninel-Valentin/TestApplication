import { setCookie, getCookie, deleteCookie } from './utils/cookieService.js';

function LoadQuestions() {
    const existingQ = getCookie('questions');
    var existingJson = JSON.parse(existingQ);

    const tableBody = document.querySelector('table#existingQuestions tbody');

    for (let questionJson of existingJson) {
        let tr = document.createElement('tr');

        let tdQ = document.createElement('td');
        tdQ.innerText = questionJson.q;

        let tdA = document.createElement('td');
        tdA.innerText = questionJson.a;

        let tdDel = document.createElement('td');
        tdDel.innerText = '🚮';
        tdDel.setAttribute('data-q', questionJson.q);
        tdDel.className = 'deleteRow'

        tdDel.onclick = (e) => {
            const question = e.target.getAttribute('data-q');
            if (confirm("Are you sure you want to delete this question?")) {
                existingJson = existingJson.filter(x => x.q != question);

                const newJsonString = JSON.stringify(existingJson);
                setCookie('questions', newJsonString, 30);
                alert('Question removed successfully!');

                const rowOfDeleted = e.target.parentNode;
                tableBody.removeChild(rowOfDeleted);
            }
        }

        tr.appendChild(tdQ);
        tr.appendChild(tdA);
        tr.appendChild(tdDel);

        tableBody.appendChild(tr);
    }
}

LoadQuestions();