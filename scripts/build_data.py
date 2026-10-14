"""Regenerate data/github.js from the GitHub API (via the `gh` CLI).

Usage:  python scripts/build_data.py

Needs `gh auth login` as the profile owner. Private repositories are only
used for aggregate numbers (language bytes, commit/PR counts); their names
are never written unless they appear in data/content.js as curated projects.
"""

import json
import re
import subprocess
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

LOGIN = "IamYipi"
ORGS = ["bisite", "AIRInstitute"]
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "github.js"

# Curated project id (see data/content.js) -> regex over org repo names.
PROJECT_PATTERNS = {
    "secursentry": r"SECURSENTRY",
    "vigia": r"VIGIA",
    "dciberid": r"DCIBERID",
    "quantumshield": r"QuantumShield",
    "airshield": r"AIr-Shield",
    "airsiem": r"AIRsiem|DeepSIEM|SOC-?AI|VSOC",
    "net5g": r"5G",
    "scrin": r"SCRIN",
    "automotive": r"CyberValidator|Esautomatix",
    "smartgrid": r"ZeroTrust",
    "valorh2": r"ValorH2",
    "optimar": r"OPTIMAR",
    "agro": r"AgrarIA|INA-Cyber",
    "ctf": r"ctf",
}

# Languages that measure generated output rather than code written.
SKIP_LANGS = {"Jupyter Notebook", "HTML", "CSS", "SCSS", "Makefile", "Dockerfile", "Batchfile", "Procfile", "Mako", "Jinja", "Smarty", "BibTeX Style", "Roff"}


def gh(path, *, paginate=False, headers=False):
    cmd = ["gh", "api", path]
    if paginate:
        cmd.append("--paginate")
    if headers:
        cmd.append("-i")
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0:
        return None
    if headers:
        return res.stdout
    out = res.stdout.strip()
    if paginate and out.startswith("[") and "][" in out:
        out = out.replace("]\n[", ",").replace("][", ",")
    return json.loads(out) if out else None


def graphql(query):
    res = subprocess.run(["gh", "api", "graphql", "-f", f"query={query}"], capture_output=True, text=True, encoding="utf-8")
    res.check_returncode()
    return json.loads(res.stdout)["data"]


def commit_count(full_name):
    raw = gh(f"repos/{full_name}/commits?author={LOGIN}&per_page=1", headers=True)
    if not raw:
        return 0
    head, _, body = raw.partition("\r\n\r\n") if "\r\n\r\n" in raw else raw.partition("\n\n")
    m = re.search(r'[?&]page=(\d+)>; rel="last"', head)
    if m:
        return int(m.group(1))
    try:
        return len(json.loads(body))
    except json.JSONDecodeError:
        return 0


def search_count(q):
    data = gh(f"search/issues?q={q}&per_page=1")
    return data["total_count"] if data else 0


