import React, { useState, useEffect } from 'react';
import { GitFork, Star, ExternalLink, GitBranch, Terminal, AlertCircle, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import MagneticButton from './MagneticButton';
import useScrollReveal from '../hooks/useScrollReveal';

export default function GitHubActivity() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [contentRef, contentRevealed] = useScrollReveal({ threshold: 0.1 });

  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    async function fetchGitHubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Kunaal9034', {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github.v3+json' }
          }),
          fetch('https://api.github.com/users/Kunaal9034/repos?sort=updated&per_page=6', {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github.v3+json' }
          })
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error('GitHub API rate limited or unavailable');
        }

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        if (isMounted) {
          setProfile(profileData);
          setRepos(Array.isArray(reposData) ? reposData : []);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setHasError(true);
          setLoading(false);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="github" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 light-tint-projects transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-14 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">04</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">GITHUB_ACTIVITY</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">api.github.com</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Open Source & Repositories
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Real-time public activity, codebase repositories, and open source development on GitHub.
          </p>
        </div>

        <div ref={contentRef} className={`reveal-init ${contentRevealed ? 'revealed' : ''}`}>
          {loading ? (
            /* Loading State */
            <div className="p-8 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 font-mono text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <span>CONNECTING TO GITHUB API // QUERYING REPOSITORIES...</span>
              </div>
            </div>
          ) : hasError || !profile ? (
            /* Graceful Fallback (No fake data) */
            <div className="p-8 sm:p-10 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 font-mono text-center space-y-5 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-300 dark:border-white/10 flex items-center justify-center mx-auto text-slate-800 dark:text-slate-200">
                <GithubIcon className="w-6 h-6" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Kunaal (@Kunaal9034) on GitHub
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                  Direct GitHub API request completed or rate-limited. You can explore all public repositories, commit history, and engineering contributions directly on the official profile.
                </p>
              </div>

              <div className="pt-2">
                <MagneticButton
                  as="a"
                  href="https://github.com/Kunaal9034"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-mono text-xs font-bold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>[ EXPLORE GITHUB PROFILE → ]</span>
                </MagneticButton>
              </div>
            </div>
          ) : (
            /* Live Data from GitHub */
            <div className="space-y-8">
              {/* Profile Overview Card */}
              <div className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 font-mono">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    className="w-14 h-14 rounded-xl border border-slate-300 dark:border-white/20 shadow-xs"
                    width={56}
                    height={56}
                  />
                  <div>
                    <div className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{profile.name || profile.login}</span>
                      <span className="text-xs text-cyan-600 dark:text-cyan-400 font-normal">@{profile.login}</span>
                    </div>
                    {profile.bio && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-0.5 line-clamp-1 max-w-xl">
                        {profile.bio}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 text-xs">
                  <div className="text-center sm:text-right">
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {profile.public_repos}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase">Public Repos</div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {profile.followers}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase">Followers</div>
                  </div>
                  <MagneticButton
                    as="a"
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-dark-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-cyan-500 text-xs font-semibold"
                  >
                    <span>Visit Profile</span>
                    <ExternalLink className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  </MagneticButton>
                </div>
              </div>

              {/* Public Repositories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 hover:border-cyan-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group font-mono"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors truncate">
                          {repo.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 shrink-0 transition-colors" />
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans line-clamp-2 leading-relaxed">
                        {repo.description || 'Public GitHub software engineering repository.'}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        {repo.language ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-cyan-500" />
                            <span>{repo.language}</span>
                          </>
                        ) : (
                          <span>Codebase</span>
                        )}
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
