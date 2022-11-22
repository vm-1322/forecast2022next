import { useSession } from 'next-auth/react';

const useUserRoles = () => {
  const { data: session } = useSession();

  if (!session) return [];

  const imageInfo = session.user.image;

  const listRoles = JSON.parse(imageInfo.replace('{', '{"').replace(':', '":'))
    .roles;

  return listRoles;
};

export default useUserRoles;
