import cupImages from "./cups";
import pentacleImages from "./pentacles";
import swordImages from "./swords";
import wandImages from "./wands";

const minorArcanaImages = {
  ...cupImages,
  ...pentacleImages,
  ...swordImages,
  ...wandImages,
} as const;

export default minorArcanaImages;
