import React, { useState } from 'react';
import { useToken } from '@shared/contexts/TokenContext';
import { useQueryClient } from '@tanstack/react-query';
import {
  SignOutIcon,
  SignInIcon,
  KeyIcon,
  TrashIcon,
  MarkGithubIcon,
  InfoIcon,
  CheckIcon,
  CopyIcon,
  IssueOpenedIcon,
} from '@primer/octicons-react';

const GITHUB_OAUTH_URL =
  `https://github.com/login/oauth/authorize` +
  `?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}` +
  `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URL}` +
  '&scope=notifications,repo,user';

const GITHUB_REPO_URL = 'https://github.com/youthfulhps/git-glances';
const GITHUB_ISSUES_URL = `${GITHUB_REPO_URL}/issues/new`;

function SettingBoard() {
  const { token, setToken, tokenError, clearTokenError } = useToken();
  const queryClient = useQueryClient();
  const [inputToken, setInputToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const isLoggedIn = !!token;
  const isWeb = process.env.IS_WEB;

  const handleLogin = () => {
    if (inputToken.trim()) {
      setToken(inputToken.trim());
      setInputToken('');
    }
  };

  const handleLogout = () => {
    setToken('');
    queryClient.clear();
  };

  const handleClearCache = () => {
    queryClient.clear();
    if (process.env.IS_WEB && window.localStorage) {
      // Keep the token but clear other cached data
      const currentToken = token;
      window.localStorage.clear();
      if (currentToken) {
        setToken(currentToken);
      }
    }
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openGitHubProfile = () => {
    window.open('https://github.com/settings/tokens', '_blank');
  };

  const openGenerateToken = () => {
    window.open(
      `https://github.com/settings/tokens/new?scopes=notifications,user,repo&description=${encodeURIComponent(
        'Token for GitGlances Extension',
      )}`,
      '_blank',
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium text-zinc-200">Settings</div>
      <div className="flex min-h-[calc(100vh-12rem)] flex-col gap-4 rounded-2xl border border-zinc-700 bg-zinc-800/30 p-6">
        <div className="flex items-center justify-between border-b border-zinc-700/50 pb-4">
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <span className="flex items-center gap-1.5 rounded-lg bg-emerald-900/30 px-3 py-1 text-xs text-emerald-400">
                <CheckIcon size={12} />
                Signed In
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-lg bg-zinc-700/30 px-3 py-1 text-xs text-zinc-400">
                <InfoIcon size={12} />
                Not Signed In
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-zinc-200">Authentication</h3>

          {isLoggedIn ? (
            <div className="flex flex-col gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-4">
              {/* Token Display */}
              <div className="flex w-full flex-col gap-2">
                <label className="text-xs text-zinc-400">GitHub Personal Access Token</label>
                <div className="flex items-center gap-2">
                  <input
                    type={showToken ? 'text' : 'password'}
                    value={token}
                    readOnly
                    className="flex-1 rounded-md border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-300
                      focus:border-zinc-600 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowToken(!showToken)}
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-300 transition-colors
                      hover:bg-zinc-700"
                  >
                    {showToken ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={handleCopyToken}
                    className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs
                      text-zinc-300 transition-colors hover:bg-zinc-700"
                  >
                    {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1 self-end rounded-lg border border-red-900/50
                  bg-gradient-to-br from-red-950/30 via-zinc-900 to-zinc-950 px-4 py-2.5 text-[10px] text-red-400
                  transition-colors hover:border-red-800/50 hover:text-red-300"
              >
                <SignOutIcon size={12} />
                Sign Out
              </button>
            </div>
          ) : isWeb ? (
            <div className="flex flex-col gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-4">
              <p className="text-xs text-zinc-400">
                Sign in with your GitHub account to access all features.
              </p>
              <a
                href={GITHUB_OAUTH_URL}
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700/50 bg-gradient-to-br
                  from-zinc-900 via-zinc-900/80 to-zinc-950 px-4 py-2.5 text-xs text-zinc-200 transition-colors
                  hover:border-zinc-600"
              >
                <MarkGithubIcon size={12} />
                Sign In with GitHub
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-4">
              {/* Token Input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-zinc-400">Personal Access Token</label>
                <p className="mb-2 text-[10px] text-zinc-500">
                  Enter your GitHub Personal Access Token to authenticate with the GitHub API.
                </p>
                <input
                  type="password"
                  value={inputToken}
                  onChange={(e) => {
                    setInputToken(e.target.value);
                    if (tokenError) clearTokenError();
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className={`rounded-md border ${tokenError ? 'border-red-500/50' : 'border-zinc-700'} bg-zinc-900/50 px-3 py-2 text-xs text-zinc-300
                    placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none`}
                />
                {tokenError && (
                  <p className="text-[10px] text-red-400">
                    Invalid token. Please check your token and try again.
                  </p>
                )}
              </div>

              <button
                onClick={openGenerateToken}
                className="flex items-center justify-center gap-2 text-xs text-zinc-500 underline transition-colors
                  hover:text-zinc-400"
              >
                <KeyIcon size={12} />
                Generate Token on GitHub
              </button>
              <button
                onClick={handleLogin}
                disabled={!inputToken.trim()}
                className="flex items-center justify-center gap-2 self-end rounded-lg border border-zinc-700/50
                  bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 px-4 py-2.5 text-xs text-zinc-200
                  transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:border-zinc-600"
              >
                <SignInIcon size={12} />
                Sign In with Token
              </button>
            </div>
          )}
        </div>

        {/* App Settings Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-zinc-200">App Settings</h3>

          <div className="flex flex-col gap-2 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-4">
            {/* Clear Cache */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-zinc-300">Clear Cache</span>
                <span className="text-[10px] text-zinc-500">
                  Clear all cached data and refresh queries
                </span>
              </div>
              <button
                onClick={handleClearCache}
                className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs
                  text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                <TrashIcon size={12} />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-zinc-200">Feedback</h3>

          <div className="flex flex-col gap-2 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-zinc-300">Report an Issue</span>
              <span className="text-[10px] text-zinc-500">
                Found a bug or have a feature request? Let us know!
              </span>
            </div>
            <button
              onClick={() => window.open(GITHUB_ISSUES_URL, '_blank')}
              className="flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2
                text-xs text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              <IssueOpenedIcon size={12} />
              Create Issue on GitHub
            </button>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-zinc-200">Links</h3>

          <div className="flex flex-col gap-1 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-2">
            <button
              onClick={() => window.open(GITHUB_REPO_URL, '_blank')}
              className="flex items-center justify-between rounded-md px-3 py-2 text-xs text-zinc-300 transition-colors
                hover:bg-zinc-700/50"
            >
              <div className="flex items-center gap-2">
                <MarkGithubIcon size={12} />
                <span>GitGlances Repository</span>
              </div>
              <span className="text-xs text-zinc-500">→</span>
            </button>

            <button
              onClick={openGitHubProfile}
              className="flex items-center justify-between rounded-md px-3 py-2 text-xs text-zinc-300 transition-colors
                hover:bg-zinc-700/50"
            >
              <div className="flex items-center gap-2">
                <KeyIcon size={12} />
                <span>Personal Access Tokens</span>
              </div>
              <span className="text-xs text-zinc-500">→</span>
            </button>
          </div>
        </div>
        <div className="mt-auto border-t border-zinc-700/50 pt-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>GitGlances</span>
            <span>v{process.env.VERSION}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingBoard;
