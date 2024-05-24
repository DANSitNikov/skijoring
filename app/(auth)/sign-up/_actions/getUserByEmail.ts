import prisma from "@/lib/db";

const getUserByEmail = async (email: string) => {
  try {
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    return existing;
  } catch {
    return null;
  }
};

export default getUserByEmail;
