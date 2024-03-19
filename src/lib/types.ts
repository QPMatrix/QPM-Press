import {
  Contact,
  Lane,
  Notification,
  Prisma,
  Role,
  Tag,
  Ticket,
  User,
} from '@prisma/client';
import { getAuthUserDetails, getMedia, getUserPermissions } from './queries';
import { db } from './db';
import { z } from 'zod';

export type NotificationWithUser =
  | ({
      User: {
        id: string;
        name: string;
        avatarUrl: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        agencyId: string | null;
      };
    } & Notification)[]
  | undefined;
export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<
  typeof getUserPermissions
>;
export type AuthUserWithAgencySidebarOptionsSubAccounts =
  Prisma.PromiseReturnType<typeof getAuthUserDetails>;
export type UsersWithAgencySubAccountPermissionsSidebarOptions =
  Prisma.PromiseReturnType<
    typeof __getUsersWithAgencySubAccountPermissionsSidebarOptions
  >;
const __getUsersWithAgencySubAccountPermissionsSidebarOptions = async (
  agencyId: string,
) => {
  return await db.user.findFirst({
    where: { Agency: { id: agencyId } },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });
};

export type GetMediaFile = Prisma.PromiseReturnType<typeof getMedia>;
export type CreateMediaType = Prisma.MediaCreateWithoutSubaccountInput;
