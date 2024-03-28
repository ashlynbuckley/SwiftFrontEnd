let newComment = document.getElementById('newComment').value.trim();
let urlParams = new URLSearchParams(window.location.search);
let threadId = urlParams.get('id');

// Function to add a new Comment
async function addComment() {
    try {
        // Ensure Input Comment isn't empty
        if (newComment !== '') {
            // Retrieve JWT token from local storage, and check if the Token exists
            const jwToken = localStorage.getItem('jwToken-access');
            if (!jwToken) {
                console.error('JWT Token not found!');
                return;
            }

            // Make a POST request to add a new comment
            await fetch(`https://createthread-pgktbhms6a-uc.a.run.app/`, {
                method: 'POST',
                // Request is in JSON format
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwToken}`,
                },
                body: JSON.stringify({
                    threadId: threadId,
                    content: newComment
                }),
            });

            // Reset Input Areas and refresh Thread.
            document.getElementById('newComment').value = '';
            refreshThread();
        }
    } catch (error) { console.error('Error adding Comment! ', error); }
}

// Function to update Thread Data
async function refreshThread() {
    try {
        // Retrieve JWT token from local storage, and check if the Token exists
        const jwToken = localStorage.getItem('jwToken-access');
        if (!jwToken) { return; }

        // Make a GET request to fetch thread data
        const response = await fetch('https://getthreads-pgktbhms6a-uc.a.run.app/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwToken}`,
            },
        });
        const allThreads = await response.json();
        const threadData = allThreads.find(thread => thread.id == threadId);

        // Ensure Thread data is received
        if (threadData) {
            document.getElementById('threadTitle').innerText = threadData.title;
            document.getElementById('threadAuthor').innerText = `Posted by ${threadData.author} on ${threadData.timestamp}`;
            document.getElementById('threadBody').innerText = threadData.content;
            // Call updateComments with threadId
            updateComments();
        } else { console.log('Thread ' + threadId + ' not found!'); }
    } catch (error) { console.error('Error updating Thread! ', error); }
}

// Function to update the Comments display
async function updateComments() {
    try {
        // Retrieve JWT token from local storage, and check if the Token exists
        const jwToken = localStorage.getItem('jwToken-access');
        if (!jwToken) {
            console.error('JWT Token not found!');
            return;
        }

        // Make a GET request to fetch comments for the thread
        const response = await fetch(`https://getcomments-pgktbhms6auc.a.run.app/${threadId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwToken}`,
            },
        });

        const comments = await response.json();
        const commentList = document.getElementById('commentList');
        commentList.innerHTML = '';

        // Display each Comment using the following HTML
        comments.forEach(comment => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="commentTop">
                    By ${comment.author} on ${new Date(comment.timestamp).toLocaleString()}
                </div>
                <div class="commentBottom">
                    ${comment.content}
                </div>
                <button id="deleteCommentButton" onclick="deleteComment(${comment.id})"> Delete Comment </button>
            `;
            commentList.appendChild(li);
        });

        // Update Comment Count
        document.getElementById('commentCount').innerText = `Comments (${comments.length})`;
    } catch (error) { console.error('Error updating Comments! ', error); }
}

async function deleteThread() {
    try {
        // Retrieve JWT token from local storage, and check if the Token exists
        const jwToken = localStorage.getItem('jwToken-access');
        if (!jwToken) {
            console.error('JWT Token not found!');
            return;
        }
            // Make a POST request to add a new comment
        await fetch(`https://deletethread-pgktbhms6a-uc.a.run.app/`, {
            method: 'POST',
            // Request is in JSON format
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwToken}`,
            },
            body: JSON.stringify({
                threadId: threadId,
            }),
        });
        window.location.href = "/forum/forum.html"; // Redirect to forum.html
        return;
    } catch (error) { console.error('Error deleting Thread! ', error); } 
}

async function deleteComment(commentId) {
    try {
        // Retrieve JWT token from local storage, and check if the Token exists
        const jwToken = localStorage.getItem('jwToken-access');
        if (!jwToken) {
            console.error('JWT Token not found!');
            return;
        }
        // Make a POST request to add a new comment
    await fetch(`https://deletecomment-pgktbhms6a-uc.a.run.app/`, {
        method: 'POST',
        // Request is in JSON format
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwToken}`,
        },
        body: JSON.stringify({
            commentId: commentId,
        }),
    });
    window.location.href = "/forum/forum.html"; // Redirect to forum.html
    return;
} catch (error) { console.error('Error deleting Thread! ', error); } 
}

document.getElementById('deleteThreadButton').addEventListener('click', deleteThread);
document.getElementById('addCommentButton').addEventListener('click', addComment);
document.addEventListener('DOMContentLoaded',  refreshThread);


//dynamic navbar
function loggedin() {
    if (localStorage.getItem("SwiftUserSignedIn") === 'true') {
        document.getElementById("temp").innerHTML = "Log Out";
        document.getElementById("temp").name = "logOut";
        document.getElementById("temp").href = "/landing/landing.html";
        document.getElementById("timer").href = "/personal/personal.html";
        document.getElementById("forum").href = "/forum/forum.html";
        document.getElementById("settings").href = "/settings/settings.html";
    }
    else {
        document.getElementById("temp").innerHTML = "Sign Up";
        document.getElementById("temp").href = "/signUp/signUp.html";
        document.getElementById("temp").name = "signOut";
        document.getElementById("timer").href = "/signUp/signUp.html";
        document.getElementById("forum").href = "/signUp/signUp.html";
        document.getElementById("settings").href = "/signUp/signUp.html";
    }
}
function loggedOut() {
    if (document.getElementById("temp").name === "logOut") {
        localStorage.setItem("logOut",true);
        localStorage.setItem("landing",false);
    }
}

window.onload = loggedin;