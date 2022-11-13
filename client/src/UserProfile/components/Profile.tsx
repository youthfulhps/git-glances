import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import Link from '@shared/components/Link';

type ProfileProps = {
  userName: string;
  bio: string;
  blogURL?: string;
  githubURL?: string;
};

const StyledProfile = styled.div`
  ${tw`flex flex-col justify-end items-start p-4`};
  ${tw`absolute left-0 top-0`};
  ${tw`w-full h-full rounded-2xl`};
  ${tw`bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 opacity-0`};
  ${tw`hover:opacity-100 hover:backdrop-blur-sm duration-500`};
`;

const UserName = styled.span`
  ${tw`text-2xl font-bold text-zinc-100 drop-shadow-sm`};
`;

const Bio = styled.p`
  ${tw`block`};
  ${tw`text-xs text-zinc-300 drop-shadow-sm`};
  ${tw`mb-3`};
`;

const LinkWrapper = styled.div`
  ${tw`flex`};

  & > a {
    ${tw`mr-2`};
  }
`;

function Profile({
  userName,
  bio,
  blogURL = '',
  githubURL = '',
}: ProfileProps) {
  return (
    <StyledProfile>
      <UserName>{userName}</UserName>
      <Bio>{bio}</Bio>
      <LinkWrapper>
        {blogURL ? <Link href={blogURL}>BLOG</Link> : null}
        {githubURL ? <Link href={githubURL}>GITHUB</Link> : null}
      </LinkWrapper>
    </StyledProfile>
  );
}

export default Profile;