def main():
    user = gh("user")
    repos = gh("user/repos?per_page=100&affiliation=owner,collaborator,organization_member", paginate=True)
    repos = [r for r in repos if not r["fork"] and r["owner"]["login"] in [LOGIN, *ORGS]]

    # --- per-repo authorship: own repos count fully, org repos only if user has commits
    lang_bytes = Counter()
    worked = []
    for r in repos:
        n = commit_count(r["full_name"])
        own = r["owner"]["login"] == LOGIN
        if not own and n == 0:
            continue
        worked.append((r, n))
        langs = gh(f"repos/{r['full_name']}/languages") or {}
        for lang, b in langs.items():
            if lang not in SKIP_LANGS:
                lang_bytes[lang] += b
        print(f"  {r['full_name']:<55} commits={n}", file=sys.stderr)

    total = sum(lang_bytes.values()) or 1
    languages = [{"name": k, "pct": round(v * 100 / total, 1)} for k, v in lang_bytes.most_common() if v * 100 / total >= 0.5]
    all_languages = [k for k, _ in lang_bytes.most_common()]

    repo_langs = Counter(r["language"] for r, _ in worked if r["language"])

    # --- commits/PRs per curated project; org repo names never leave this script
    projects = {}
    org_repos = [(r, n) for r, n in worked if r["owner"]["login"] in ORGS]
    for pid, pattern in PROJECT_PATTERNS.items():
        hits = [(r, n) for r, n in org_repos if re.search(pattern, r["name"], re.I)]
        if not hits:
            continue
        projects[pid] = {
            "repos": len(hits),
            "commits": sum(n for _, n in hits),
            "prs": sum(search_count(f"author:{LOGIN}+type:pr+repo:{r['full_name']}") for r, _ in hits),
        }

    # --- yearly contributions + last-year calendar
    years = []
    start = int(user["created_at"][:4])
    now = datetime.now(timezone.utc)
    for y in range(start, now.year + 1):
        q = f'query {{ viewer {{ contributionsCollection(from:"{y}-01-01T00:00:00Z", to:"{y}-12-31T23:59:59Z") {{ contributionCalendar {{ totalContributions }} totalCommitContributions restrictedContributionsCount totalPullRequestContributions }} }} }}'
        c = graphql(q)["viewer"]["contributionsCollection"]
        years.append({"year": y, "total": c["contributionCalendar"]["totalContributions"]})

    cal = graphql("query { viewer { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }")
    cal = cal["viewer"]["contributionsCollection"]["contributionCalendar"]
    level_map = {"NONE": 0, "FIRST_QUARTILE": 1, "SECOND_QUARTILE": 2, "THIRD_QUARTILE": 3, "FOURTH_QUARTILE": 4}
    calendar = {
        "total": cal["totalContributions"],
        "weeks": [[[d["date"], d["contributionCount"], level_map[d["contributionLevel"]]] for d in w["contributionDays"]] for w in cal["weeks"]],
    }

    # --- external open-source pull requests
    excl = "+".join(f"-user:{o}" for o in [LOGIN, *ORGS])
    prs = gh(f"search/issues?q=author:{LOGIN}+type:pr+{excl}&per_page=100&sort=created&order=desc")["items"]
    meta = {}
    oss = defaultdict(list)
    for p in prs:
        full = p["repository_url"].split("/repos/", 1)[1]
        if full not in meta:
            m = gh(f"repos/{full}")
            meta[full] = {
                "repo": full,
                "url": m["html_url"],
                "stars": m["stargazers_count"],
                "language": m["language"],
                "description": m["description"] or "",
            }
        merged = p.get("pull_request", {}).get("merged_at")
        state = "merged" if merged else ("open" if p["state"] == "open" else "closed")
        oss[full].append({
            "number": p["number"],
            "title": p["title"],
            "url": p["html_url"],
            "state": state,
            "date": (merged or p["created_at"])[:10],
        })
    oss_list = []
    for full, items in oss.items():
        counts = Counter(i["state"] for i in items)
        oss_list.append({**meta[full], "prs": items, "merged": counts["merged"], "open": counts["open"], "closed": counts["closed"]})
    oss_list.sort(key=lambda x: (-x["merged"], -x["stars"]))

    # --- public showcase repos (own, non-fork)
    public = [
        {
            "name": r["name"],
            "url": r["html_url"],
            "description": r["description"] or "",
            "language": r["language"],
            "stars": r["stargazers_count"],
            "updated": r["pushed_at"][:10],
            "created": r["created_at"][:10],
        }
        for r, _ in worked
        if r["owner"]["login"] == LOGIN and not r["private"] and r["name"] != LOGIN
    ]
    public.sort(key=lambda x: x["updated"], reverse=True)

    own_private = sum(1 for r, _ in worked if r["owner"]["login"] == LOGIN and r["private"])
    data = {
        "generatedAt": now.strftime("%Y-%m-%d"),
        "user": {
            "login": user["login"],
            "name": user["name"],
            "avatar": user["avatar_url"],
            "bio": user["bio"],
            "company": user["company"],
            "location": user["location"],
            "followers": user["followers"],
            "since": user["created_at"][:10],
            "url": user["html_url"],
        },
        "totals": {
            "reposWorked": len(worked),
            "ownPublic": len(public),
            "ownPrivate": own_private,
            "orgRepos": len(org_repos),
            "orgCommits": sum(n for _, n in org_repos),
            "prsAuthored": search_count(f"author:{LOGIN}+type:pr"),
            "contributions": sum(y["total"] for y in years),
            "ossPRs": sum(len(o["prs"]) for o in oss_list),
            "ossMerged": sum(o["merged"] for o in oss_list),
            "ossRepos": len(oss_list),
            "ossStars": sum(o["stars"] for o in oss_list if o["merged"]),
        },
        "languages": languages,
        "allLanguages": all_languages,
        "repoLanguages": repo_langs.most_common(12),
        "years": years,
        "calendar": calendar,
        "projects": projects,
        "oss": oss_list,
        "public": public,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("// Generated by scripts/build_data.py, do not edit by hand.\nwindow.GH = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"wrote {OUT} ({len(worked)} repos, {len(oss_list)} OSS repos)", file=sys.stderr)


if __name__ == "__main__":
    main()
