#!/usr/bin/env python3
"""
Extrait la première frame de toutes les vidéos d'un dossier.

Installation :
    pip install opencv-python

Utilisation :
    python first_frames.py ./mes_videos
    python first_frames.py ./mes_videos -o ./miniatures
    python first_frames.py ./mes_videos --format webp --quality 85
    python first_frames.py ./mes_videos -r          # parcourt aussi les sous-dossiers
    python first_frames.py ./mes_videos --force     # écrase les images existantes

Par défaut, les images sont enregistrées dans <dossier>/frames/
avec le même nom que la vidéo (video.mp4 -> video.jpg).
"""

import argparse
import sys
from pathlib import Path

try:
    import cv2
except ImportError:
    sys.exit("Module manquant. Lance : pip install opencv-python")

VIDEO_EXTS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v", ".flv", ".wmv", ".mpg", ".mpeg", ".3gp"}


def extract_first_frame(video_path: Path, out_path: Path, fmt: str, quality: int) -> bool:
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        return False
    ok, frame = cap.read()
    cap.release()
    if not ok or frame is None:
        return False

    params = []
    if fmt in ("jpg", "jpeg"):
        params = [cv2.IMWRITE_JPEG_QUALITY, quality]
    elif fmt == "webp":
        params = [cv2.IMWRITE_WEBP_QUALITY, quality]
    elif fmt == "png":
        params = [cv2.IMWRITE_PNG_COMPRESSION, 3]

    # imencode + write_bytes : fonctionne aussi avec les accents / espaces dans les chemins (Windows)
    success, buf = cv2.imencode(f".{fmt}", frame, params)
    if not success:
        return False
    out_path.write_bytes(buf.tobytes())
    return True


def main():
    parser = argparse.ArgumentParser(description="Extrait la première frame des vidéos d'un dossier.")
    parser.add_argument("dossier", help="Dossier contenant les vidéos")
    parser.add_argument("-o", "--output", help="Dossier de sortie (défaut : <dossier>/frames)")
    parser.add_argument("--format", default="jpg", choices=["jpg", "png", "webp"],
                        help="Format des images (défaut : jpg)")
    parser.add_argument("--quality", type=int, default=90, help="Qualité jpg/webp de 1 à 100 (défaut : 90)")
    parser.add_argument("-r", "--recursif", action="store_true", help="Inclure les sous-dossiers")
    parser.add_argument("--force", action="store_true", help="Écraser les images déjà existantes")
    args = parser.parse_args()

    src = Path(args.dossier)
    if not src.is_dir():
        sys.exit(f"Dossier introuvable : {src}")

    out_dir = Path(args.output) if args.output else src / "frames"
    out_dir.mkdir(parents=True, exist_ok=True)

    pattern = "**/*" if args.recursif else "*"
    videos = sorted(
        p for p in src.glob(pattern)
        if p.is_file() and p.suffix.lower() in VIDEO_EXTS and out_dir not in p.parents
    )

    if not videos:
        sys.exit("Aucune vidéo trouvée dans ce dossier.")

    ok_count, skip_count, fail_count = 0, 0, 0
    for i, video in enumerate(videos, 1):
        out_path = out_dir / f"{video.stem}.{args.format}"
        print(f"[{i}/{len(videos)}] {video.name} ...", end=" ", flush=True)

        if out_path.exists() and not args.force:
            print("déjà fait, ignoré")
            skip_count += 1
            continue

        if extract_first_frame(video, out_path, args.format, args.quality):
            print(f"OK -> {out_path.name}")
            ok_count += 1
        else:
            print("échec (vidéo illisible ?)")
            fail_count += 1

    print(f"\nTerminé : {ok_count} créée(s), {skip_count} ignorée(s), {fail_count} échec(s) -> {out_dir.resolve()}")


if __name__ == "__main__":
    main()