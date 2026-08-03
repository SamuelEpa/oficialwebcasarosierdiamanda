import assert from "node:assert/strict";
import test from "node:test";
import { deleteOfferingMediaAssets } from "../src/lib/cms/offering-media.ts";
import type { Offering } from "../src/lib/cms/types.ts";

test("la eliminación permanente conserva los medios asociados", async () => {
  const sharedUrl =
    "https://example.supabase.co/storage/v1/object/public/media/shared/image.png";
  const offering = {
    cover_image_url: sharedUrl,
    gallery: [sharedUrl],
    details: { hero: { image_url: sharedUrl } },
  } as unknown as Offering;

  const result = await deleteOfferingMediaAssets(offering);

  assert.deepEqual(result.paths, ["shared/image.png"]);
  assert.deepEqual(result.deleted, []);
});
