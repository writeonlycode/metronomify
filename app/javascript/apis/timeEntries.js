export async function indexTimeEntries() {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('api/time_entries/', {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    // return Promise.reject(responseJson);
    throw new Error(responseJson)
  }

  return response.json();
}

export async function showTimeEntry({ id }) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('api/time_entries/' + id, {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    // return Promise.reject(responseJson);
    throw new Error(responseJson)
  }

  return response.json();
}

export async function createTimeEntry(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('api/time_entries/', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
    body: JSON.stringify({time_entry: data})
  });

  if (!response.ok) {
    const responseJson = await response.json();
    // return Promise.reject(responseJson);
    throw new Error(responseJson)
  }

  return response.json();
}

export async function updateTimeEntry(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('api/time_entries/' + data.id, {
    method: 'PUT',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
    body: JSON.stringify({time_entry: data})
  });

  if (!response.ok) {
    const responseJson = await response.json();
    // return Promise.reject(responseJson);
    throw new Error(responseJson)
  }

  return response.json();
}

export async function destroyTimeEntry({ id }) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const response = await fetch('api/time_entries/' + id, {
    method: 'DELETE',
    headers: {
     'Content-Type': 'application/json',
     'X-CSRF-Token': csrfToken,
   },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    // return Promise.reject(responseJson);
    throw new Error(responseJson)
  }

  return response;
}
