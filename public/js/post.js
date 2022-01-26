$("#postBtn").on("click", async function () {
    event.preventDefault();

    post = {
        postTitle: $('#postTitle').val(),
        postContent: $('#postContent').val()
    }

    if (post) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
            console.log("success", response)
        } else {
            console.log('Failed to post.');
        }
    }
})

$("#commentBtn").on("click", async function () {
    event.preventDefault();
    console.log('click')

    comment = {
        new_comment: $('#newComment').val(),
        id: $(this).data("id")
    }
    console.log(comment)
    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('new comment', comment)
        if (response.ok) {
            document.location.reload();
            console.log("success", response)
        } else {
            console.log('Failed to post.');
        }
    }
})
