const csrfToken = document.querySelector("meta[name=csrf-token]").content;

async function customFetch(url, options = {}) {
  options.headers = {
    // Your code here
    "X-CSRF-Token": csrfToken, 
    "Accept": "application/json", 
    ...options.headers
  };

  const response = await fetch(url, options);
  if(response.ok){
    return response.json();
  } else {
    throw response;
  }
}

export function fetchTweets(options = {}) {
  const queryParams = new URLSearchParams(options);
  return customFetch(`/tweets?${queryParams}`, {
    method: 'GET'
  });
}

export function followUser(id){
  return customFetch(`/users/${id}/follow`, {
    method: "POST"
  });
}

export function unfollowUser(id){
  return customFetch(`/users/${id}/follow`, {
    method: "DELETE"
  });
}

export function searchUsers(query) {
  // const queryParams = new URLSearchParams(query);
  return customFetch(`/users/search?query=${query}`, {
    method: "GET"
  });
}