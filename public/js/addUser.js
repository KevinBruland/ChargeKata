const addUserForm = document.getElementById('addUserForm');

function notifyResponse(status) {
    document.getElementById('notificationContainer').innerHTML = status;
}

addUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitData = {}
    const formData = new FormData(e.target);

    // Serialize form data
    formData.forEach(function (val, key) {
        submitData[key] = val;
    })

    fetch("/api/addNewUser", {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        notifyResponse(data.userNotification);
    });
});