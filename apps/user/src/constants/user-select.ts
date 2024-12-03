import { Prisma } from '@prisma/client';

export const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  role: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
};
