import tw from 'twin.macro';
import styled from 'styled-components';

type AvatarProps = {
  avatarUrl: string;
};

const StyledAvatar = styled.img`
  ${tw`h-full w-full rounded-2xl object-cover object-center`};
`;

function Avatar({ avatarUrl }: AvatarProps) {
  return <StyledAvatar src={avatarUrl} alt="User profile" />;
}

export default Avatar;
