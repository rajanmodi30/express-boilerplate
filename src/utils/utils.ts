import dbConnection from "../app/providers/db";
import { env } from "../env";

export const queueConnection = {
  connection: {
    host: env.redis.host,
    port: env.redis.port,
  },
};

export const pagination = (
  totalCount: number,
  perPage: number,
  page: number
) => {
  return {
    total: totalCount,
    per_page: perPage,
    current_page: page,
    last_page: Math.ceil(totalCount / perPage),
  };
};

export const averageUptimeCalculator = async (operationId: number) => {
  const downCount = await dbConnection.log.count({
    where: {
      down: true,
    },
  });

  const upCount = await dbConnection.log.count({
    where: {
      down: false,
    },
  });

  return (upCount / (downCount + upCount)) * 100;
};
