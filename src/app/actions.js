'use server';

async function getGitHubStars() {
  const API_URL = 'https://api.github.com/repos/neondatabase/neon';
  const response = await fetch(API_URL, { next: { revalidate: 60 * 60 * 12 } });
  if (response.status >= 400) {
    throw new Error('Error fetching GitHub stars');
  }

  const json = await response.json();

  return json.stargazers_count;
}

export default getGitHubStars;
