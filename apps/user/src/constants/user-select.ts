import { Prisma } from '@prisma/client';

export const userSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  role: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
};
