export type HumanizeConfig = {
  locale: string;
  currency: string;
};

const DEFAULT_CONFIG: HumanizeConfig = {
  locale: "en-IN",
  currency: "INR"
};

let currentConfig: HumanizeConfig = { ...DEFAULT_CONFIG };

export const getConfig = (): HumanizeConfig => ({ ...currentConfig });

export const setConfig = (newConfig: Partial<HumanizeConfig>): void => {
  currentConfig = { ...currentConfig, ...newConfig };
};
