const addUserForm = document.getElementById('addUserForm');

function notifyResponse(status) {
    document.getElementById('notificationContainer').innerHTML = status;
}

function createSubmitData(form) {
    const submitData = {}
    const formData = new FormData(form);

    // Serialize form data
    formData.forEach(function (val, key) {
        submitData[key] = val;
    })

    return submitData;
}

addUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitData = createSubmitData(e.target);

    axios.post('/api/addNewUser', submitData)
        .then(function (res) {
            console.log('POST /api/addNewUser response: ', res);

            notifyResponse(res.data.userNotification);
        });
});