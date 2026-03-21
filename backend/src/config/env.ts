export const env = {
  databaseUrl: process.env.DATABASE_URL!,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,

  jwtAccessExpiration: Number(process.env.JWT_ACCESS_EXPIRATION),
  jwtRefreshExpiration: Number(process.env.JWT_REFRESH_EXPIRATION),
};