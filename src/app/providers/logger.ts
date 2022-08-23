import { pino } from "pino";
import { env } from "../../env";

const levels = {
  debug: 10,
  notice: 30,
  info: 20,
  error: 50,
};

const streams: any = () => {
  const storageStreams = Object.keys(levels).map((level) => {
    return {
      level: level,
      stream: pino.destination(
        `${env.app.root_dir}/storage/logs/app-${level}.log`
      ),
    };
  });

  const consoleStreams = Object.keys(levels).map((level) => {
    return {
      level: level,
      stream: process.stdout,
    };
  });

  return [...storageStreams, ...consoleStreams];
};

export const logger = pino(
  {
    level: "info",
    customLevels: levels,
    useOnlyCustomLevels: true,
  },
  pino.multistream(streams())
);
