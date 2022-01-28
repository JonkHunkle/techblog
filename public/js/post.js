console.log('POST JS LOADED!!')
$("#postBtn").on("click", async function () {
    event.preventDefault();
    console.log('click')
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
        id: $('#commentBtn').data("id")
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


$('#deleteBtn').on('click', async () => {
    event.preventDefault()
    let id = $('#deleteBtn').data('id')
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        document.location.reload();
        console.log("success", response)
    } else {
        console.log('Failed to post.');
    }
})