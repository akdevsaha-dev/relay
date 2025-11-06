import { PrismaClient } from "./src/generated/prisma/client.js";
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
export default prisma;
//# sourceMappingURL=client.js.map