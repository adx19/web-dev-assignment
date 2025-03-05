export async function fetchData(username) {
  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `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`, // Add 'Bearer' here
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}

export async function fetchRepoData(username) {
  const repoUrl = `https://api.github.com/users/${username}/repos`;

  try {
    const repoResponse = await fetch(repoUrl, {
      headers: {
        'Authorization': `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`, // Add 'Bearer' here
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!repoResponse.ok) {
      throw new Error("Failed to fetch Repository Data");
    }

    let repoData = await repoResponse.json();
    repoData = repoData
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);
    return repoData;
  } catch (error) {
    console.error("Failed to load repository data", error);
  }
}
