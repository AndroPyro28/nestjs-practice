import { PrismaClient } from "@prisma/client";

const prisma:(PrismaClient) = new PrismaClient();

export const { user, car } = prisma;

export default prisma;