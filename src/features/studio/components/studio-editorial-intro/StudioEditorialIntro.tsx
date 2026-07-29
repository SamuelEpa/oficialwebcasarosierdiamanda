import type { StudioIntroView } from "../../types";
import { StudioEditorialIntroView } from "./StudioEditorialIntroView";

export function StudioEditorialIntro({ intro }: { intro: StudioIntroView }) {
  return <StudioEditorialIntroView intro={intro} />;
}
