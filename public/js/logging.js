$("#sign-up-btn").on("click", async function () {
    event.preventDefault();

    signup = {
        first_name: $('#new-first-name').val(),
        last_name: $('#new-last-name').val(),
        username: $('#new-username').val(),
        email: $('#new-email').val(),
        password: $('#new-password').val()
    };

    if (signup) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ signup }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dash');
            console.log("success", response)
        } else {
            console.log('Failed to sign up.');
        }
    }
})


$("#login-btn").on("click", async function () {
    event.preventDefault();

    login = {
        email: $('#email-login').val(),
        password: $('#password-login').val()
    }

    if (login) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ login }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            console.log("success", response)
        } else {
            console.log('Failed to sign up.');
        }
    }
})

$("#logout").on("click", async function () {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert("You have logged out!")
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
})