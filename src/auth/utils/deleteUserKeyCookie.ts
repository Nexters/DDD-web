'use server';

import { cookies } from 'next/headers';

export const deleteUserKeyCookie = () => {
  cookies().delete('userKey');
};
