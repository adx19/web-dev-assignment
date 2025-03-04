import React from 'react'

function UserCard({data, topRepos}) {
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num;
    }
  }
  
  return (
    <>
    <div className='rounded-3xl shadow-2xl box-content p-6 bg-indigo-950 text-indigo-50 flex flex-col items-center font-bold mx-auto max-w-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl'>
      <img src={data.avatar_url} className='w-32 h-32 rounded-full ' alt='Avatar'></img>
      <div className='w-full flex flex-col items-center'>
        <h3 className='text-2xl font-bold'>{data.name}</h3>
        <h4 className='text-lg italic'>{data.login}</h4>
        <h4 className='text-lg'>{data.company || "Not Available"}</h4>
        <h5>{data.bio || "Not Available"}</h5>
        <div className='mt-4 space-x-4'>
          <a href={data.html_url} target="_blank" className='text-blue-500 hover:underline'>GitHub Profile Link</a>
          <a href={data.blog} target="_blank" className='text-blue-500 hover:underline'>Website/Blog</a>
        </div>
      </div>
    </div>
    <div className='flex justify-center gap-10 mt-10'>
    <div className="rounded-3xl shadow-2xl box-content p-10  bg-indigo-950 text-indigo-50 flex flex-col justify-left items-start font-bold mt-10 max-w-4xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h1 className='text-xl'>Public Repos: {data.public_repos}</h1>
      <h1 className='text-xl'>Followers: {formatNumber(data.followers)}</h1>
      <h1 className='text-xl'>Following: {formatNumber(data.following)}</h1>
      <h1 className='text-xl'>Public Gists: {data.public_gists}</h1>
    </div>
    <div className="rounded-3xl shadow-2xl box-content p-10 bg-indigo-950 text-indigo-50 flex flex-col justify-left items-start mt-10 font-bold max-w-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h1 className='text-xl'>Joined: {new Date(data.created_at).toLocaleDateString()}</h1>
      <h1 className='text-xl'>Last Active: {new Date(data.updated_at).toLocaleDateString()}</h1>
    </div>
    </div>
    <div className='rounded-3xl shadow-2xl box-content p-6 bg-indigo-950 text-indigo-50 flex flex-col items-start font-bold mx-auto max-w-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl mt-10'>
      <h1 className='text-xl '>Top Repositories:</h1>
      <ul className='text-xl ml-10'>
      {topRepos.map((repo) => (
          <li>
            <a href={repo.html_url} className="text-blue-300">{repo.name}</a> ⭐ {formatNumber(repo.stargazers_count)}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default UserCard


/*Profile Info:
Statistics:

Key Dates:

Joined GitHub: Account creation date (created_at)
Last Active: Date of last activity (updated_at)
*/