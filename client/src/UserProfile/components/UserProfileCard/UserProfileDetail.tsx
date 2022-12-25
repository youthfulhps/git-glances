import React from 'react';
import { User } from '@shared/apis/user';
import styled from 'styled-components';
import tw from 'twin.macro';
import {
  LocationIcon,
  OrganizationIcon,
  HomeIcon,
  LinkIcon,
} from '@primer/octicons-react';
import { getURLWithProtocol, isValidURL } from '@shared/utils/url';

type UserProfileDetailProps = {
  user: User;
};

const StyledUserProfileDetail = styled.div`
  ${tw`text-start`}

  img {
    ${tw`w-12 h-12`}
    ${tw`rounded-full`}
    ${tw`mb-2`}
  }

  ul {
    li {
      ${tw`flex items-center justify-start w-full`}
      ${tw`p-1`}
      ${tw`text-xs`}
    }

    svg {
      ${tw`fill-emerald-300`}
      ${tw`mr-2`}
    }
  }
`;

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
    <StyledUserProfileDetail>
      <img src={user.avatar_url} alt="User avatar" />
      <p className="mb-1">{user.name}</p>
      <p className="mb-2 text-xs text-zinc-400">{user.bio}</p>
      <ul>
        {userProfileListContents.map((userProfileContent) =>
          userProfileContent.content ? (
            <li key={userProfileContent.content}>
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
    </StyledUserProfileDetail>
  );
}

export default UserProfileDetail;
