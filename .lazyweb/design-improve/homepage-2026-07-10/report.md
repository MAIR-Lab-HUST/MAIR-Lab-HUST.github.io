# Design Implementation: Signature Spine

## TL;DR

Implemented the report's **Signature Spine** variant using its mockup as the visual source of truth. The result matches the 1400×974 reference composition: pill navigation, geometric mark, expanded editorial title, three-line description, oversized handwritten MAIR signature, and the red landscape/video base.

## Source Mockup

![Signature Spine specification](references/signature-spine-spec.jpg)

## Before

![Previous implementation](references/signature-spine-before.png)

## Final Implementation

![Desktop implementation](references/signature-spine-final.png)

![Mobile implementation](references/signature-spine-mobile.png)

## Match Notes

- Header frame: 1242×65 at x=79, y=22 on the 1400×974 reference viewport.
- Editorial title: 91px Instrument Serif, visually condensed to the mockup's 922px footprint.
- Body typography: Inter 400/500 through the shared `--font-body` token.
- Copy, line breaks, vertical hierarchy, and red palette follow the mockup.
- The exact mockup logo and handwritten signature are bundled as a Vite-hashed reference asset.
- Desktop and 390px mobile layouts have zero horizontal overflow.
- The bottom landscape acts as a deterministic fallback while the supplied Cloudinary video is unavailable.

## Source Report

<https://www.lazyweb.com/report/lazyweb/d9546379-cb7f-490f-96ee-74c8163e1ffd/?source=create>
