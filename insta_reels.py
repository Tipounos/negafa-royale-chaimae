#!/usr/bin/env python3
"""
Télécharge des reels Instagram publics que tu choisis.

Installation :
    pip install instaloader

Utilisation :
    python insta_reels.py https://www.instagram.com/reel/XXXXXXXXXXX/
    python insta_reels.py URL1 URL2 URL3 -o mes_reels
    python insta_reels.py -f liens.txt              # un lien par ligne
    python insta_reels.py URL --login ton_pseudo    # si Instagram demande une connexion

Note : respecte les droits d'auteur et les CGU d'Instagram. Télécharge
uniquement du contenu dont tu as le droit de te servir.
"""

import argparse
import re
import sys
import time
from pathlib import Path

try:
    import instaloader
except ImportError:
    sys.exit("Module manquant. Lance : pip install instaloader")

SHORTCODE_RE = re.compile(r"instagram\.com/(?:[\w.]+/)?(?:reels?|p|tv)/([A-Za-z0-9_-]+)")


def extract_shortcode(value: str):
    """Accepte une URL complète ou directement le shortcode."""
    value = value.strip()
    if not value:
        return None
    m = SHORTCODE_RE.search(value)
    if m:
        return m.group(1)
    if re.fullmatch(r"[A-Za-z0-9_-]{5,}", value):
        return value
    return None


def build_loader(out_dir: Path, login: str | None) -> instaloader.Instaloader:
    loader = instaloader.Instaloader(
        dirname_pattern=str(out_dir),
        filename_pattern="{shortcode}",
        download_pictures=False,
        download_video_thumbnails=False,
        download_comments=False,
        download_geotags=False,
        save_metadata=False,
        post_metadata_txt_pattern="",
        quiet=True,
    )
    if login:
        try:
            loader.load_session_from_file(login)
        except FileNotFoundError:
            print(f"Connexion interactive pour @{login}...")
            loader.interactive_login(login)  # demande le mot de passe
            loader.save_session_to_file()
    return loader


def main():
    parser = argparse.ArgumentParser(description="Télécharge des reels Instagram publics.")
    parser.add_argument("liens", nargs="*", help="URLs ou shortcodes des reels")
    parser.add_argument("-f", "--fichier", help="Fichier texte avec un lien par ligne")
    parser.add_argument("-o", "--output", default="reels", help="Dossier de sortie (défaut : reels)")
    parser.add_argument("--login", help="Pseudo Instagram (si le contenu exige une connexion)")
    parser.add_argument("--delai", type=float, default=3.0,
                        help="Pause entre deux téléchargements en secondes (défaut : 3)")
    args = parser.parse_args()

    entries = list(args.liens)
    if args.fichier:
        entries += Path(args.fichier).read_text(encoding="utf-8").splitlines()

    shortcodes = []
    for e in entries:
        sc = extract_shortcode(e)
        if sc and sc not in shortcodes:
            shortcodes.append(sc)
        elif e.strip():
            print(f"[ignoré] lien non reconnu : {e.strip()}")

    if not shortcodes:
        parser.error("Aucun lien valide fourni.")

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)
    loader = build_loader(out_dir, args.login)

    ok, fail = 0, 0
    for i, sc in enumerate(shortcodes, 1):
        print(f"[{i}/{len(shortcodes)}] {sc} ...", end=" ", flush=True)
        try:
            post = instaloader.Post.from_shortcode(loader.context, sc)
            if not post.is_video:
                print("pas une vidéo, ignoré")
                fail += 1
                continue
            loader.download_post(post, target="")
            print(f"OK (@{post.owner_username})")
            ok += 1
        except instaloader.exceptions.LoginRequiredException:
            print("connexion requise (utilise --login)")
            fail += 1
        except instaloader.exceptions.QueryReturnedNotFoundException:
            print("reel introuvable ou privé")
            fail += 1
        except instaloader.exceptions.ConnectionException as e:
            print(f"erreur réseau/limite Instagram : {e}")
            fail += 1
        except Exception as e:
            print(f"erreur : {e}")
            fail += 1
        if i < len(shortcodes):
            time.sleep(args.delai)

    print(f"\nTerminé : {ok} téléchargé(s), {fail} échec(s) -> {out_dir.resolve()}")


if __name__ == "__main__":
    main()