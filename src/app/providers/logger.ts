import { pino } from "pino";

const levels = {
  debug: 10,
  notice: 30,
  info: 20,
  error: 50,
};

const streams = (currentDirectory: string) => {
  const storageStreams = Object.keys(levels).map((level) => {
    return {
      // level: level,
      stream: pino.destination(
        `${currentDirectory}/storage/logs/app-${level}.log`
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
    level: process.env.PINO_LOG_LEVEL || "info",
    customLevels: levels,
    useOnlyCustomLevels: true,
  },
  pino.multistream(streams("src"))
);
