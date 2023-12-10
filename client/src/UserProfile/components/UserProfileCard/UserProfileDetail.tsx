import React from 'react';
import { User } from '@shared/apis/user';
import { LocationIcon, OrganizationIcon, HomeIcon, LinkIcon } from '@primer/octicons-react';
import { getURLWithProtocol, isValidURL } from '@shared/utils/url';

type UserProfileDetailProps = {
  user: User;
};

function UserProfileDetail({ user }: UserProfileDetailProps) {
  const userProfileListContents = [
    {
      icon: <HomeIcon size={12} />,
      content: user.html_url,
    },
    {
      icon: <LinkIcon size={12} />,
      content: user.blog,
    },
    {
      icon: <LocationIcon size={12} />,
      content: user.location,
    },
    {
      icon: <OrganizationIcon size={12} />,
      content: user.company,
    },
  ];

  return (
    <div className="text-start">
      <div className="relative flex items-center justify-start">
        <img
          className="absolute left-[-14px] z-0 h-24 w-24 opacity-10 blur-lg"
          src={user.avatar_url}
          alt="User avatar"
        />
        <img className="z-10 mb-4 h-16 w-16 rounded-full" src={user.avatar_url} alt="User avatar" />
      </div>
      <p className="mb-1">{user.name}</p>
      <p className="mb-2 text-xs text-zinc-400">{user.bio}</p>
      <ul>
        {userProfileListContents.map((userProfileContent) =>
          userProfileContent.content ? (
            <li
              className="flex w-full items-center justify-start p-1 text-xs [&>svg]:mr-2 [&>svg]:fill-emerald-300"
              key={userProfileContent.content}
            >
              {userProfileContent.icon}
              <span>
                {isValidURL(userProfileContent.content) ? (
                  <a
                    className="hover:text-zinc-400"
                    href={getURLWithProtocol(userProfileContent.content)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userProfileContent.content}
                  </a>
                ) : (
                  userProfileContent.content
                )}
              </span>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default UserProfileDetail;
