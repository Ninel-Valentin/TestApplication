import { setCookie, getCookie, deleteCookie } from './utils/cookieService.js';

function addQuestion(form) {
    const existingQ = getCookie('questions');
    var existingJson = JSON.parse(existingQ);

    if (form.checkValidity()) {
        if (!existingJson || !existingJson.filter(x => x.q == form.question.value).length) {
            existingJson = existingJson || [];
            existingJson.push({
                q: form.question.value,
                a: form.answer.value
            });
        } else {
            const replaceAnswer = confirm(`Question already exists. Want to replace the answer?`);
            if (replaceAnswer)
                existingJson.map(x => {
                    return {
                        q: x.q,
                        a: (
                            x.q == form.question.value ?
                                form.answer.value
                                : x.a
                        )

                    };
                })
        }

        const newJsonString = JSON.stringify(existingJson);
        setCookie('questions', newJsonString, 30);
        form.question.value = '';
        form.answer.value = '';
        alert('Question added successfully!');
    }
}

document.querySelector('#submitQ').addEventListener('click', (e) => addQuestion(e.target.form));