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

    axios.post('newUser', submitData)
        .then(function (res) {
            notifyResponse(res.data.userNotification);
        });
});