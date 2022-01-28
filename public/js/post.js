

$("#postBtn").on("click", async function () {
    event.preventDefault();
    console.log('click')
    let post = {
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


$('.deleteBtn').on('click', async function () {
    event.preventDefault()
    let id = $(this).data('id')
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



$('.modalBtn').on('click', function (e) {
    const id = $(this).data("id")
    if ($(`#modal${id}`).css('display') === 'none') {
        $(`#modal${id}`).css('display', 'block')
    } else {
        $(`#modal${id}`).css('display', 'none')
    }
})

$('.updateBtn').on('click', async function () {
    const id = $(this).data("id")


    const title = $(`#newPostTitle${id}`).val()
    const content = $(`#newPostContent${id}`).val()

    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ title, content }),
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

$('.closeBtn').on('click', async function () {
    const id = $(this).data("id")
    $(`#modal${id}`).css('display', 'none')

})