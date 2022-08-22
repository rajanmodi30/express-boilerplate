import { pino } from "pino";
import { env } from "../../env";

const levels = {
  debug: 10,
  notice: 30,
  info: 20,
  error: 50,
};

const streams = () => {
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

// const transport = pino.transport({
//   target: "pino/file",
//   options: { destination: "/path/to/file", level: "info" },
// });
export const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || "info",
    customLevels: levels,
    useOnlyCustomLevels: true,
  },
  pino.multistream(streams())
);
