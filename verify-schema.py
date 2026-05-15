#!/usr/bin/env python3
"""Validate Jekyll front matter YAML against JSON schemas."""

import json
import sys
import yaml
from pathlib import Path
from jsonschema import Draft202012Validator, ValidationError
from referencing import Registry, Resource
from referencing.jsonschema import DRAFT202012

ROOT = Path(__file__).parent

def _build_registry() -> Registry:
    registry = Registry()
    for f in (ROOT / "schema").glob("*.json"):
        content = json.loads(f.read_text(encoding="utf-8"))
        resource = Resource.from_contents(content, default_specification=DRAFT202012)
        registry = registry.with_resource(f.as_uri(), resource)
    return registry

_registry = _build_registry()

COLLECTIONS = {
    "_campings":       ROOT / "schema/camping-schema.json",
    "_fietstochten":   ROOT / "schema/fietsroute-schema.json",
    "_wandelroutes":   ROOT / "schema/wandelroute-schema.json",
    "_kano_suproutes": ROOT / "schema/kano-en-sup-schema.json",
    "_plaats":         ROOT / "schema/plaats-schema.json",
    "_musea":          ROOT / "schema/museum-schema.json",
}


def extract_front_matter(path: Path) -> dict | None:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return None
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None
    return yaml.safe_load(parts[1])



def validate_collection(collection_dir: Path, schema_path: Path) -> list[str]:
    if not schema_path.exists() or schema_path.stat().st_size == 0:
        return [f"  SCHEMA ONTBREEKT of LEEG: {schema_path.name}"]

    validator = Draft202012Validator({"$ref": schema_path.as_uri()}, registry=_registry)
    errors = []

    md_files = sorted(collection_dir.rglob("*.md"))
    if not md_files:
        return []

    for md_file in md_files:
        front_matter = extract_front_matter(md_file)
        if front_matter is None:
            errors.append(f"  {md_file.relative_to(ROOT)}: geen front matter gevonden")
            continue

        file_errors = sorted(validator.iter_errors(front_matter), key=lambda e: e.path)
        if file_errors:
            errors.append(f"  {md_file.relative_to(ROOT)}:")
            for err in file_errors:
                path = ".".join(str(p) for p in err.absolute_path) or "(root)"
                errors.append(f"    - {path}: {err.message}")

    return errors


def main():
    specific_files = [Path(a) for a in sys.argv[1:] if Path(a).suffix == ".md"]

    if specific_files:
        # Validate only the specified files
        all_errors = {}
        for md_file in specific_files:
            matched = False
            for collection_name, schema_path in COLLECTIONS.items():
                if collection_name in md_file.parts or collection_name in str(md_file):
                    matched = True
                    validator = Draft202012Validator({"$ref": schema_path.as_uri()}, registry=_registry)
                    front_matter = extract_front_matter(md_file)
                    if front_matter is None:
                        all_errors[str(md_file)] = ["geen front matter gevonden"]
                        break
                    errs = sorted(validator.iter_errors(front_matter), key=lambda e: e.path)
                    if errs:
                        all_errors[str(md_file)] = [
                            f"{'.'.join(str(p) for p in e.absolute_path) or '(root)'}: {e.message}"
                            for e in errs
                        ]
                    break
            if not matched:
                print(f"ONBEKEND: {md_file} (geen schema gevonden voor deze collectie)")
    else:
        # Validate all collections
        all_errors = {}
        for collection_name, schema_path in COLLECTIONS.items():
            collection_dir = ROOT / collection_name
            if not collection_dir.exists():
                continue
            errs = validate_collection(collection_dir, schema_path)
            if errs:
                all_errors[collection_name] = errs

    if all_errors:
        print("VALIDATIEFOUTEN GEVONDEN\n")
        for name, errs in all_errors.items():
            print(f"{name}:")
            for e in errs:
                print(e)
            print()
        sys.exit(1)
    else:
        print("Alles valide.")
        sys.exit(0)


if __name__ == "__main__":
    main()
