export async function fetchCurrentUser() {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch("/users", {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    return Promise.reject(responseJson);
  }

  const newCsrfParam = response.headers.get('X-CSRF-Param');
  const newCsrfToken = response.headers.get('X-CSRF-Token')

  if ( newCsrfParam )
    document.querySelector('meta[name="csrf-param"]').content = newCsrfParam;

  if ( newCsrfToken )
    document.querySelector('meta[name="csrf-token"]').content = newCsrfToken;

  return response.json();
}

export async function signIn(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('/users/sign_in', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
    body: JSON.stringify({user: data})
  });

  if (!response.ok) {
    const responseJson = await response.json();
    return Promise.reject(responseJson);
  }

  const newCsrfParam = response.headers.get('X-CSRF-Param');
  const newCsrfToken = response.headers.get('X-CSRF-Token')

  if ( newCsrfParam )
    document.querySelector('meta[name="csrf-param"]').content = newCsrfParam;

  if ( newCsrfToken )
    document.querySelector('meta[name="csrf-token"]').content = newCsrfToken;

  return response.json();
}

export async function signOut() {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('/users/sign_out', {
    method: 'DELETE',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   }
  });

  if (!response.ok) {
    const responseJson = await response.json();
    return Promise.reject(responseJson);
  }

  const newCsrfParam = response.headers.get('X-CSRF-Param');
  const newCsrfToken = response.headers.get('X-CSRF-Token')

  if ( newCsrfParam )
    document.querySelector('meta[name="csrf-param"]').content = newCsrfParam;

  if ( newCsrfToken )
    document.querySelector('meta[name="csrf-token"]').content = newCsrfToken;

  return response;
}

export async function signUp(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('/users', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
    body: JSON.stringify({user: data})
  });

  if (!response.ok) {
    const responseJson = await response.json();
    return Promise.reject(responseJson);
  }

  const newCsrfParam = response.headers.get('X-CSRF-Param');
  const newCsrfToken = response.headers.get('X-CSRF-Token')

  if ( newCsrfParam )
    document.querySelector('meta[name="csrf-param"]').content = newCsrfParam;

  if ( newCsrfToken )
    document.querySelector('meta[name="csrf-token"]').content = newCsrfToken;

  return response;
}

export async function updateUser(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('/users', {
    method: 'PUT',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
    body: JSON.stringify({user: data})
  });

  if (!response.ok) {
    const responseJson = await response.json();
    return Promise.reject(responseJson);
  }

  const newCsrfParam = response.headers.get('X-CSRF-Param');
  const newCsrfToken = response.headers.get('X-CSRF-Token')

  if ( newCsrfParam )
    document.querySelector('meta[name="csrf-param"]').content = newCsrfParam;

  if ( newCsrfToken )
    document.querySelector('meta[name="csrf-token"]').content = newCsrfToken;

  return response;
}

export async function destroyUser() {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('/users', {
    method: 'DELETE',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    return Promise.reject(responseJson);
  }

  const newCsrfParam = response.headers.get('X-CSRF-Param');
  const newCsrfToken = response.headers.get('X-CSRF-Token')

  if ( newCsrfParam )
    document.querySelector('meta[name="csrf-param"]').content = newCsrfParam;

  if ( newCsrfToken )
    document.querySelector('meta[name="csrf-token"]').content = newCsrfToken;

  return response;
}

export async function createPassword(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('/users/password', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify({user: data}),
  });

  if (!response.ok) {
    const responseJson = await response.json();
    return Promise.reject(responseJson);
  }

  const newCsrfParam = response.headers.get('X-CSRF-Param');
  const newCsrfToken = response.headers.get('X-CSRF-Token')

  if ( newCsrfParam )
    document.querySelector('meta[name="csrf-param"]').content = newCsrfParam;

  if ( newCsrfToken )
    document.querySelector('meta[name="csrf-token"]').content = newCsrfToken;

  return response;
}

export async function updatePassword(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('/users/password', {
    method: 'PUT',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify({user: data}),
  });

  if (!response.ok) {
    const responseJson = await response.json();
    return Promise.reject(responseJson);
  }

  const newCsrfParam = response.headers.get('X-CSRF-Param');
  const newCsrfToken = response.headers.get('X-CSRF-Token')

  if ( newCsrfParam )
    document.querySelector('meta[name="csrf-param"]').content = newCsrfParam;

  if ( newCsrfToken )
    document.querySelector('meta[name="csrf-token"]').content = newCsrfToken;

  return response;
}
