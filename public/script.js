const newBtn = document.getElementById("newbtn");
const editBtns = document.querySelectorAll(".fa-edit");
const addFriendForm = document.getElementById("add-friend");
const editFriendForm = document.getElementById("edit-friend");
const friendList = document.querySelector('.friendlist');
const inputs = document.querySelectorAll("#add-friend input:not([type=submit])");

async function displayFriends() {
    try {
        const response = await fetch('/api/friends');
        const friends = await response.json();

        friends.forEach(friend => {
            const { id, fname, lname, email, facebook, twitter, instagram, linkedin } = friend;

            const theListItem = document.createElement("li");
            theListItem.setAttribute("id", `r-${id}`);
            theListItem.innerHTML = `<div class="name">${fname} ${lname}</div>
            <div class="email">
                <i class="fas fa-envelope-square"></i> ${email}
            </div>
            <div class="social">
                <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
            </div>
            <i class="fas fa-edit" id="e-${id}"></i>
            <i class="fas fa-times-circle" id="d-${id}"></i>`;

            friendList.append(theListItem);
        });
    } catch (err) {
        console.error('Error loading friends:', err);
    }
}

displayFriends();

newBtn.addEventListener("click", function(event){
    event.preventDefault();
    addFriendForm.className = "add-friend-onscreen";
})



addFriendForm.addEventListener("submit", function(event){
    event.preventDefault();
    addFriend();
});

async function addFriend() {
    const newFriend = {};

    for (let i = 0; i < inputs.length; i++) {
        let key = inputs[i].getAttribute('name');
        let value = inputs[i].value;
        newFriend[key] = value;
    }

    if (newFriend.fname && newFriend.lname && newFriend.email) {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFriend)
            });

            if (!response.ok) throw new Error("Failed to add friend");

            resetFormFields();
            addFriendForm.className = "add-friend-offscreen";
            friendList.innerHTML = '';
            displayFriends();

        } catch (error) {
            console.error("Error submitting friend:", error);
        }
    } else {
        addFriendForm.className = "add-friend-offscreen";
    }
}

document.addEventListener('click', function (event) {

	if (event.target.matches('.fa-edit')) { 
        thisRecord = event.target.getAttribute('id').slice(2);
        setForm(thisRecord);
	}

    if (event.target.matches('.fa-times-circle')) {
            thisRecord = event.target.getAttribute('id').slice(2);
            deleteRecord(thisRecord);
}

}, false);

async function setForm(recordId) {
    try {
        const response = await fetch(`/api/friends/${recordId}`);
        if (!response.ok) throw new Error('Friend not found');

        const friend = await response.json();

        document.getElementById("fname-edit").value = friend.fname || '';
        document.getElementById("lname-edit").value = friend.lname || '';
        document.getElementById("email-edit").value = friend.email || '';
        document.getElementById("facebook-edit").value = friend.facebook || '';
        document.getElementById("twitter-edit").value = friend.twitter || '';
        document.getElementById("instagram-edit").value = friend.instagram || '';
        document.getElementById("linkedin-edit").value = friend.linkedin || '';

        editFriendForm.className = "edit-friend-onscreen";
    } catch (error) {
        console.error('Error loading friend for editing:', error);
    }
}

editFriendForm.addEventListener("submit", function(event){
    event.preventDefault();
    updateRecord(thisRecord);
});

async function updateRecord(recordId) {
    const theFields = document.querySelectorAll("#edit-friend input:not([type=submit])");
    const editedRecord = {};
    let key, value;

    for (let i = 0; i < theFields.length; i++) {
        key = theFields[i].getAttribute("name");
        value = theFields[i].value;
        editedRecord[key] = value;
    }

    try {
        const response = await fetch(`/api/friends/${recordId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedRecord)
        });

        if (!response.ok) throw new Error('Failed to update friend');

        editFriendForm.className = "edit-friend-offscreen";
        friendList.innerHTML = '';
        displayFriends();
    } catch (error) {
        console.error('Error updating friend:', error);
    }
}

async function deleteRecord(recordId) {
    const youAreSure = confirm('Are you sure you want to delete this record?');
    if (!youAreSure) return;

    try {
        const response = await fetch(`/api/friends/${recordId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Animate and remove the deleted item from the DOM
            const element = document.getElementById(`r-${recordId}`);
            element.classList.add('remove'); // Add transition class
            setTimeout(() => {
                element.remove();
            }, 1500);
        } else {
            console.error('Failed to delete friend');
        }
    } catch (error) {
        console.error('Error deleting friend:', error);
    }
}

function resetFormFields(){
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("fbook").value = "https://facebook.com";
    document.getElementById("twitter").value = "https://twitter.com";
    document.getElementById("insta").value = "https://instagram.com";
    document.getElementById("linkedin").value = "https://linkedin.com";
}

